import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super({ popupSelector });
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popupElement.querySelector('.modal__form');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList = this._popupForm.querySelectorAll('.modal__input');
    this._inputList.forEach((input) => {
      if (input.value !== "") {
        inputObject[input.name] = input.value;
      }
    });
    return inputValues
  }

  _handleSubmit(e) {
    e.preventDefault();
    this._handleSubmit(this._getInputValues());
  }

  close() {
    super.close();
    this._popupForm.reset();
    this._popupForm.removeEventListener('submit', this._handleSubmit);
  }

  renderLoading(isLoading, submitSave) {
    if (isLoading) {
      this._popupElement.querySelector('.modal__save-buton').textContent = 'Saving...';
    } else {
      this._popupElement.querySelector('.modal__save-buton').textContent = submitSave;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', this._handleSubmit);
  }
}