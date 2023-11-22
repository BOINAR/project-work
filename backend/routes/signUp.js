var express = require('express')
var router = express.Router()
var bcrypt = require('bcrypt')
var userModel = require('../models/users')

var bcrypt = require('bcrypt')
var uid2 = require('uid2')

const PDFParser = require('pdf2json')
const extraireInfos = require('../ocr/extraireInfos')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/signIn', async function (req, res, next) {
  var error = []
  var result = false
  var user = null
  var token = null
  if (req.body.emailFromFront == '' || req.body.passwordFromFront == '') {
    error.push('champs vides')
  }

  if (error.length == 0) {
    user = await userModel.findOne({
      email: req.body.emailFromFront,
    })
    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true
        token = user.token
      } else {
        result = false
        error.push('mot de passe incorrect')
      }
    } else {
      error.push('email incorrect')
    }
  }
  res.json({ result, user, error, token })
})

router.post('/inscription', async function (req, res, next) {
  console.log(req.body)
  var error = []
  var result = false
  var saveUser = null
  var token = null

  const data = await userModel.findOne({
    email: req.body.emailFromFront,
  })

  if (data != null) {
    error.push('Utilisateur déjà inscrit')
  }

  if (
    req.body.nomFromFront == '' ||
    req.body.prenomFromFront == '' ||
    req.body.emailFromFront == '' ||
    req.body.telFromFront == '' ||
    req.body.passwordFromFront == '' ||
    req.body.confPasswordFromFront == ''
  ) {
    error.push('champs vides')
  }

  if (req.body.passwordFromFront !== req.body.confPasswordFromFront) {
    error.push("votre mot de passe n'est pas identique")
  }

  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10)
    var newUser = new userModel({
      nom: req.body.nomFromFront,
      prenom: req.body.prenomFromFront,
      email: req.body.emailFromFront,
      phone: req.body.telFromFront,
      avatar: "https://res.cloudinary.com/matthieudev/image/upload/v1653480800/generic_avatar_mnfcbx.png",
      password: hash,
      token: uid2(32),
      userAddress: {
        streetName: '',
        town: '',
        zipCode: '',
      },
    })

    saveUser = await newUser.save()

    if (saveUser) {
      result = true
      token = saveUser.token
    }
  }

  res.json({ result, saveUser, error, token })
})

router.post('/sendCV', async function (req, res) {
  const pdfParser = new PDFParser()
  const callbackFunc = (callback) => {
    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      callback(pdfData)
    })
  }

  callbackFunc(async (result) => {
    const infoExtracted = await extraireInfos(result)
    res.json(infoExtracted)
  })

  pdfParser.parseBuffer(req.files.file.data)
})

router.get('/existingToken', async function (req, res) {
  console.log('req.query.token', req.query.token)
  console.log("hello");
  const user = await userModel.findOne({ token: req.query.token })
  console.log('user', user)
  res.json({ user })
})

module.exports = router
