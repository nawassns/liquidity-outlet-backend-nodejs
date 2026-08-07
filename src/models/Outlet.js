const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Outlet model — extended with all PHP "Edit Outlet" page fields + outlet admin auth
const outletSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true, unique: true },
  password: { type: String, default: null, select: false }, // outlet admin login
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  city: { type: String, default: null },
  state: { type: String, default: null },
  country: { type: String, default: 'Canada' },
  postalCode: { type: String, default: null },

  // Business / KYC fields (from My Profile screenshot)
  shopImage: { type: String, default: null },          // SHOP IMAGE
  offerRate: { type: Number, default: 0 },             // OFFER RATE
  offerText: { type: String, default: null },          // OFFER TEXT
  houseRules: { type: String, default: null },         // HOUSE RULES
  hstNo: { type: String, default: null },              // HST NO
  hstImage: { type: String, default: null },           // HST IMAGE
  businessIdProofNo: { type: String, default: null },  // BUSINESS IDENTITY PROOF NO
  businessIdProofImage: { type: String, default: null }, // BUSINESS IDENTITY PROOF IMAGE
  ownerIdProofCard: { type: String, default: null },   // YOUR IDENTITY PROOF CARD
  ownerIdProofImage: { type: String, default: null },  // YOUR IDENTITY PROOF IMAGE
  openingTime: { type: String, default: null },        // OPENING TIME
  closingTime: { type: String, default: null },        // CLOSE TIME

  // Operational
  followsFixedPrice: { type: Boolean, default: true },
  payablePercentageToOutlets: { type: Number, default: 0, min: 0, max: 100 },
  taxRate: { type: Number, default: 13, min: 0, max: 100 },
  isShopOpen: { type: Boolean, default: false },       // Shop Open/Close toggle
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  logo: { type: String, default: null },
  description: { type: String, default: null },

  // === SQL parity fields (mirrors MySQL table `shops`) ===
  sqlId: { type: Number, index: true, sparse: true },
  image: { type: String, default: '' },
  lat: { type: Number, default: 0 },
  lng: { type: Number, default: 0 },
  city_id: { type: Number, default: 0 },
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

}, { timestamps: true });

// Hash password before save
outletSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

outletSchema.methods.comparePassword = async function (plain) {
  if (!this.password) return false;
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model('Outlet', outletSchema);
