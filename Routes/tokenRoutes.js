const express = require("express");
const router = express.Router();
const{Generate,Validate}=require("../Controllers/tokenControllers")

router.post("/generate",Generate)
router.patch("/reset/:payload",Validate)

module.exports = router;