const bcrypt = require("bcryptjs");
const Token=require("../Models/Token")
const User = require("../Models/User")
const crypto = require("crypto")
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "storedayaa@gmail.com", pass: "tdfxykfcvjpfbnyr" },
  });




// const hash = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(password, hash);

const Generate=asyncHandler(async(req,res)=>{
    let email= req.body.email.value
   
    let user= await User.findOne({email:email})
    let exists= await Token.findOne({email:email})
    const random=crypto.randomBytes(32).toString('hex');
    
    if(exists){
        res.status(420).send("You already have an active token")
    }else{
        if (user){
            let token=await Token.create({
                email:user.email,
                token:random
            })
            if(token){
                res.status(201).send(token)
            }
    
        }else{
            res.status(420).send("User does not exist !")
        
            
        }
    }
   

})

const Validate=asyncHandler(async(req,res)=>{
    
})


module.exports={Generate,Validate}