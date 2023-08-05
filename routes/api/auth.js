const express = require("express");
const ctrl = require("../../controllers/auth");

const { validate, autentificate } = require("../../middlewars");
const { Shemas } = require("../../models/user");
const router = express.Router();

router.post(
  "/register",
  validate.validBody(Shemas.registerShema),
  ctrl.register
);

router.post("/login", validate.validBody(Shemas.loginShema), ctrl.login);

router.post("/logout", autentificate, ctrl.logout);

router.get("/current", autentificate, ctrl.getCurrent);

module.exports = router;
