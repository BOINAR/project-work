const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
  streetName: String,
  town: String,
  zipCode: String,
})

const applicationSchema = mongoose.Schema({
  offerId: String,
  employerRead: {
    type: Boolean,
    default: false
  },
  employerStudying: {
    type: Boolean,
    default: false
  },
  employerResponse: {
    type: Boolean,
    default: false,
  },
})
const userSchema = mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  phone: String,
  password: String,
  bornWhen: String,
  bornAt: String,
  token: String,
  avatar: String,
  blackListOffers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'offers' }],
  likesOfferIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'offers' }],
  userAddress: addressSchema,
  jobs: [
    {
      job_title: String,
      skills: [
        {
          skill_title: String,
          experience: Number,
          level: Number,
        },
      ],
    },
  ],
  applications: [applicationSchema],
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel
