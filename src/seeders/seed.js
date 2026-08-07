require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const { Outlet, Employee, MenuItem, Stock, Table, Slot } = require('../models');

const STOCK_CATS = ['Whisky', 'Beer', 'Vodka', 'Gin', 'Tequila', 'Rum', 'Wines & Sangria', 'Beverage'];

async function seed() {
  await connectDB();
  console.log('Connected. Seeding outlet project...');

  // Demo outlet account
  const existing = await Outlet.findOne({ email: 'outlet@demo.com' });
  if (existing) {
    console.log('Demo outlet already exists. Skipping create.');
    await mongoose.disconnect();
    return;
  }

  const outlet = await Outlet.create({
    name: 'Demo Outlet',
    email: 'outlet@demo.com',
    password: 'outlet123',
    phone: '9999999999',
    address: '123 Demo Street',
    city: 'Mumbai',
    openingTime: '11:00',
    closingTime: '23:00'
  });
  console.log(`Outlet created: ${outlet.email} / outlet123`);

  // Sample employee
  await Employee.create({
    outletId: outlet._id,
    name: 'John Doe',
    role: 'Bartender',
    phone: '8888888888',
    salary: 25000
  });

  // Sample menu & stock items
  for (const cat of STOCK_CATS) {
    const m = await MenuItem.create({
      outletId: outlet._id,
      name: `${cat} Premium`,
      category: cat,
      price: 500,
      unit: '60ml',
      type: 'Drink'
    });
    await Stock.create({
      outletId: outlet._id,
      menuItemId: m._id,
      category: cat,
      itemName: `${cat} Premium 750ml`,
      lockPrice: 500,
      highestPrice: 600,
      minimumPrice: 450,
      currentPrice: 520,
      currentStock: 50,
      unit: 'Bottle'
    });
  }
  console.log(`Seeded ${STOCK_CATS.length} menu+stock items across categories.`);

  // Sample tables & slot
  await Table.create({ outletId: outlet._id, tableNo: 'T1', tableName: 'Window 1', capacity: 4, area: 'Main Hall' });
  await Table.create({ outletId: outlet._id, tableNo: 'T2', tableName: 'VIP 1', capacity: 6, area: 'VIP' });
  await Slot.create({
    outletId: outlet._id,
    name: 'Dinner',
    startTime: '19:00',
    endTime: '22:00',
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    maxBookings: 30
  });
  console.log('Seeded 2 tables and 1 slot.');

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
