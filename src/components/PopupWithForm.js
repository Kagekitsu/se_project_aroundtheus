import Popup from '../components/Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.modal__form');
    this._submitForm = this._submitForm.bind(this);
  }

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll('.modal__input');
    const values = {};
    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._submitForm);
  }

  close() {
    this._popupForm.reset();
    super.close();
    this._popupForm.removeEventListener('submit', this._submitForm);
  }

  _submitForm(e) {
    e.preventDefault();
    const inputValues = this._getInputValues();
  }
}
