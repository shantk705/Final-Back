const asyncHandler = require("express-async-handler");
const Edu = require("../Models/Education.js");
var mongoose = require("mongoose");

const addEdu = asyncHandler(async (req, res) => {
  const { user_id, degree, school, startDate, endDate } = req.body;

  if (!user_id || !degree || !school || !startDate || !endDate) {
    res.status(400).send("please fill all the required fields");
  }
  let education = await Edu.create({
    user_id,
    degree,
    school,
    startDate,
    endDate,
  });
  res.status(201).send(education);
});

const editEdu = asyncHandler(async (req, res) => {
  let _id = req.params.id;
  const { degree, school, startDate, endDate } = req.body;
  let edu = await Edu.findOne({ _id });
  if (edu) {
    (edu.degree = degree),
      (edu.school = school),
      (edu.startDate = startDate),
      (edu.endDate = endDate);
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


const removeEdu=asyncHandler(async(req,res)=>{
    let id=req.params.id
    let deleted=await  Edu.findByIdAndDelete(id)
    if(deleted){
        res.status(201).send("deleted successfully")
    }else{
        res.status(400).send("education not found ")
    }
})

const getEdu=asyncHandler(async(req,res)=>{
    let id=req.params.id

    let educations= await Edu.find({user_id:id})
    if(educations){
        res.status(201).send(educations)
    }else{
        res.status(201).send("no educations found")
    }
})

module.exports={removeEdu,addEdu,editEdu,getEdu}