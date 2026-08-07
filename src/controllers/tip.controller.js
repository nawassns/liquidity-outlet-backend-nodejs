const { Tip } = require('../models');

// POST /api/tips
exports.create = async (req, res) => {
  try {
    const tip = await Tip.create({ ...req.body, outletId: req.outletId });
    return res.status(201).json({ success: true, message: 'Tip recorded.', data: tip });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Create failed.', error: err.message });
  }
};

exports.getOne = async (req, res) => {
  const tip = await Tip.findOne({ _id: req.params.id, outletId: req.outletId });
  if (!tip) return res.status(404).json({ success: false, message: 'Tip not found.' });
  return res.json({ success: true, data: tip });
};

exports.update = async (req, res) => {
  const tip = await Tip.findOneAndUpdate(
    { _id: req.params.id, outletId: req.outletId }, req.body, { new: true, runValidators: true }
  );
  if (!tip) return res.status(404).json({ success: false, message: 'Tip not found.' });
  return res.json({ success: true, message: 'Tip updated.', data: tip });
};

exports.remove = async (req, res) => {
  const tip = await Tip.findOneAndDelete({ _id: req.params.id, outletId: req.outletId });
  if (!tip) return res.status(404).json({ success: false, message: 'Tip not found.' });
  return res.json({ success: true, message: 'Tip deleted.' });
};
