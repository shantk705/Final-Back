const asyncHandler = require("express-async-handler");
const Job = require("../Models/Job.js");
var mongoose = require("mongoose");

const addJob = asyncHandler(async (req, res) => {
  let { user_id, position, company, location, description, requirements } =
    req.body;
  if (
    !user_id ||
    !position ||
    !company ||
    !description ||
    !requirements ||
    !location
  ) {
    res.status(400).send("please fill all required info");
  }
  let response = await Job.create({
    user_id,
    position,
    company,
    location,
    description,
    requirements,
  });
  if (response) {
    res.status(201).send("job posted succesfully");
  }
});

const removeJob = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let job = await Job.findByIdAndDelete(id);
  if (job) {
    res.status(201).send("post deleted successfully");
  }
  res.status(400).send("job  not found ");
});

const updateJob = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let { position, company, location, description, requirements } = req.body;

  let job = await Job.findById(id);
  if (job) {
    job.position = position;
    job.company = company;
    job.location = location;
    job.description = description;
    job.requirements = requirements;
    let result = await job.save();
    if (result) {
      res.status(201).send("job post updated successfully");
    } else res.status(400).send("job did not update ");
  } else {
    res.status(400).send("job not found ");
  }
});

const getJobs = asyncHandler(async (req, res) => {
  let jobs = await Job.find();
  if (jobs) {
    res.status(200).send(jobs);
  } else {
    res.status(200).send("no jobs found ");
  }
});

const getMyJobs = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let myjobs = await Job.find({ user_id: id });
  if(myjobs){
    res.status(200).send(myjobs)
  }else{res.status(200).send("you dont have any posts yet ")}
});


module.exports={
    getMyJobs,
    getJobs,
    addJob,
    updateJob,
    removeJob
}
