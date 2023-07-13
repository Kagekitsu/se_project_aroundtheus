import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._confirmButton = this._popupElement.querySelector("#modal-delete-btn");
    this._saveButton = this._popupElement.querySelector(".modal__button");
  }
  

  _getInputValues() {
    const inputs = Array.from(this._popupForm.querySelectorAll(".modal__input"));
    const inputValues = {};
    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit.bind(this));
  }
  
  _handleFormSubmit(event) {
    event.preventDefault();
    if (this._handleDeleteSubmit) {
      this._handleDeleteSubmit();
    }
  }  
  close() {
    super.close();
    this._popupForm.reset();
  }
}
