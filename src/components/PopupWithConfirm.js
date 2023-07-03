import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector })
    this._popupForm = this._popupElement.querySelector('.modal__form');
  }

  renderLoading(isLoading, submitSave) {
    if (isLoading) {
      this._popupForm.querySelector('.modal__save-button').textContent = 'Deleting...';
    } else {
      this._popupForm.querySelector('.modal__save-button').textContent = submitSave;
    }
  }

  close() {
    this._popupForm.addEventListener('submit', this._handleSubmit);
    super.close();
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handleSubmit);
  }
}