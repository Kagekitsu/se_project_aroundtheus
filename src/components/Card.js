export default class Card {
  constructor(
    data,
    cardSelector, 
    handleCardClick,
    userId,
    handleCardLike,
    cardTrashBtnVerify,
    handleDeleteCard
    ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._cardId = data._id;
    this._currentIdOwner = data.owner;
    this._cardTrashBtnVerify = cardTrashBtnVerify;
    this._handleCardLike = handleCardLike;
    this._cardIsLiked = this._cardIsLiked.bind(this);
    this._cardLikes = data.likes;
    this._hanldleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    this._cardTemplate = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
    return this._cardTemplate;
  }

  _toggleLikeButton() {
    this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active')
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._toggleLikeButton();
    });

    const deleteButton = this._cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link }); 
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
  }
}


