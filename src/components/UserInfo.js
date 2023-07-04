export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = nameSelector
    this._descriptionElement = descriptionSelector
    this._avatarElement = avatarSelector;
  }

  getUserInfo() {
    const userObject = {};
    userObject['nameSelector'] = this._nameElement.textContent;
    userObject['descriptionSelector'] = this._descriptionElement;
    return userObject;
  }

  setUserInfo(titleInfo, subtitleInfo) {
    this._nameElement.textContent = titleInfo;
    this._descriptionElement.textContent = subtitleInfo;
  }

  setProfileAvatar(avatar) {
    this._avatarElement.src = avatar;
    this._avatarElement.alt = this._nameElement.textContent
  }
}

