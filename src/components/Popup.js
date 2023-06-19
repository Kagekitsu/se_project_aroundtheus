import Card from './Card.js';

export default class Popup {
    constructor({ popupSelector }) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    open() {
        this.popup.classList.add('modal_opened');
        document.addEventListener('keydown', this._handleEscClose)
    }

    close() {
        this.popup.remove('modal_opened');
        document.removeEventListener('keydown', this._handleEscClose )
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this.closeButton.addEventListener('click', () => {
            this.close();
        });
    }
}