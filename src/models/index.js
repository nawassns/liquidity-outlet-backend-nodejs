const Outlet = require('./Outlet');
const User = require('./User');
const Order = require('./Order');
const VaultItem = require('./VaultItem');

const Employee = require('./Employee');
const MenuItem = require('./MenuItem');
const Stock = require('./Stock');
const StockMovement = require('./StockMovement');
const Table = require('./Table');
const Slot = require('./Slot');
const TableBooking = require('./TableBooking');
const OutletTransaction = require('./OutletTransaction');
const LedgerEntry = require('./LedgerEntry');
const Tip = require('./Tip');
const Commission = require('./Commission');

// SQL-mirror models (one Mongoose model per MySQL table — same field names)
const sqlMirror = require('../sqlMirror');

module.exports = {
  Outlet, User, Order, VaultItem,
  Employee, MenuItem, Stock, StockMovement, Table, Slot, TableBooking,
  OutletTransaction, LedgerEntry, Tip, Commission,
  sql: sqlMirror.models,
  sqlTableNames: sqlMirror.tableNames
};
