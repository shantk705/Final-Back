const express = require("express");
const router = express.Router();
const{Generate,Validate}=require("../Controllers/tokenControllers")

router.post("/generate",Generate)

module.exports = router;