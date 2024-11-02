import asyncHandler from "express-async-handler";
import ContactModel from "../models/contactModel.js";

/**
 * @description Get all contacts
 * @route GET /api/contacts
 * @access private
 */
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await ContactModel.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

/**
 * @description Get a contact
 * @route GET /api/contacts/:id
 * @access private
 */
const getContact = asyncHandler(async (req, res) => {
  const contact = await ContactModel.findOne({
    user_id: req.user.id,
    _id: req.params.id,
  });
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contact);
});

/**
 * @description create a new contact
 * @route POST /api/contacts
 * @access private
 */
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body || {};

  const fieldsMissing = !name || !email || !phone;
  if (fieldsMissing) {
    res.status(400);
    throw new Error("All fields (name, email and phone) are required");
  }
  if (typeof phone !== "number") {
    res.status(400);
    throw new Error("'phone' value should be a number");
  }

  const contact = await ContactModel.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

/**
 * @description update a contact
 * @route PUT /api/contacts/:id
 * @access private
 */
const updateContact = asyncHandler(async (req, res) => {
  const contact = await ContactModel.findOne({
    user_id: req.user.id,
    _id: req.params.id,
  });
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  const updatedContact = await ContactModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      phone,
    },
    { new: true }
  );
  res.status(200).json(updatedContact);
});

/**
 * @description delete contact
 * @route DELETE /api/contacts/:id
 * @access private
 */
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await ContactModel.findOne({
    user_id: req.user.id,
    _id: req.params.id,
  });
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  const deletedContact = await ContactModel.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedContact);
});

export { getContact, getContacts, createContact, updateContact, deleteContact };
