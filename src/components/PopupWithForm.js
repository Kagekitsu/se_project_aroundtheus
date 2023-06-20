import Popup from '../components/Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.modal__form');
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
    this._popupForm.addEventListener('submit', () => {
      const inputValues = this._getInputValues();
      console.log(inputValues)
      this._handleFormSubmit(inputValues);
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
