class Card {
    constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
  
      this._cardSelector = cardSelector;
    }
  
    _setEventListeners() {
      this._element.querySelector('.card__delete-button').addEventListener('click', () => {
        this._element.remove();
      });
  
      this._element.querySelector('.card__like-button').addEventListener('click', () => {
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
      });
  
      this._element.querySelector('.card__image').addEventListener('click', () => {
        openPopup(previewImageModal);
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCaption.textContent = this._name;
      });
    }
  
    _getTemplate() {
      return document
        .querySelector(this._cardSelector)
        .content.querySelector('.card')
        .cloneNode(true);
    }
  
    getView() {
      this._element = this._getTemplate();
      this._setEventListeners();
  
      return this._element;
    }
  }
  
  export default Card;
  