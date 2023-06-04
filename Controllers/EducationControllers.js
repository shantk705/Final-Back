const asyncHandler = require("express-async-handler");
const Ex = require("../Models/Experience");
var mongoose = require("mongoose");

const addEx = asyncHandler(async (req, res) => {
  const { user_id, role, company, ex_start, ex_end, description } = req.body;

  if (!user_id || !role || !company || !ex_start || !ex_end || !description) {
    res.status(400).send("please fill all the required fields");
  }
  let experience = await Ex.create({
    user_id,
    role,
    company,
    ex_start,
    ex_end,
    description,
  });
  res.status(201).send(experience);
});

const editEx = asyncHandler(async (req, res) => {
  let _id = req.params.id;
  const { role, company, ex_start, ex_end, description } = req.body;
  let edu = await Ex.findOne({ _id });
  if (edu) {
    edu.role = role;
    edu.company = company;
    edu.ex_start = ex_start;
    edu.ex_end = ex_end;
    edu.description = description;
    let updated = await edu.save();
    if (updated) {
      res.status(201).send(updated);
    } else {
      res.status(400).send("something wrong with the inputs");
    }
  } else {
    res.status(400).send("education not found");
  }
});

const removeEx = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let deleted = await Ex.findByIdAndDelete(id);
  if (deleted) {
    res.status(201).send("deleted successfully");
  } else {
    res.status(400).send("experience not found ");
  }
});

const getEx = asyncHandler(async (req, res) => {
  let id = req.params.id;

  let educations = await Ex.find({ user_id: id });
  if (educations) {
    res.status(201).send(educations);
  } else {
    res.status(201).send("no educations found");
  }
});

module.exports = { removeEx, addEx, editEx, getEx };
