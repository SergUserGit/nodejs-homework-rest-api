const validBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        res.status(400).json({
          message: "missing required " + error.details[0].path[0] + " field",
        })
      );
    }
    next();
  };
  return func;
};

const validEmptyBody = (schemaName, schemaEmail, schemaPhone) => {
  const func = (req, res, next) => {
    const { error: errorName } = schemaName.validate(req.body);
    const { error: errorEmail } = schemaEmail.validate(req.body);
    const { error: errorPhone } = schemaPhone.validate(req.body);

    const typePhone =
      typeof errorPhone === "object" ? errorPhone.details[0].type : "";
    const typeEmail =
      typeof errorEmail === "object" ? errorEmail.details[0].type : "";
    const typeName =
      typeof errorName === "object" ? errorName.details[0].type : "";

    if (
      typePhone === "any.required" &&
      typeEmail === "any.required" &&
      typeName === "any.required"
    ) {
      next(res.status(400).json({ message: "missing fields" }));
    }
    next();
  };
  return func;
};

module.exports = { validBody, validEmptyBody };
