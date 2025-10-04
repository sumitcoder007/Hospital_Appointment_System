const User = require('../models/User');

// Get all patients or doctors
exports.getUsers = async (req, res) => {
  const { role } = req.query;
  const users = await User.find(role ? { role } : {}).select('-password');
  res.json(users);
};
