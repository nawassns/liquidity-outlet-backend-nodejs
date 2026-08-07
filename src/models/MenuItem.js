const mongoose = require('mongoose');

// MenuItem — items the outlet sells (Food + Drinks). Different from VaultItem (master catalog).
const menuItemSchema = new mongoose.Schema({
  outletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true }, // e.g. Whisky, Beer, Food, Starters
  subCategory: { type: String, default: null, trim: true },
  description: { type: String, default: null },
  image: { type: String, default: null },
  price: { type: Number, required: true, min: 0 },
  unit: { type: String, default: '1 Plate' },             // "60ml", "1 Plate", "Glass"
  type: { type: String, enum: ['Food', 'Drink'], default: 'Drink' },
  vaultItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'VaultItem', default: null }, // optional link
  isAvailable: { type: Boolean, default: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },

  // === SQL parity fields (mirrors MySQL table `products`) ===
  sqlId: { type: Number, index: true, sparse: true },
  category_id: { type: Number, default: 0 },
  sub_category_id: { type: Number, default: 0 },
  shop_id: { type: Number, default: 0 },
  has_variation: { type: Number, default: 0 },
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

}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
