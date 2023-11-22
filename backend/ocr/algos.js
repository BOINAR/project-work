const regexByCategory = require("./regexByCategory");

const fullText = jsonObj => {
    let fullText = "";
    for (let page of jsonObj.Pages) {
        for (let textObj of page.Texts) {
            let text = decodeURIComponent(textObj.R[0].T);
            if (text[0].match(/[a-z]/i) && text[0].toUpperCase() === text[0]) {
                fullText += " "
            } 
            fullText += text;
            if (text[text.length-1].match(/[0-9"]/) || text.match(/France$/)) {
                fullText += " ";
            }
        }
    }
    return fullText;
}

const findFromText = (text, regex) => {
    let match = text.match(regex);
    if (match) return match[0];
    return false;
}

const biggestWords = objJSON => {
    let textObjects = [];
    for (let page of objJSON.Pages) {
        for (let textObj of page.Texts) {
            textObjects.push(textObj.R[0])
        }
    }
    const biggest_words = textObjects.sort((a,b) => b.TS[1] - a.TS[1]).map(obj => decodeURIComponent(obj.T));
    // to change
    return [biggest_words.join("").split(" ").join("").slice(0,1)+biggest_words.join("").split(" ").join("").slice(1,5).toLowerCase(), biggest_words.join("").split(" ").join("").slice(5,6) + biggest_words.join("").split(" ").join("").slice(6,16).toLowerCase()]
}

const findName = data => {
    // L'une des présomptions faites ici est que le nom du contact sera parmi le plus grand en taille.
    const bws = biggestWords(data);
    const dudeName = bws.filter(line => {
        for (let key of Object.keys(regexByCategory)) {
          	let match = line.match(regexByCategory[key]);
          	if (match) return false;
    	}	
      	return true;
    });
    return dudeName.join(" ");
}

module.exports = { 
    fullText, 
    findFromText,
    biggestWords,
    findName,
}


