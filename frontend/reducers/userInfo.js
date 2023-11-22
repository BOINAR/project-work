export default function (userInfo = {}, action) {
  if (action.type === 'initialiseUserInfo') {
    return action.userInfo
  } else if (action.type === 'updateUserInfo') {
    let userInfoCopy = { ...userInfo }
    for (let key of Object.keys(action.updatedInfo)) {
      userInfoCopy[key] = action.updatedInfo[key]
    }
    console.log('userinfocopy', userInfoCopy)
    return userInfoCopy
  } else if (action.type === 'deleteUserInfo') {
    return {}
  } else {
    return userInfo
  }
}
