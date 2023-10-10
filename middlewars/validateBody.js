const validBody = (schema, isPutQuery) => {
  const func = (req, res, next) => {
    if (isPutQuery) {
      const bodyEmpty = Object.keys(req.body).length === 0;
      if (bodyEmpty) {
        next(res.status(400).json({ message: "missing fields" }));
      }
    }

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

const validFavorite = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        res.status(400).json({
          message: "missing field favorite",
        })
      );
    }
    next();
  };
  return func;
};

module.exports = { validBody, validFavorite };
