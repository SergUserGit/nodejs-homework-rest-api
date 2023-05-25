const { User } = require("../models/user");

const register = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ message: `Email - ${email} in use` });
  }

  const newUser = await User.create(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = {
  register: register,
};
