const express = require("express");
const { get } = require("mongoose");
const router = express.Router();
const {
  addEx,
  editEx,
  removeEx,
  getEx,
} = require("../Controllers/EducationControllers");

router.post("/add", addEx);
router.patch("/edit/:id", editEx);
router.delete("/delete/:id", removeEx);
router.get("/get/:id", getEx);

module.exports = router;
