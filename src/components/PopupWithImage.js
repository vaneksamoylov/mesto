import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	_imageOnPopupImage = this._popup.querySelector(".popup__image");
	_imageCaptionOnPopupImage = this._popup.querySelector(
		".popup__image-caption"
	);

	open(cardName, cardLink) {
		this._imageOnPopupImage.src = cardLink;
		this._imageOnPopupImage.alt = cardName;
		this._imageCaptionOnPopupImage.textContent = cardName;

		super.open();
	}
}
