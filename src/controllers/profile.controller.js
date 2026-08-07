const { Outlet } = require('../models');

// GET /api/outlet-profile/me — current outlet's full profile
exports.getProfile = async (req, res) => {
  const outlet = await Outlet.findById(req.outletId);
  return res.json({ success: true, data: outlet });
};

// PUT /api/outlet-profile/me — update Edit Outlet form fields
exports.updateProfile = async (req, res) => {
  try {
    const allowed = [
      'name', 'phone', 'address', 'city', 'state', 'country', 'postalCode',
      'shopImage', 'offerRate', 'offerText', 'houseRules',
      'hstNo', 'hstImage',
      'businessIdProofNo', 'businessIdProofImage',
      'ownerIdProofCard', 'ownerIdProofImage',
      'openingTime', 'closingTime',
      'logo', 'description', 'taxRate'
    ];
    const update = {};
    for (const k of allowed) if (k in req.body) update[k] = req.body[k];

    const outlet = await Outlet.findByIdAndUpdate(req.outletId, update, { new: true, runValidators: true });
    return res.json({ success: true, message: 'Profile updated.', data: outlet });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Update failed.', error: err.message });
  }
};

// PATCH /api/outlet-profile/shop-status — toggle Shop Open/Close
exports.toggleShopStatus = async (req, res) => {
  try {
    const { isShopOpen } = req.body;
    const next = typeof isShopOpen === 'boolean' ? isShopOpen : !req.outlet.isShopOpen;
    const outlet = await Outlet.findByIdAndUpdate(req.outletId, { isShopOpen: next }, { new: true });
    return res.json({
      success: true,
      message: next ? 'Shop is now OPEN.' : 'Shop is now CLOSED.',
      data: { isShopOpen: outlet.isShopOpen }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Toggle failed.', error: err.message });
  }
};
