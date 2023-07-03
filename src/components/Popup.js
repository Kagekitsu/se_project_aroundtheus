export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeClick = this._closeClick.bind(this);
  }

  open() {
    this._popupElement.classList.add('modal_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.addEventListener('mousedown', this._closeClick);
  }

  close() {
    this._popupElement.classList.remove('modal_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.removeEventListener('mousedown', this._closeClick);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _closeClick(e) {
    if (e.target.classList.contains('modal_opened') || e.target.classList.contains('modal__close')) {
      this.close();
    }
  }

  setEventListeners() {
    document.querySelector('keydown', this._handleEscClose);
    this._popupElement.addEventListener('click', this._closeClick);
  }
}
