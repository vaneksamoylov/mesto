import {
  openPopup,
  popupImage,
  imageCaptionOnPopupImage,
  imageOnPopupImage,
} from "./index.js";

export default class Card {
  constructor(cardsData, templateSelector, handleCardClick) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._card.querySelector(
      ".card__place"
    ).textContent = this._name;
    this._cardDeleteButton = this._card.querySelector(".card__delete-btn");
    this._cardLikeButton = this._card.querySelector(".card__islike-btn");

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link)
    });
    this._cardDeleteButton.addEventListener("click", () =>
      this._handleRemoveCard()
    );
    this._cardLikeButton.addEventListener("click", () => this._handleSetLike());
  }

  _handleRemoveCard() {
    this._card.remove();
  }

  _handleSetLike() {
    this._cardLikeButton.classList.toggle("card__islike-btn_state_active");
  }
}
