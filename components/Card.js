export default class Card {
  constructor(data, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButtonClick.bind(this));
    this._deleteButton.addEventListener("click", this._handleDeleteButtonClick.bind(this));
    this._cardImage.addEventListener("click", this._handleCardImageClick.bind(this));
  }

  _getTemplate() {
    const cardTemplate = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
    return cardTemplate;
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }

  _handleCardImageClick() {
    this._handleCardClick(this._link, this._name);
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}

