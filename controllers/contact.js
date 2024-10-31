/**
 * @description Get all contacts
 * @route GET /api/contacts
 * @access public
 */
const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
};

/**
 * @description Get a contact
 * @route GET /api/contacts/:id
 * @access public
 */
const getContact = (req, res) => {
  res.status(200).json({ message: `Get contact with id: ${req.params.id}` });
};

/**
 * @description create a new contact
 * @route POST /api/contacts
 * @access public
 */
const createContact = (req, res) => {
  const { name, email, phone } = req.body || {};

  const fieldsMissing = !name || !email || !phone;
  if (fieldsMissing) {
    res.status(400);
    throw new Error("All fields (name, email and phone) are required");
  }

  res.status(201).json({ message: "Create contact" });
};

/**
 * @description update a contact
 * @route UPDATE /api/contacts/:id
 * @access public
 */
const updateContact = (req, res) => {
  res.status(200).json({ message: `Update contact with id: ${req.params.id}` });
};

/**
 * @description delete contact
 * @route DELETE /api/contacts/:id
 * @access public
 */
const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete contact with id: ${req.params.id}` });
};

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
