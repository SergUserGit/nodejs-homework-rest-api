const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const addSchemaName = Joi.object({
  name: Joi.string().required(),
});

const addSchemaEmail = Joi.object({
  email: Joi.string().required(),
});

const addSchemaPhone = Joi.object({
  phone: Joi.string().required(),
});

module.exports = {
  addSchema,
  addSchemaName,
  addSchemaEmail,
  addSchemaPhone,
};
