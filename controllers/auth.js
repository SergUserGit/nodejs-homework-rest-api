const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: `Email - ${email} in use` });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {}
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: `Email or password is wrong` });
    }

    const passwordCompare = await bcryptjs.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ message: `Email or password is wrong` });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {}
};

const logout = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({ message: "" });
  } catch (error) {}
};

const getCurrent = async (req, res) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {}
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
};
