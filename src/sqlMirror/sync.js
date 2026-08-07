// SQL → MongoDB sync utility.
// Pulls every row from the MySQL `liquiditybars` database and upserts it
// into the matching `sql_<table>` Mongo collection (by sqlId).
//
// Usage (from project root):
//   npm run sync:sql               # one-off full sync
//   node src/sqlMirror/sync.js     # same thing
//   node src/sqlMirror/sync.js users shops  # only these tables
//
// Env vars (in .env):
//   SQL_HOST=localhost
//   SQL_USER=liquiditybars
//   SQL_PASSWORD=...
//   SQL_DATABASE=liquiditybars
//   SQL_PORT=3306
//   MONGO_URL=mongodb://...
//   DB_NAME=liquiditybars

require('dotenv').config();
const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const { models, tableNames } = require('./index');

const BATCH = 500;

function sanitizeRow(row) {
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    if (k === 'id') continue;
    // Convert MySQL date strings/Date objects properly; null → keep
    out[k] = v === null ? null : v;
  }
  return out;
}

async function syncTable(conn, table) {
  const Model = models[table];
  if (!Model) {
    console.warn(`  [skip] no Mongo model for table "${table}"`);
    return { table, synced: 0, skipped: true };
  }

  // 1) Total count
  const [[{ c: total }]] = await conn.query(`SELECT COUNT(*) AS c FROM \`${table}\``);
  if (total === 0) {
    console.log(`  [${table}] empty in SQL — nothing to sync`);
    return { table, synced: 0 };
  }

  let synced = 0;
  for (let offset = 0; offset < total; offset += BATCH) {
    const [rows] = await conn.query(
      `SELECT * FROM \`${table}\` ORDER BY id ASC LIMIT ? OFFSET ?`,
      [BATCH, offset]
    );
    if (rows.length === 0) break;

    const ops = rows.map(row => ({
      updateOne: {
        filter: { sqlId: row.id },
        update: { $set: { sqlId: row.id, ...sanitizeRow(row) } },
        upsert: true
      }
    }));

    const res = await Model.bulkWrite(ops, { ordered: false });
    synced += rows.length;
    process.stdout.write(`  [${table}] ${synced}/${total} (upserts=${res.upsertedCount} updates=${res.modifiedCount})\r`);
  }
  process.stdout.write('\n');
  return { table, synced };
}

async function main() {
  const wanted = process.argv.slice(2);
  const list = wanted.length ? wanted : tableNames;

  // Mongo
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) throw new Error('MONGO_URL is required');
  await mongoose.connect(mongoUrl, { dbName: process.env.DB_NAME });
  console.log(`[mongo] connected to ${process.env.DB_NAME || '(default db)'}`);

  // MySQL
  const conn = await mysql.createConnection({
    host: process.env.SQL_HOST || 'localhost',
    port: Number(process.env.SQL_PORT || 3306),
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    dateStrings: false,
    multipleStatements: false
  });
  console.log(`[mysql] connected to ${process.env.SQL_DATABASE} as ${process.env.SQL_USER}`);

  const results = [];
  for (const t of list) {
    try {
      const r = await syncTable(conn, t);
      results.push(r);
    } catch (err) {
      console.error(`  [${t}] FAILED:`, err.message);
      results.push({ table: t, error: err.message });
    }
  }

  await conn.end();
  await mongoose.disconnect();

  console.log('\n=== SYNC SUMMARY ===');
  const totalRows = results.reduce((s, r) => s + (r.synced || 0), 0);
  console.log(`Tables processed : ${results.length}`);
  console.log(`Total rows synced: ${totalRows}`);
  const errors = results.filter(r => r.error);
  if (errors.length) {
    console.log(`Errors           : ${errors.length}`);
    errors.forEach(e => console.log(`  - ${e.table}: ${e.error}`));
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error('Sync failed:', err);
    process.exit(1);
  });
}

module.exports = { syncTable, main };
