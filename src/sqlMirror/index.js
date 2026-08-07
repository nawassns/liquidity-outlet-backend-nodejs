// AUTO-GENERATED SQL-mirror Mongoose models.
// Each collection mirrors a MySQL table from `liquiditybars` (1:1 columns).
// `sqlId` stores the SQL row `id` and is unique — used by the sync job to upsert.
const mongoose = require('mongoose');

const schemas = {};

// Table: admins
schemas['admins'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  city: { type: String, default: '' },
  is_super: { type: Number, default: 0 },
  role_id: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_admins' });

// Table: banners
schemas['banners'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  image: { type: String, default: '' },
  redirect_link: { type: String, default: '' },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_banners' });

// Table: become_ambassador_requests
schemas['become_ambassador_requests'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  user_id: { type: Number, default: 0 },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  date_of_birth: { type: String, default: '' },
  instagram: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  downloads: { type: String, default: '' },
  whygood: { type: String, default: '' },
  created_at: { type: Date, default: null },
  is_approved: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_become_ambassador_requests' });

// Table: carts
schemas['carts'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  user_id: { type: Number, default: 0 },
  device_id: { type: String, default: '' },
  product_id: { type: Number, default: 0 },
  product_name: { type: String, default: '' },
  choice_of_alcohol_name: { type: String, default: '' },
  choice_of_mixer_name: { type: String, default: '' },
  is_double_shot: { type: Number, default: 0 },
  shot_count: { type: Number, default: 0 },
  double_shot_price: { type: Number, default: 0 },
  special_instruction: { type: String, default: '' },
  unit: { type: String, default: '' },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  add_on_id1: { type: Number, default: 0 },
  add_on_name1: { type: String, default: '' },
  add_on_price1: { type: Number, default: 0 },
  add_on_quantity1: { type: Number, default: 0 },
  add_on_unit1: { type: String, default: '' },
  add_on_id2: { type: Number, default: 0 },
  add_on_name2: { type: String, default: '' },
  add_on_price2: { type: Number, default: 0 },
  add_on_quantity2: { type: Number, default: 0 },
  add_on_unit2: { type: String, default: '' },
  instruction: { type: String, default: '' },
  is_liquor: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_carts' });

// Table: categories
schemas['categories'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  name: { type: String, default: '' },
  image: { type: String, default: '' },
  order_by: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_categories' });

// Table: cities
schemas['cities'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  name: { type: String, default: '' },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_cities' });

// Table: contacts
schemas['contacts'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  message: { type: String, default: '' },
  created_at: { type: Date, default: null },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_contacts' });

// Table: events
schemas['events'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  event_date: { type: Date, default: null },
  event_time: { type: String, default: '' },
  event_place: { type: String, default: '' },
  contact_email: { type: String, default: '' },
  contact_phone: { type: String, default: '' },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_events' });

// Table: favourites
schemas['favourites'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  user_id: { type: Number, default: 0 },
  product_id: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_favourites' });

// Table: leads
schemas['leads'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  email: { type: String, default: '' },
  mobile: { type: String, default: '' },
  ambassador_code: { type: String, default: '' },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_leads' });

// Table: notifications
schemas['notifications'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  user_id: { type: Number, default: 0 },
  notification_title: { type: String, default: '' },
  notification_description: { type: String, default: '' },
  created_at: { type: Date, default: null },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_notifications' });

// Table: orders
schemas['orders'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  unique_id: { type: String, default: '' },
  device_id: { type: String, default: '' },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  mobile: { type: String, default: '' },
  someone_else_name: { type: String, default: '' },
  user_id: { type: Number, default: 0 },
  shop_id: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  tax_amount: { type: Number, default: 0 },
  deduct_amount: { type: Number, default: 0 },
  total_amount: { type: Number, default: 0 },
  wallet_amount: { type: Number, default: 0 },
  online_amount: { type: Number, default: 0 },
  outlet_commission_rate: { type: Number, default: 0 },
  outlet_commission_amount: { type: Number, default: 0 },
  transaction_id: { type: String, default: '' },
  payment_type: { type: Number, default: 0 },
  tips: { type: Number, default: 0 },
  order_date: { type: String, default: '' },
  order_time: { type: String, default: '' },
  created_at: { type: Date, default: null },
  status: { type: Number, default: 0 },
  accept_time: { type: String, default: '' },
  ready_time: { type: String, default: '' },
  complete_time: { type: String, default: '' },
  abandone_time: { type: String, default: '' },
  is_abandone_count_start: { type: Number, default: 0 },
  is_order_abandoned: { type: Number, default: 0 },
  scanned_by: { type: Number, default: 0 },
  order_type: { type: Number, default: 0 },
  table_no: { type: String, default: '' },
  floor: { type: String, default: '' },
  served_by: { type: Number, default: 0 },
  is_ready: { type: Number, default: 0 },
  sqaure_order_id: { type: String, default: '' },
  cancellation_reason: { type: String, default: '' },
  deleted_by_user: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_orders' });

// Table: order_cancellation
schemas['order_cancellation'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  order_id: { type: String, default: '' },
  cancellation_reason: { type: String, default: '' },
  cancellation_charge: { type: Number, default: 0 },
  created_at: { type: Date, default: null },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_order_cancellation' });

// Table: order_products
schemas['order_products'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  order_id: { type: Number, default: 0 },
  user_id: { type: Number, default: 0 },
  product_id: { type: Number, default: 0 },
  product_name: { type: String, default: '' },
  choice_of_alcohol_name: { type: String, default: '' },
  choice_of_mixer_name: { type: String, default: '' },
  is_double_shot: { type: Number, default: 0 },
  double_shot_price: { type: Number, default: 0 },
  shot_count: { type: Number, default: 0 },
  special_instruction: { type: String, default: '' },
  unit: { type: String, default: '' },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  order_date: { type: Date, default: null },
  shop_id: { type: Number, default: 0 },
  is_served: { type: Number, default: 0 },
  served_by: { type: Number, default: 0 },
  is_liquor: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_order_products' });

// Table: outlet_ledger
schemas['outlet_ledger'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  order_id: { type: String, default: '' },
  shop_id: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  type: { type: Number, default: 0 },
  note: { type: String, default: '' },
  created_at: { type: Date, default: null },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_outlet_ledger' });

// Table: outlet_notifications
schemas['outlet_notifications'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  shop_id: { type: Number, default: 0 },
  user_id: { type: Number, default: 0 },
  title: { type: String, default: '' },
  notification: { type: String, default: '' },
  is_read: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_outlet_notifications' });

// Table: outlet_transactions
schemas['outlet_transactions'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  shop_id: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  payment_type: { type: Number, default: 0 },
  bank_name: { type: String, default: '' },
  payment_details: { type: String, default: '' },
  created_at: { type: Date, default: null },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_outlet_transactions' });

// Table: outlet_users
schemas['outlet_users'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  shop_id: { type: Number, default: 0 },
  name: { type: String, default: '' },
  mobile: { type: String, default: '' },
  password: { type: String, default: '' },
  device_type: { type: Number, default: 0 },
  device_id: { type: String, default: '' },
  type: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_outlet_users' });

// Table: payment_receivables
schemas['payment_receivables'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  shop_id: { type: Number, default: 0 },
  order_date: { type: Date, default: null },
  commission_amount: { type: Number, default: 0 },
  tips_amount: { type: Number, default: 0 },
  tax_amount: { type: Number, default: 0 },
  cancellation_charge: { type: Number, default: 0 },
  total_amount: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_payment_receivables' });

// Table: products
schemas['products'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  category_id: { type: Number, default: 0 },
  sub_category_id: { type: Number, default: 0 },
  shop_id: { type: Number, default: 0 },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  has_variation: { type: Number, default: 0 },
  image: { type: String, default: '' },
  price: { type: Number, default: 0 },
  is_double_shot: { type: Number, default: 0 },
  double_shot_price: { type: Number, default: 0 },
  highest_price: { type: Number, default: 0 },
  lowest_price: { type: Number, default: 0 },
  current_price: { type: Number, default: 0 },
  stock_count: { type: Number, default: 0 },
  stock_alert: { type: Number, default: 0 },
  is_add_mixture: { type: Number, default: 0 },
  choice_of_alcohol_sub_category: { type: Number, default: 0 },
  choice_of_mixture_sub_category: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
  is_show: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_products' });

// Table: product_date_prices
schemas['product_date_prices'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  product_id: { type: Number, default: 0 },
  order_date: { type: String, default: '' },
  price: { type: Number, default: 0 },
  highest_price: { type: Number, default: 0 },
  lowest_price: { type: Number, default: 0 },
  current_price: { type: Number, default: 0 },
  last_ordered_quantity: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_product_date_prices' });

// Table: product_variations
schemas['product_variations'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  product_id: { type: Number, default: 0 },
  variation: { type: String, default: '' },
  price: { type: Number, default: 0 },
  highest_price: { type: Number, default: 0 },
  lowest_price: { type: Number, default: 0 },
  current_price: { type: Number, default: 0 },
  stock_count: { type: Number, default: 0 },
  stock_alert: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_product_variations' });

// Table: product_variations_date_prices
schemas['product_variations_date_prices'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  product_id: { type: Number, default: 0 },
  variation: { type: String, default: '' },
  order_date: { type: String, default: '' },
  price: { type: Number, default: 0 },
  highest_price: { type: Number, default: 0 },
  lowest_price: { type: Number, default: 0 },
  current_price: { type: Number, default: 0 },
  last_ordered_quantity: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_product_variations_date_prices' });

// Table: shops
schemas['shops'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  name: { type: String, default: '' },
  image: { type: String, default: '' },
  address: { type: String, default: '' },
  lat: { type: Number, default: 0 },
  lng: { type: Number, default: 0 },
  city_id: { type: Number, default: 0 },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  phone: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  review: { type: String, default: '' },
  offer_rate: { type: Number, default: 0 },
  offer_text: { type: String, default: '' },
  house_rules: { type: String, default: '' },
  gst_no: { type: String, default: '' },
  pan_no: { type: String, default: '' },
  aadhar_no: { type: String, default: '' },
  gst_image: { type: String, default: '' },
  pan_image: { type: String, default: '' },
  aadhar_image: { type: String, default: '' },
  is_fixed_price: { type: Number, default: 0 },
  start_time: { type: String, default: '' },
  end_time: { type: String, default: '' },
  tax_rate: { type: Number, default: 0 },
  commission_rate: { type: Number, default: 0 },
  opening_time: { type: String, default: '' },
  close_time: { type: String, default: '' },
  is_coming_soon: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
  is_open: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_shops' });

// Table: slots
schemas['slots'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  shop_id: { type: Number, default: 0 },
  start_time: { type: String, default: '' },
  end_time: { type: String, default: '' },
  comment: { type: String, default: '' },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_slots' });

// Table: stock_logs
schemas['stock_logs'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  shop_id: { type: Number, default: 0 },
  product_id: { type: Number, default: 0 },
  type: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
  comment: { type: String, default: '' },
  order_id: { type: String, default: '' },
  created_at: { type: Date, default: null },
}, { timestamps: true, collection: 'sql_stock_logs' });

// Table: sub_categories
schemas['sub_categories'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  name: { type: String, default: '' },
  unit_name: { type: String, default: '' },
  image: { type: String, default: '' },
  category_id: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_sub_categories' });

// Table: tables
schemas['tables'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  shop_id: { type: Number, default: 0 },
  title: { type: String, default: '' },
  capacity: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_tables' });

// Table: table_bookings
schemas['table_bookings'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  table_id: { type: Number, default: 0 },
  shop_id: { type: Number, default: 0 },
  waiter_id: { type: Number, default: 0 },
  name: { type: String, default: '' },
  mobile: { type: String, default: '' },
  booking_date: { type: Date, default: null },
  booking_time: { type: String, default: '' },
  is_completed: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_table_bookings' });

// Table: table_booking_requests
schemas['table_booking_requests'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  unique_id: { type: String, default: '' },
  user_id: { type: Number, default: 0 },
  shop_id: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  name: { type: String, default: '' },
  mobile: { type: String, default: '' },
  date: { type: Date, default: null },
  slot: { type: String, default: '' },
  person: { type: Number, default: 0 },
  is_checked_in: { type: Number, default: 0 },
  cancellation_reason: { type: String, default: '' },
  is_rescheduled: { type: Number, default: 0 },
  is_cancelled: { type: Number, default: 0 },
  deleted_by_user: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_table_booking_requests' });

// Table: table_carts
schemas['table_carts'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  shop_id: { type: Number, default: 0 },
  table_id: { type: Number, default: 0 },
  product_id: { type: Number, default: 0 },
  product_name: { type: String, default: '' },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  is_liquor: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_table_carts' });

// Table: table_orders
schemas['table_orders'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  unique_id: { type: String, default: '' },
  table_id: { type: String, default: '' },
  waiter_id: { type: Number, default: 0 },
  name: { type: String, default: '' },
  mobile: { type: String, default: '' },
  shop_id: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  tax_amount: { type: Number, default: 0 },
  deduct_amount: { type: Number, default: 0 },
  total_amount: { type: Number, default: 0 },
  payment_type: { type: Number, default: 0 },
  order_date: { type: String, default: '' },
  order_time: { type: String, default: '' },
  created_at: { type: Date, default: null },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_table_orders' });

// Table: table_order_products
schemas['table_order_products'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  order_id: { type: Number, default: 0 },
  table_id: { type: Number, default: 0 },
  product_id: { type: Number, default: 0 },
  product_name: { type: String, default: '' },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  order_date: { type: Date, default: null },
  shop_id: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_table_order_products' });

// Table: tbl_orders
schemas['tbl_orders'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  unique_id: { type: String, default: '' },
  device_id: { type: String, default: '' },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  mobile: { type: String, default: '' },
  someone_else_name: { type: String, default: '' },
  shop_id: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  tax_amount: { type: Number, default: 0 },
  deduct_amount: { type: Number, default: 0 },
  total_amount: { type: Number, default: 0 },
  wallet_amount: { type: Number, default: 0 },
  online_amount: { type: Number, default: 0 },
  outlet_commission_rate: { type: Number, default: 0 },
  outlet_commission_amount: { type: Number, default: 0 },
  transaction_id: { type: String, default: '' },
  payment_type: { type: Number, default: 0 },
  tips: { type: Number, default: 0 },
  order_date: { type: String, default: '' },
  order_time: { type: String, default: '' },
  created_at: { type: Date, default: null },
  status: { type: Number, default: 0 },
  accept_time: { type: String, default: '' },
  ready_time: { type: String, default: '' },
  complete_time: { type: String, default: '' },
  abandone_time: { type: String, default: '' },
  is_abandone_count_start: { type: Number, default: 0 },
  is_order_abandoned: { type: Number, default: 0 },
  scanned_by: { type: Number, default: 0 },
  order_type: { type: Number, default: 0 },
  table_no: { type: String, default: '' },
  floor: { type: String, default: '' },
  served_by: { type: Number, default: 0 },
  is_ready: { type: Number, default: 0 },
  sqaure_order_id: { type: String, default: '' },
  cancellation_reason: { type: String, default: '' },
  deleted_by_user: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_tbl_orders' });

// Table: tbl_order_products
schemas['tbl_order_products'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  order_id: { type: Number, default: 0 },
  product_id: { type: Number, default: 0 },
  product_name: { type: String, default: '' },
  choice_of_alcohol_name: { type: String, default: '' },
  choice_of_mixer_name: { type: String, default: '' },
  is_double_shot: { type: Number, default: 0 },
  double_shot_price: { type: Number, default: 0 },
  shot_count: { type: Number, default: 0 },
  special_instruction: { type: String, default: '' },
  unit: { type: String, default: '' },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  order_date: { type: Date, default: null },
  shop_id: { type: Number, default: 0 },
  is_served: { type: Number, default: 0 },
  served_by: { type: Number, default: 0 },
  is_liquor: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_tbl_order_products' });

// Table: temp_carts
schemas['temp_carts'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  device_id: { type: String, default: '' },
  product_id: { type: Number, default: 0 },
  product_name: { type: String, default: '' },
  choice_of_alcohol_name: { type: String, default: '' },
  choice_of_mixer_name: { type: String, default: '' },
  is_double_shot: { type: Number, default: 0 },
  shot_count: { type: Number, default: 0 },
  double_shot_price: { type: Number, default: 0 },
  special_instruction: { type: String, default: '' },
  unit: { type: String, default: '' },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  add_on_id1: { type: Number, default: 0 },
  add_on_name1: { type: String, default: '' },
  add_on_price1: { type: Number, default: 0 },
  add_on_quantity1: { type: Number, default: 0 },
  add_on_unit1: { type: String, default: '' },
  add_on_id2: { type: Number, default: 0 },
  add_on_name2: { type: String, default: '' },
  add_on_price2: { type: Number, default: 0 },
  add_on_quantity2: { type: Number, default: 0 },
  add_on_unit2: { type: String, default: '' },
  instruction: { type: String, default: '' },
  is_liquor: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_temp_carts' });

// Table: users
schemas['users'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  mobile: { type: String, default: '' },
  password: { type: String, default: '' },
  image: { type: String, default: '' },
  gender: { type: Number, default: 0 },
  dob: { type: Date, default: null },
  otp: { type: Number, default: 0 },
  is_verified: { type: Number, default: 0 },
  referral_code: { type: String, default: '' },
  referrer_code: { type: String, default: '' },
  referred_by: { type: Number, default: 0 },
  is_ambassador: { type: Number, default: 0 },
  ambassador_code: { type: String, default: '' },
  used_ambassador_code: { type: String, default: '' },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
  created_at: { type: Date, default: null },
}, { timestamps: true, collection: 'sql_users' });

// Table: user_cards
schemas['user_cards'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  user_id: { type: Number, default: 0 },
  card_no: { type: String, default: '' },
  month: { type: String, default: '' },
  year: { type: String, default: '' },
  holder_name: { type: String, default: '' },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_user_cards' });

// Table: user_notifications
schemas['user_notifications'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  user_id: { type: Number, default: 0 },
  title: { type: String, default: '' },
  notification: { type: String, default: '' },
  is_read: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_user_notifications' });

// Table: user_search_keywords
schemas['user_search_keywords'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  user_id: { type: Number, default: 0 },
  keyword: { type: String, default: '' },
}, { timestamps: true, collection: 'sql_user_search_keywords' });

// Table: vault_carts
schemas['vault_carts'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  device_id: { type: String, default: '' },
  product_id: { type: Number, default: 0 },
  product_name: { type: String, default: '' },
  vault_category_id: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_vault_carts' });

// Table: vault_categories
schemas['vault_categories'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  name: { type: String, default: '' },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_vault_categories' });

// Table: vault_orders
schemas['vault_orders'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  unique_id: { type: String, default: '' },
  device_id: { type: String, default: '' },
  user_id: { type: Number, default: 0 },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  mobile: { type: String, default: '' },
  amount: { type: Number, default: 0 },
  tax_amount: { type: Number, default: 0 },
  deduct_amount: { type: Number, default: 0 },
  total_amount: { type: Number, default: 0 },
  created_at: { type: Date, default: null },
  end_date: { type: Date, default: null },
  transaction_id: { type: String, default: '' },
  payment_type: { type: Number, default: 0 },
  has_renewed: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_vault_orders' });

// Table: vault_order_products
schemas['vault_order_products'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  order_id: { type: Number, default: 0 },
  product_id: { type: Number, default: 0 },
  product_name: { type: String, default: '' },
  vault_category_id: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  user_id: { type: Number, default: 0 },
  order_date: { type: Date, default: null },
  deleted_by_user: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_vault_order_products' });

// Table: vault_products
schemas['vault_products'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  name: { type: String, default: '' },
  image: { type: String, default: '' },
  category_id: { type: Number, default: 0 },
  sub_category_id: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_vault_products' });

// Table: vault_product_prices
schemas['vault_product_prices'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  product_id: { type: Number, default: 0 },
  vault_category_id: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_vault_product_prices' });

// Table: vault_renew_logs
schemas['vault_renew_logs'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  vault_order_id: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  created_at: { type: Date, default: null },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_vault_renew_logs' });

// Table: vault_shops
schemas['vault_shops'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  vault_category_id: { type: Number, default: 0 },
  name: { type: String, default: '' },
  image: { type: String, default: '' },
  address: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  review: { type: String, default: '' },
  main_shop_id: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_vault_shops' });

// Table: vault_user_redeems
schemas['vault_user_redeems'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  user_id: { type: Number, default: 0 },
  order_id: { type: Number, default: 0 },
  quantiy: { type: Number, default: 0 },
  shop_id: { type: Number, default: 0 },
  redeem_date: { type: Date, default: null },
  redeem_time: { type: String, default: '' },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_vault_user_redeems' });

// Table: wallets
schemas['wallets'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  user_id: { type: Number, default: 0 },
  type: { type: Number, default: 0 },
  credit_type: { type: Number, default: 0 },
  date_time: { type: Date, default: null },
  amount: { type: Number, default: 0 },
  status: { type: Number, default: 0 },
  transaction_id: { type: String, default: '' },
  pay_id: { type: String, default: '' },
  order_id: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_wallets' });

// Table: watch_lists
schemas['watch_lists'] = new mongoose.Schema({
  sqlId: { type: Number, unique: true, sparse: true, index: true },
  user_id: { type: Number, default: 0 },
  store_id: { type: Number, default: 0 },
}, { timestamps: true, collection: 'sql_watch_lists' });

const models = {};
for (const [name, schema] of Object.entries(schemas)) {
  // Mongoose model name = "Sql" + StudlyCase(name)
  const studly = 'Sql' + name.split('_').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  models[name] = mongoose.models[studly] || mongoose.model(studly, schema);
}

module.exports = { schemas, models, tableNames: Object.keys(schemas) };
