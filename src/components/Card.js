export default class Card {

  constructor({ data, myId, handleCardLike, handleCardDelete, handleCardImage}, CardSelector)
   {
    this._data = data,
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = CardSelector;
    this._myId = myId;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete,
    this._handleCardImage = handleCardImage;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._myId);
  }

  setLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  renderLikes() {
    this._likesAmount = this._cardElement.querySelector('.card__like-amount');
    this._likesAmount.textContent = this._likes.length;
    if (this.isLiked()) {
      this._cardElement.
      querySelector('.card__like-button')
      .classList.add('.card__like-button_active');
    } else {
      this.cardElement
      .querySelector('.card__like-button')
      .classList.remove('card__like-button_active');
    }
  }
 
  _setEventListeners() {
    this._cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', () => {
      this.handleCardLike();
    })

    this._cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', () => {
      this._handleCardDelete();
    })

    this._cardElement
    .querySelector('.card__image')
    .addEventListener('click', () => {
      this._handleCardImage(this._data);
    })
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  hanldeDeleteButtonIcon() {
    if (this._ownerId !== this._myId) {
      this._cardElement.querySelector('.card__delete-button').remove();
    }
  }



  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners()
    this._cardElement.querySelector('.card__image').src = this._link;
    this._cardElement.querySelector('.card__image').alt= this._name;
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this.renderLikes();

    this.hanldeDeleteButtonIcon();

    return this._cardElement;
  }
}