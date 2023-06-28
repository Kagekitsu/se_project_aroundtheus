import Popup from '../components/Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.modal__form');
    this._modalInputs = this._popupElement.querySelectorAll('.modal_input');
    this._submitBtn = this._popupElement.querySelector('.modal__button');
    this._submitBtnTxt = this._submitBtn.textContent;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnTxt
    }
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
    this._popupForm.addEventListener('submit', () => {
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
