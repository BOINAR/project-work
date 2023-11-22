export default function (jobOffers = [], action) {
  if (action.type === 'initialiseJobOffersInfo') {
    return action.jobOffers
  } else return jobOffers
}
