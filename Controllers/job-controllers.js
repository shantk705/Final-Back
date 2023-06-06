const asyncHandler = require("express-async-handler");
const Job = require("../Models/Job.js");
const App= require("../Models/Application.js");
const User= require("../Models/User")
var mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { find } = require("../Models/Job.js");


let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "developerops.main@gmail.com", pass:"nwhzxlphumutdnnt" },
});

const addJob = asyncHandler(async (req, res) => {
  let { user_id, position, company, location, description, requirements ,shift} =
    req.body;
    console.log(req.body)
  if (
    !user_id||
    !position ||
    !company ||
    !description ||
    !requirements ||
    !location
  ) {
    res.status(400).send("please fill all required info");
  }
  let response = await Job.create({
    user_id:user_id,
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



const jobApply=asyncHandler(async(req,res)=>{
  console.log("we are in apply")
  let user_id=req.body.user_id
  let job_id=req.body.job_id
  let existing=await App.findOne({user_id:user_id,job_id:job_id})
console.log(existing)
  if(existing){
    res.status(400).send("you already applied for this job ")

    
  }else{
    console.log("we are in else")
    let created= await App.create({user_id:user_id,job_id:job_id})
   
    if (created){
      let thejob=await Job.findById(job_id)
     console.log(thejob)
      if(thejob){
        let hr=await User.findOne({_id:thejob.user_id})
        console.log(hr)
        if(hr){
          let dev=await User.findById(user_id)
          if(dev){
            let details = {
              from: "developerops.main@gmail.com",
              to: hr.email,
              subject: "New Applicant from DevOps",
              text: "job application",
              html:`<div>Greetings <div>
              <div>the user ${dev.name} has aplied to the position of ${thejob.position}</div>
              <div>use this email ${dev.email} to contact the developer or</div>
              <p>Click <a href="http://localhost:3000/user/${user_id}">here</a> to see their profile in DevOps</p>
              `
            
          }
          mailTransporter.sendMail(details, (err) => {
            if (err) {
              console.log("there was an error", err);
            } else {
              console.log("mail sent successfully!");
            }
          });
        res.status(201).send("your application went through ,best of luck!")





          }
        }
      }

    }
  }
})


module.exports={
    getMyJobs,
    getJobs,
    addJob,
    updateJob,
    removeJob,
    getJobDesc,
    jobApply
}
