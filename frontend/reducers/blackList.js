export default function (blackList = [], action) {
  if (action.type === "updateBlackList") {
    var blackListCopy = [...blackList];
    if (blackList.find((el) => el === action.id)) {
      blackListCopy = blackList.filter((el) => el == action.id);
    } else {
      blackListCopy.push(action.id);
    }
    return blackListCopy;
  }
  return blackList;
}
