class FormValidator {
    constructor(settings, formEl) {
      this._formSelector = settings.formSelector;
      this._inputSelector = settings.inputSelector;
      this._submitBtnSelector = settings.submitBtnSelector;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;
  
      this._form = formEl;
      this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
      this._submitBtn = this._form.querySelector(this._submitBtnSelector);
    }
  
    _showInputError(inputEl) {
      const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
      inputEl.classList.add(this._inputErrorClass);
      errorMessageEl.textContent = inputEl.validationMessage;
      errorMessageEl.classList.add(this._errorClass);
    }
  
    _hideInputError(inputEl) {
      const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
      inputEl.classList.remove(this._inputErrorClass);
      errorMessageEl.textContent = errorMessageEl;
      errorMessageEl.classList.remove(this._errorClass);
    }
  
    _toggleBtnState() {
      const isValid = this._inputEls.every((inputEl) => inputEl.validity.valid);
  
      if (isValid) {
        this._submitBtn.removeAttribute("disabled");
        this._submitBtn.classList.remove(this._inactiveButtonClass);
      } else {
        this._submitBtn.setAttribute("disabled", true);
        this._submitBtn.classList.add(this._inactiveButtonClass);
      }
    }
  
    _hasInvalidInput() {
      return this._inputEls.some((inputEl) => !inputEl.validity.valid);
    }
  
    _setEventListeners() {
      this._toggleBtnState();
  
      this._inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
          this._hideInputError(inputEl);
          this._toggleBtnState();
        });
      });
    }
  
    enableValidation() {
      this._form.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      this._setEventListeners(); 
    }
  }
  
export default FormValidator;
  