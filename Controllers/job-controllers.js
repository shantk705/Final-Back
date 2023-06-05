const asyncHandler = require("express-async-handler");
const Job = require("../Models/Job.js");
var mongoose = require("mongoose");
const { find } = require("../Models/Job.js");

const addJob = asyncHandler(async (req, res) => {
  let { user_id, position, company, location, description, requirements ,shift} =
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
    shift,
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
  let { position, company, location, description, requirements,shift } = req.body;

  let job = await Job.findById(id);
  if (job) {
    job.position = position;
    job.company = company;
    job.location = location;
    job.description = description;
    job.requirements = requirements;
    job.shift=shift;
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

const getJobDesc=asyncHandler(async(req,res)=>{
  let id =req.params.id
  let findjob=await Job.findById(id).populate("user_id", "pImage f_name position email")

  if(findjob){
    res.status(200).send(findjob)

  }else{res.status(400).send("job not found ")}
})


module.exports={
    getMyJobs,
    getJobs,
    addJob,
    updateJob,
    removeJob,
    getJobDesc
}
