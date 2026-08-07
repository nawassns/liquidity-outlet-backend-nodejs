const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

// Cache the connection across serverless invocations (and local reloads)
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGO_URL) {
    throw new Error('MONGO_URL environment variable is not defined');
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URL, {
        dbName: process.env.DB_NAME,
        bufferCommands: false,        // fail fast instead of buffering 10s
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 5,               // keep small for serverless
      })
      .then((m) => {
        console.log(`MongoDB Connected: ${m.connection.host}`);
        return m;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;