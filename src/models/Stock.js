const mongoose = require('mongoose');

// Stock — inventory tracking per outlet & menuItem (or vaultItem).
// Categories from PHP: Whisky, Beer, Specialty Cocktails, Vodka, Gin, Tequila,
// Rum, Wines & Sangria, Beverage, Liquor, Non Alcoholic, Bar Rail
const stockSchema = new mongoose.Schema({
  outletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Outlet', required: true, index: true },
  menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', default: null, index: true },
  vaultItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'VaultItem', default: null, index: true },
  category: { type: String, required: true, trim: true },
  subCategory: { type: String, default: null, trim: true },
  itemName: { type: String, required: true, trim: true },
  lockPrice: { type: Number, default: 0 },                 // PHP "Lock Price"
  currentStock: { type: Number, default: 0, min: 0 },      // PHP "Current Stock"
  highestPrice: { type: Number, default: 0 },              // for Current Price report
  minimumPrice: { type: Number, default: 0 },              // for Current Price report
  currentPrice: { type: Number, default: 0 },              // for Current Price report
  unit: { type: String, default: 'Units' },
  lowStockAlert: { type: Number, default: 5 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },

  // === SQL parity fields (mirrors MySQL table `products`) ===
  sqlId: { type: Number, index: true, sparse: true },
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

}, { timestamps: true });

stockSchema.index({ outletId: 1, category: 1 });

module.exports = mongoose.model('Stock', stockSchema);
