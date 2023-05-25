const express = require("express");
const ctrl = require("../../controllers/auth");

const { validate } = require("../../middlewars");
const { Shemas } = require("../../models/user");
const router = express.Router();

router.post(
  "/register",
  validate.validBody(Shemas.registerShema),
  ctrl.register
);

router.post("/login", validate.validBody(Shemas.loginShema), ctrl.login);

module.exports = router;
