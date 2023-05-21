const express = require("express");
const router = express.Router();
var multer = require('multer');
const storage=multer.diskStorage({})
const fileFilter=(req,file,cb)=>{
  if(file.mimetype.startsWith("image")){
    cb(null,true)
  }else{
    cb("invalid image file", false)
  }
}
var uploads = multer({storage,fileFilter});
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateProf
} = require("../Controllers/userControllers");


router.get("/get", getUsers);
router.get("/user", getUser);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.patch("/profile/:id",uploads.fields([{name:"pImage",maxCount:1},{name:"bgImage",maxCount:1}]),updateProf)

module.exports = router;
