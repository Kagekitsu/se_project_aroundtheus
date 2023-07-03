export default class UserInfo {
  constructor({ title, subtitle, avatarSelector }) {
    this._title = document.querySelector('.profile__title');
    this._subtitle = document.querySelector('.profile__description');
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      title: this._title.textContent,
      subtitle: this._subtitle.textContent,
    };
  }

  setUserInfo(title, subtitle) {
    this._title.textContent = title;
    this._subtitle.textContent = subtitle;
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}

