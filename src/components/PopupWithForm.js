import Popup from '../components/Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('modal__form');
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

  _submitForm = () => {
    const inputValues = this._getInputValues();
    this._handleFormHSubmit(inputValues)
  }

  close() {
    this._popupForm.reset();
    super.close();
    this._popupElement.removeEventListener('submit', this._handleFormSubmit );
  }
}

