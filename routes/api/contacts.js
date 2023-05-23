const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validate, isValidId } = require("../../middlewars");
const { shemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validate.validBody(shemas.addSchema, false), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteRecord);

router.put(
  "/:contactId",
  isValidId,
  validate.validBody(shemas.addSchema, true),
  ctrl.update
);

module.exports = router;
