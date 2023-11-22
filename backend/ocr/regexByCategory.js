const regexByCategory = {
    // phone regex trouvé sur https://stackoverflow.com/questions/38483885/regex-for-french-telephone-numbers
    phone: /(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})/g,
    // email regex trouvé sur https://emailregex.com/
    // fonctione 99.99% du temps 
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi,
    jobTitle: /\bexp[é,e]?riences?\b/gi,
    skillTitle: /\bcomp[é,e]tences?\b|\binformatiques?\b/gi,
    bioTitle: /\bprofile?\b|\bobjectifs?\b/gi,
    educationTitle: /\bformations?\b|\blicences?\b|\bbaccalaur[é,e]at\b/gi,
    languageTitle: /\blangues?|languages?\b/gi,
    contactTitle: /\bcontacte?\b|\bpersonnel(les?)?\b/gi,
    keyWordsForExclusion: /\bmarketing\b|\bcoordonn[é,e]es?\b|\bint[é,e]r[ê,e]ts?\b|ing[é,e]nieurs?\b|\bmanager\b|profession[nelle]?s?|\br[é,e]f[é,e]rences?\b|\bparcours\b|\buniversit[é,aire]\b|\banalyste\b|\bsyst[e,è]mes?\b|\bcentres?\b|\bprojets?\b|\binformations?\b|\bpostes?\b/gi,

} 

module.exports = regexByCategory;