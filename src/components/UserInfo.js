export default class UserInfo {
    constructor({ title, subtitle, avatarSelector }) {
      this._title = document.querySelector(title);
      this._subtitle = document.querySelector(subtitle);
      this._avatarElement = document.querySelector(avatarSelector);
    }
  
    getUserInfo() {
      return {
        title: this.title.textContent,
        subtitle: this.subtitlet.textContent,
      };
    }
    setUserInfo(title, subtitle) {
      this.title.textContent = title;
      this.subtitle.textContent = subtitle;
    }
    setAvatar(avatar) {
      this._avatarElement.src = avatar;
    }
  }
  