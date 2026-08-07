const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    default: null,
    select: false
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Blocked'],
    default: 'Active'
  },
  walletBalance: {
    type: Number,
    default: 0
  },
  referralCode: {
    type: String,
    unique: true,
    sparse: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  profileImage: {
    type: String,
    default: null
  },
  deviceToken: {
    type: String,
    default: null
  },

  // === SQL parity fields (mirrors MySQL table `users`) ===
  sqlId: { type: Number, index: true, sparse: true },
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

}, {
  timestamps: true
});

// Hash password before save
userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  if (!this.referralCode) {
    this.referralCode = 'LIQ' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  next();
});

userSchema.methods.comparePassword = async function (plain) {
  if (!this.password) return false;
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model('User', userSchema);