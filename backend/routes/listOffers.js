var express = require('express')
var router = express.Router()
var mongoose = require('mongoose');
const offerModel = require('../models/offers')
const userModel = require('../models/users')

/* GET users listing. */
router.get('/listOffers', async function (req, res, next) {
  console.log('req.query', req.query)
  const user = await userModel.findOne({
    token: req.query.token,
  })

  // Filter of offers where the start date is after today's date
  // Filter for the offers where the town of the company posting the offer is the same as the town stored by the user in his/her personal space
  let filterByJobs = []
  if (user.userAddress) {
    const offers = await offerModel.find({
      'company.address.town': user.userAddress.town,
    })
    filterByJobs = [...offers]
    filterByJobs = filterByJobs.filter((offer) => {
      for (let job of offer.jobs) {
        // exclude job offers that require a "metier" the user doesn't have
        if (!user.jobs.map((job) => job.job_title).includes(job.job_title)) {
          return false
        }

        for (let skill of job.skills) {
          // exclude job offers that requires a "metier" with skills beyond the range of the user
          let userSkill = user.jobs
            .find((j) => j.job_title === job.job_title)
            .skills.find((s) => s.skill_title === skill.skill_title)
          if (userSkill) {
            if (
              userSkill.experience < skill.experience ||
              userSkill.level < skill.level
            ) {
              return false
            }
          } else return false
        }
      }
      return true
    })
    console.log('filterByjobs', filterByJobs)
  }

  res.json({ offers: filterByJobs, user })
})

router.get('/displayOffer', async function (req, res, next) {
  var offer = await offerModel.findById(req.query.offerId)
  console.log(offer)
  res.json({ offer })
})

router.get('/removeLikeOffer', async function (req, res, next) {
  const userSaved = await userModel.updateOne(
    { token: req.query.token },
    {
      $pull: { likesOfferIds: mongoose.Types.ObjectId(req.query.offerId) },
    }
  )
  res.json({ userSaved })
})

router.get('/likeOffer', async function (req, res, next) {
  console.log('req.query', req.query)
  var user = await userModel.updateOne(
    { token: req.query.token },
    { $push: { likesOfferIds: req.query.offerId } }
  )

  res.json({ user })
})

router.get('/displayLikeOffer', async function (req, res, next) {
  var user = await userModel.findOne({ token: req.query.token })

  var tab = []
  for (var i = 0; i < user.likesOfferIds.length; i++) {
    var offer = await offerModel.findById(user.likesOfferIds[i])
    tab.push(offer)
  }

  res.json({ offers: tab })
})

router.get('/blockOffer', async function (req, res, next) {
  var user = await userModel.updateOne(
    { token: req.query.token },
    { $push: { blackListOffers: req.query.offerId } }
  )

  user = await userModel.updateOne(
    { token: req.query.token },
    { $pull: { likesOfferIds: req.query.offerId } }
  )

  res.json({ user })
})

router.post('/apply', async function (req, res) {
  console.log(req.body)
  var user = await userModel.findOne({token: req.body.token});
  user.applications.push({
    offerId: req.body.offerId
  });
  const userSaved = await user.save(); 
  res.json({ applications: userSaved.applications })
});

router.get('/nextStage', async function(req, res) {
  var user = await userModel.findOne({
    token: req.body.token
  });

});

module.exports = router
