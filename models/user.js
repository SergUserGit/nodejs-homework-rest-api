const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userShema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false }
);

const registerShema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginShema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const Shemas = {
  registerShema,
  loginShema,
};

const User = model("user", userShema);

module.exports = {
  User,
  Shemas,
};
