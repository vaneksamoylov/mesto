import { openPopup, popupImage, imageCaptionOnPopupImage } from './index.js';

export class Card {
  constructor(cardsData, templateSelector) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate () {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _createCard () {
    this._card = this._getTemplate();
    this._card.querySelector('.card__image').src = this._link;
    this._card.querySelector('.card__image').alt = this._card.querySelector('.card__place').textContent = this._name;
    this._cardImage = this._card.querySelector('.card__image');
    this._cardDeleteButton = this._card.querySelector('.card__delete-btn');
    this._cardLikeButton = this._card.querySelector('.card__islike-btn');

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleOpenPopupImage());
    this._cardDeleteButton.addEventListener('click', () => this._handleRemoveCard());
    this._cardLikeButton.addEventListener('click', () => this._handleSetLike());
  }

  _handleOpenPopupImage() {
    imageOnPopupImage.src = this._link;
    imageOnPopupImage.alt = imageCaptionOnPopupImage.textContent = this._name;

    openPopup(popupImage)
  }

  _handleRemoveCard() {
    this._card.remove();
  }

  _handleSetLike() {
    this._cardLikeButton.classList.toggle('card__islike-btn_state_active')
  }
}

