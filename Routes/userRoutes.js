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
  updateimages,
  updateProf,
  getProfile,
  getP
} = require("../Controllers/userControllers");


router.get("/getall", getUsers);
router.get("/p/:id",getP)

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.patch("/profile/:id",updateProf)
router.get("/getme/:id", getProfile)
router.patch("/img/:id",uploads.fields([{name:"pImage",maxCount:1},{name:"bgImage",maxCount:1}]),updateimages)
// ,uploads.fields([{name:"pImage",maxCount:1},{name:"bgImage",maxCount:1}]),

module.exports = router;
