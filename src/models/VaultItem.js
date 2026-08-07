const mongoose = require('mongoose');

const vaultItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Tennessee Whiskey',
      'Scotch Whisky',
      'Bourbon',
      'Vodka',
      'Rum',
      'Gin',
      'Tequila',
      'Wine',
      'Beer',
      'Other'
    ]
  },
  description: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  basePrice: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  alcoholPercentage: {
    type: Number,
    default: 0
  },
  volume: {
    type: String,
    default: null
  },
  brand: {
    type: String,
    default: null
  },
  origin: {
    type: String,
    default: null
  },

  // === SQL parity fields (mirrors MySQL table `vault_products`) ===
  sqlId: { type: Number, index: true, sparse: true },
  category_id: { type: Number, default: 0 },
  sub_category_id: { type: Number, default: 0 },
  is_active: { type: Number, default: 0 },
  is_deleted: { type: Number, default: 0 },

}, {
  timestamps: true
});

module.exports = mongoose.model('VaultItem', vaultItemSchema);
