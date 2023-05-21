const express = require("express");
const { get } = require("mongoose");
const router = express.Router();
const {
  addEdu,
  editEdu,
  removeEdu,
  getEdu,
} = require("../Controllers/EducationControllers");

router.post("/add", addEdu);
router.patch("/edit/:id", editEdu);
router.delete("/delete/:id", removeEdu);
router.get("/get/:id", getEdu);

module.exports = router;
