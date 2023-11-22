const mongoose = require("mongoose");

const jobsSchema = mongoose.Schema({
  job_title: String,
  skills: [String],
});

const jobsModel = mongoose.model("jobs", jobsSchema);

module.exports = jobsModel;
