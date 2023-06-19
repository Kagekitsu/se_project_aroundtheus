import Popup from './Popup.js';

class POpupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector('#modal-add-form');
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        const inputs = this.input.querySelector('#add-name-input');
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
            this.submitCallback(this._getInputValues());
        });
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}

const userInfo = new UserInfo({
    nameSelector: '.user-info__name',
    jobSelector: '.user-info__job'
  });

const PopupWithForm = new PopupWithForm('#profile-add-modal', (formValues) => {
    userInfo.setUserInfo(formValues);
});
PopupWithForm.setEventListeners();
PopupWithForm.open();
PopupWithForm.close();

  