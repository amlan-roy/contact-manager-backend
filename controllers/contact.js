import asyncHandler from "express-async-handler";
import ContactModel from "../models/contactModel.js";

/**
 * @description Get all contacts
 * @route GET /api/contacts
 * @access public
 */
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await ContactModel.find();
  res.status(200).json(contacts);
});

/**
 * @description Get a contact
 * @route GET /api/contacts/:id
 * @access public
 */
const getContact = asyncHandler(async (req, res) => {
  const contact = await ContactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contact);
});

/**
 * @description create a new contact
 * @route POST /api/contacts
 * @access public
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
  });

  res.status(201).json(contact);
});

/**
 * @description update a contact
 * @route PUT /api/contacts/:id
 * @access public
 */
const updateContact = asyncHandler(async (req, res) => {
  const contact = await ContactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  const updatedContact = await ContactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

/**
 * @description delete contact
 * @route DELETE /api/contacts/:id
 * @access public
 */
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await ContactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  const deletedContact = await ContactModel.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedContact);
});

export { getContact, getContacts, createContact, updateContact, deleteContact };
