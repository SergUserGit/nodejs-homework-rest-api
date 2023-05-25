const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const autentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(res.status(401).json({ message: `Not authorized by token` }));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(
        res.status(401).json({
          message: `User not found by id - ${id} or not found by token - ${token}`,
        })
      );
    }
    req.user = user;
    next();
  } catch {
    next(res.status(401).json({ message: `Token ${token} is not valid` }));
  }
};

module.exports = autentificate;
