export default class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
  }

  _showInputError(inputElement, errorMessage) {
    const { inputErrorClass, errorClass } = this._settings;
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._settings;
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    this._buttonElement = this._form.querySelector(
      this._settings.submitButtonSelector
    );

    if (this._form.checkValidity()) {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    } else {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    }
  }

  _setEventListeners() {
    this._inputList = this._form.querySelectorAll(this._settings.inputSelector);
    this._buttonElement = this._form.querySelector(
      this._settings.submitButtonSelector
    );

    this._inputList.forEach((popupForm) => {
      popupForm.addEventListener("input", () => {
        this._checkInputValidity(popupForm);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
