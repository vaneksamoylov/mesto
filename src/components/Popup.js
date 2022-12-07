export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleCloseByEsc = this._handleCloseByEsc.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleCloseByEsc);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleCloseByEsc);
  }

  _handleCloseByEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleCloseByClickToOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup__close-btn")) {
        this.close();
      }
    });
    this._popup.addEventListener("mousedown", (evt) =>
      this._handleCloseByClickToOverlay(evt)
    );
  }
}
