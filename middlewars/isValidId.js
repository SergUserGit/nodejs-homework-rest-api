const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(
      res.status(400).json({ message: `Entered invalid id - ${contactId}` })
    );
  }
  next();
};

module.exports = isValidId;
