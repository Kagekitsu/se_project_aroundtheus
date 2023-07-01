import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, loadingText }) {
    super({ popupSelector });
    this._loadingText = loadingText;
    this._popupForm = this._popupForm.querySelector('.modal__form');
    this._confirmDeleteButton = this._popupElement.querySelector(".modal__delete-button");
    this._submitButton = this._popupElement.querySelector('.modal__button');
    this._submitButtonText = this._submitButtonText;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._confirmDeleteButton.textContent = this._loadingText;
    } else {
      this._confirmDeleteButton.textContent = this._submitButtonText;
    }
  }

  open() {
    this._popupForm.addEventListener('submit', this._handleSubmit);
    super.open();
  }

  close() {
    this._popupForm.addEventListener('submit', this._handleSubmit);
    super.close();
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }
}