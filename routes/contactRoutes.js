const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
});
router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Get contact with id: ${req.params.id}` });
});
router.post("/", (req, res) => {
  res.status(200).json({ message: "Create contact" });
});
router.put("/:id", (req, res) => {
  res.status(200).json({ message: `Update contact with id: ${req.params.id}` });
});
router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Delete contact with id: ${req.params.id}` });
});

module.exports = router;
