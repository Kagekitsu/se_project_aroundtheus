import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._confirmButton = document.querySelector("#modal-delete-btn");
    this._saveButton = document.querySelector(".modal__button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDeleteSubmit();
    });
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._confirmButton.textContent = "Saving...";
    } else {
      this._confirmButton.textContent = "yes";
    }
  }

  setSubmitAction(action) {
    this._handleDeleteSubmit = action;
  }
}