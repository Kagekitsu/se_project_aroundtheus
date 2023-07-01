import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, loadingButtonText) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector('.modal__form');
    this._inputList = this._popupElement.querySelectorAll('.modal__input')
    this._handleSubmit = handleSubmit;
    this._formElement = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._formElement.querySelector(".modal__button");
    this._submitButtonText = this._submitButtonText.textContent;
    this._loadingText = loadingText;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _handleSubmit(e) {
    e.preventDefault();
    this._handleSubmit(this._getInputValues());
  }

  open() {
    this._popupForm.addEventListener('submit', this._handleSubmit);
    super.open();
  }

  close() {
    this._popupForm.removeEventListener('submit', this._handleSubmit);
    this._formElement.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = this._loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}