export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
      this._nameElement = document.querySelector(nameSelector);
      this._aboutElement = document.querySelector(aboutSelector);
      this._avatarElement = document.querySelector(avatarSelector);
    }
  
    getUserInfo() {
      return {
        name: this.nameElement.textContent,
        job: this.aboutElement.textContent,
      };
    }
    setUserInfo(name, about) {
      this.name.textContent = name;
      this.about.textContent = about;
    }
    setAvatar(avatar) {
      this._avatarElement.src = avatar;
    }
  }
  