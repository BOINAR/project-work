const algos = require("./algos");
const regexByCategory = require("./regexByCategory");



const extraireInfos = async data => {

    const fullText = algos.fullText(data);

    const phone = algos.findFromText(fullText, regexByCategory.phone);

    const email = algos.findFromText(fullText, regexByCategory.email);

    const name = algos.findName(data);

    return ({
        phone: phone,
        email: email,
        name: name,
    })
};

module.exports = extraireInfos;