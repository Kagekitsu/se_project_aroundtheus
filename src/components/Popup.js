export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('modal_opened');
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove('modal_open');
    this._popupElement.removeEventListener('click', this._closeClick)
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _closeClick = (e) => {
    if (e.target.classList.contains('modal_opened') || e.target.classList.contains('modal__close-button')) {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.addEventListener('click', this._closeClick );
  }
}
