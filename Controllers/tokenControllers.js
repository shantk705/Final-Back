const bcrypt = require("bcryptjs");
const Token=require("../Models/Token")
const User = require("../Models/User")
const crypto = require("crypto")
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "developerops.main@gmail.com", pass:"nwhzxlphumutdnnt" },
  });




// const hash = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(password, hash);

const Generate=asyncHandler(async(req,res)=>{
    let email= req.body.email
    

   
    let user= await User.findOne({email:email})
    let exists= await Token.findOne({email:email})
    const random=crypto.randomBytes(32).toString('hex');
    
    if(exists){
        res.status(420).send("You already have an active token")
    }else{
        if (user){
           
            let Tokens=await Token.create({
                email:user.email,
                token:random
            })
            if(Tokens){

                let details = {
                    from: "developerops.main@gmail.com",
                    to: user.email,
                    subject: "Password Reset link-DevOps",
                    text: "Password reset",
                    html:`<div>please click this link to redirect and reset your password <div>
                    <p>Click <a href="https://devops-front.onrender.com/token/${Tokens.token}">here</a> to reset your password</p>
                    `
                }
                mailTransporter.sendMail(details, (err) => {
                    if (err) {
                      console.log("there was an error", err);
                    } else {
                      console.log("mail sent successfully!");
                    }
                  });
                res.status(201).send("Reset link was sent successfully please check your email")
            }
    
        }else{
            res.status(404).send("User does not exist !")
        
            
        }
    }
   

})

const Validate=asyncHandler(async(req,res)=>{
    console.log("we are in valid")
    let token=req.params.payload
    console.log(token)
    let password=req.body.password
    let exists= await Token.findOne({token:token})
    if(exists){
        let user=await User.findOne({email:exists.email})
        if(user){
            const hash = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, hash);
            user.password=hashedPassword

            let result= await user.save()
            if(result){
                res.status(201).send("password reset successfull")
            }else{res.status(404).send("something went wrong with the password")}
        }else{
            res.status(404).send("user was not found ")
        }
    }else{
        res.status(404).send("you dont have an active token")
    }
    
})


module.exports={Generate,Validate}