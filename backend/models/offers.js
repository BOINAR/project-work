var mongoose = require('mongoose')

var companySchema = mongoose.Schema({
  _id: String,
  address: {
    streetName: String,
    town: String,
    zipCode: String,
  },
  contact_job: String,
  direction: String,
  name: String,
  siret: Number,
  mail: String,
  tel: String,
  company_presentation: String,
  logo: String,
})

var offerSchema = mongoose.Schema({
  creation_date: Date,
  description: String,
  start_date: Date,
  end_date: Date,
  contract: String,
  salary: Number,
  title: String,
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

  company: companySchema,
})

var offerModel = mongoose.model('offers.js', offerSchema)

module.exports = offerModel
