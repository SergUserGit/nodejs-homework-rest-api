const bcryptjs = require("bcryptjs");

const { User } = require("../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ message: `Email - ${email} in use` });
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = {
  register: register,
};
