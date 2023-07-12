export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  getUserInfo() {
    return fetch(`https://around.nomoreparties.co/v1/cohort-3-en/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.initialCards()]);
  }

  initialCards() {
    return fetch(`https://around.nomoreparties.co/v1/cohort-3-en/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editProfile({ name, description }) {
    return fetch(`https://around.nomoreparties.co/v1/cohort-3-en/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    }).then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`https://around.nomoreparties.co/v1/cohort-3-en/cards`, {
      method: "post",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  cardLikes(cardId) {
    return fetch(`https://around.nomoreparties.co/v1/cohort-3-en/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteCard(cardID) {
    return fetch(`https://around.nomoreparties.co/v1/cohort-3-en/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addLike({ _id }) {
    return fetch(`https://around.nomoreparties.co/v1/cohort-3-en/cards/likes/${_id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  removeLike({ _id }) {
    return fetch(`https://around.nomoreparties.co/v1/cohort-3-en/cards/likes/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateProfilePicture(avatar) {
    return fetch(`https://around.nomoreparties.co/v1/cohort-3-en/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  }
}