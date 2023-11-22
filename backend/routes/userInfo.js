var express = require("express");
var router = express.Router();
const userModel = require("../models/users");

router.post("/update", async function(req, res) {
    const user = await userModel.findOneAndUpdate(
        { token: req.body.token },
        {
            userAddress: {  
                streetName: req.body.adresse,
                town: req.body.ville,
                zipCode: req.body.codePostal
            },
            bornWhen: req.body.dateN,
            bornAt: req.body.lieuN
        }
    );
    res.json({ result: true });
});

router.post("/proceedApplication", async function(req, res) {
    const user = await userModel.findOne({ token: req.body.token });
    if (user.applications[0].employerStudying) {
        user.applications[0].employerResponse = true;
    } else if (user.applications[0].employerRead) {
        user.applications[0].employerStudying = true;
    } else user.applications[0].employerRead = true;
    const userSaved = await user.save();

    res.json({ application: userSaved.applications[0] });
})

module.exports = router;