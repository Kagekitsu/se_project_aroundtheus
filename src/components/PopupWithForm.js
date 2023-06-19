import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._formSubmitHandler = handleFormSubmit;
    this._popupForm = this.popup.querySelector('#modal-add-form');
  }

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll('#add-name-input');
    const values = {};
    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

//popupWithForm.setEventListeners();
