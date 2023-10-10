const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validate,
  isValidId,
  validFavorite,
  autentificate,
} = require("../../middlewars");
const { shemas } = require("../../models/contact");

router.get("/", autentificate, ctrl.getAll);

router.get("/:contactId", autentificate, isValidId, ctrl.getById);

router.post(
  "/",
  autentificate,
  validate.validBody(shemas.addSchema, false),
  ctrl.add
);

router.delete("/:contactId", autentificate, isValidId, ctrl.deleteRecord);

router.put(
  "/:contactId",
  autentificate,
  isValidId,
  validate.validBody(shemas.addSchema, true),
  ctrl.update
);

router.patch(
  "/:contactId/favorite",
  autentificate,
  isValidId,
  validate.validFavorite(shemas.updateFavoriteSchemas),
  ctrl.updateStatusContact
);

module.exports = router;
