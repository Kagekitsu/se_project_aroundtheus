export default class Popup {
    constructor(popupSelector) {
      this.popup = document.querySelector(popupSelector);
      this.closeButton = this.popup.querySelector('.close-button');
      this.overlay = this.popup.querySelector('.overlay');
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this.popup.classList.add('open');
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
      this.popup.classList.remove('open');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  
    _handleEscClose(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  
    setEventListeners() {
      this.closeButton.addEventListener('click', () => {
        this.close();
      });
  
      this.overlay.addEventListener('click', () => {
        this.close();
      });
    }
  }
  