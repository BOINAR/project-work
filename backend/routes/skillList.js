var express = require("express");
var router = express.Router();
const jobsModel = require("../models/jobs");
const userModel = require("../models/users");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  var skills = await jobsModel.find();
  res.json({ skills });
});

router.post("/newSkill", async function(req, res) {
  console.log(req.body)
  const user = await userModel.findOne({ token: req.body.userToken });

  if (!user) {
    res.json({ result: false, error: "Utilisateur pas trouvé." })
  } else {
    user.jobs.push({
      job_title: req.body.jobTitleFromFront,
      skills: req.body.skillsFromFront.split(",").map(skill => {
        return {
          skill_title: skill,
          experience: 0,
          level: 0,
        }
      })
    })
    var userSaved = await user.save();

    res.json({ result: userSaved });
  }
})

router.post("/updateSkills", async function(req, res) {
  const user = await userModel.findOne({ token: req.body.userToken });
  if (!user) {
    res.json({ result: false, error: "Utilisateur pas trouvé." })
  } else {
    let skillObjFromFront = JSON.parse(req.body.jobSkills);
    let jobs = user.jobs;
    let jobFound = jobs.find(job => job.job_title === skillObjFromFront.job_title);
    jobFound = {
      job_title: skillObjFromFront.job_title,
      skills: skillObjFromFront.skills.map(skillObj => {
        return {
          skill_title: skillObj.skill_title,
          experience: skillObj.experience,
          level: skillObj.level
        }
      })
    };
    jobs = jobs.map(j => {
      if (j.job_title === skillObjFromFront.job_title) {
        return jobFound;
      } else return j;
    });
    user.jobs = jobs;

    var userSaved = await user.save();

    res.redirect(`/offers/listOffers?token=${req.body.userToken}`);
  }
});




module.exports = router;
