import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = popupSelector;
    this._imageOnPopupImage = this._popup.querySelector('.popup__image');
    this._imageCaptionOnPopupImage = this._popup.querySelector('.popup__image-caption');
  }

  open(cardData) {
    this._imageOnPopupImage.src = cardData.link;
    this._imageOnPopupImage.alt = this._imageCaptionOnPopupImage.textContent = cardData.name;
    console.log(this._imageOnPopupImage);
    console.log(this._popup)
    
    super.open();
  }
}