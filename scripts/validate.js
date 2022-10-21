const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${settings.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${settings.errorClass}`);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${settings.inputErrorClass}`);
  errorElement.classList.remove(`${settings.errorClass}`);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
};

function toggleButtonState (inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${settings.inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(`${settings.inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(`${settings.inputSelector}`));
  const buttonElement = formElement.querySelector(`${settings.submitButtonSelector}`)
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const popupFormList = Array.from(document.querySelectorAll(`${settings.formSelector}`));
  popupFormList.forEach((popupForm) => {
    setEventListeners(popupForm, settings);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__input-save-btn',
  inactiveButtonClass: 'popup__input-save-btn-inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input_type_error'
});
