const express = require("express");


const router = express.Router();

const {
  getMyJobs,
  getJobs,
  addJob,
  updateJob,
  removeJob,
  getJobDesc
} = require("../Controllers/job-controllers");

router.get("/myjobs/:id", getMyJobs);
router.get("/all", getJobs);
router.post("/add", addJob);
router.patch("/update/:id", updateJob);
router.get("/details/:id",getJobDesc)

router.delete("/remove/:id", removeJob);

module.exports = router;
