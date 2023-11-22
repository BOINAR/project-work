export default function (applications = [], action) {
    if (action.type === "initialiseApplicationInfo") {
      return action.applicationInfo;
    } else if (action.type === "updateApplication") {
      // console.log("in redux", action.application);
      return [action.application];
    } else return applications;
}
  