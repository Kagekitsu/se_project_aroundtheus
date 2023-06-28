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
    this._handleDeleteCard = handleDeleteCard;
  }

  handleCardTrashBtn() {
    const cardTrashBtn = this._cardElement.querySelector('.card__delete-button');

    if (this._currentIdOwner !== this._userId) {
      cardTrashBtn.remove();
    }
  }

  updateLike(result) {
    this._cardLikes = result.likes;
    this.showCardLikes();
  }

  showCardLikes() {
    if (this._cardLikes.length > 0) {
      this._cardElement.querySelector('.card__like-counter').textContent = this._cardLikes.length;
    } else {
      this._cardElement.querySelector('.card__like-counter').textContent =  "";
    }

    if (this.cardIsLiked()) {
      this._cardElement.querySelector('cards.list').classList.add('card__like-button_active');
    } else {
      this._cardElement.querySelector('card.list').remove('card__like-button_active');
    }
  }

  cardIsLiked() {
    return this._cardLikes.some((likes) => {
      return likes._id === this._userId;
    });
  }

  _getTemplate() {
    this._cardTemplate = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
    return this._cardTemplate;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const cardTrashBtn = this._cardElement.querySelector(".card__delete-button");

    cardTrashBtn.addEventListener('click', () => {
      this._cardTrashBtnVerify();
      this._handleDeleteCard(this._cardId, this._cardElement);
    });

    this._cardElement.addEventListener('click', () => {
      this._handleCardClick(this._cardElement);
    });

    likeButton.addEventListener('click', () => {
      this._handleCardLike(this);
    })
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this.handleCardTrashBtn();
    this.showCardLikes();

    return this._cardElement;
  }
}


