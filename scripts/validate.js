function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }

  hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => !inputEl.validity.valid);
}

const disableBtn = (submitBtn, inactiveButtonClass) => {
  submitBtn.classList.add(inactiveButtonClass);
  submitBtn.disabled = true;
};

const enableBtn = (submitBtn, inactiveButtonClass) => {
  submitBtn.classList.remove(inactiveButtonClass);
  submitBtn.disabled = false;
};

function toggleBtnState(inputEls, submitBtn, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    disableBtn(submitBtn, inactiveButtonClass);
  } else {
    enableBtn(submitBtn, inactiveButtonClass);
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  const submitBtn = formEl.querySelector(submitButtonSelector);
  toggleBtnState(inputEls, submitBtn, options);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options);
      toggleBtnState(inputEls, submitBtn, options);
    });
  });
}

function enableValidation(options) {
  const formEls = Array.from(document.querySelectorAll(options.formSelector));
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  });

  document.addEventListener("click", (e) => {
    const modalEl = document.querySelector(options.formSelector);
    if (modalEl && !modalEl.contains(e.target)) {
      const closeBtn = formEl.querySelector(".modal__close");
      closeBtn.click();
    }
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

enableValidation(config);
