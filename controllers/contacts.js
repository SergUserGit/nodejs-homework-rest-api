const { Contact } = require("../models/contact");

const getAll = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.find({ owner });
    res.json(result);
  } catch (error) {}
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      return res
        .status(404)
        .json({ message: "Not data found on id - " + contactId });
    }
    res.json(result);
  } catch (error) {}
};

const add = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {}
};

const deleteRecord = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      return res
        .status(404)
        .json({ message: "Not data found on id - " + contactId });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {}
};

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      return res
        .status(404)
        .json({ message: "Not data found on id - " + contactId });
    }
    res.json(result);
  } catch (error) {}
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      return res
        .status(404)
        .json({ message: "Not data found on id - " + contactId });
    }
    res.json(result);
  } catch (error) {}
};

module.exports = {
  getAll,
  getById,
  add,
  deleteRecord,
  update,
  updateStatusContact,
};
