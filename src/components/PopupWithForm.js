import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector('.modal__form');
    this._handleFormSubmit = handleFormSubmit;
    this._modalSaveButton = this._popupElement.querySelector(".modal__button");
    this._saveButtonText = this._modalSaveButton.textContent;
  }

  _getInputValue() {
    const inputs = this._popupForm.querySelectorAll(".modal__input");
    const inputValues = {};
    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;

  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () =>
      this._handleFormSubmit(this._getInputValue())
    );
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._modalSaveButton.textContent = "Saving...";
    } else {
      this._modalSaveButton.textContent = this._saveButtonText;
    }
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}