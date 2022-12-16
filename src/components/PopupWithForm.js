import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);

    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input-text");

    this._handleSubmitForm = handleSubmitForm;
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  changeHandleSubmitForm(newSubmitHandler) {
    this._handleSubmitForm = newSubmitHandler;
  }

  renderLoading (isLoading) {
    if (isLoading) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = 'Сохранить';
    }
}

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });

    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (e) => {
      e.preventDefault();

      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }
}
