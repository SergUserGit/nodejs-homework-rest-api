const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validate } = require("../../middlewars");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validate.validBody(schemas.addSchema, false), ctrl.add);

router.delete("/:contactId", ctrl.deleteRecord);

router.put(
  "/:contactId",
  validate.validBody(schemas.addSchema, true),
  ctrl.update
);

module.exports = router;
