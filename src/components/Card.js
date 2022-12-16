export default class Card {
  constructor({ cardsData, userId, templateSelector, handleCardClick, handleDeleteCard, handleLikeClick }) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._likes = cardsData.likes;
    this._id = cardsData._id;
    this._userId = userId;
    this._ownerId = cardsData.owner._id;
    // this._ownerId = cardsData.ownerId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
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
    this._cardImage.alt = this._name;
    this._card.querySelector(".card__place").textContent = this._name;
    this._cardDeleteButton = this._card.querySelector(".card__delete-btn");
    this._cardLikeButton = this._card.querySelector(".card__islike-btn");

    this.setLikes(this._likes)

    if(this._ownerId !== this._userId) {
      this._cardDeleteButton.style.display = "none";
    }



    this._setEventListeners();

    return this._card;
  }

  setLikes(newArrayOfLikes) {
    this._likes = newArrayOfLikes;

    const likeCounterElement = this._card.querySelector('.card__like-counter');
    likeCounterElement.textContent = this._likes.length; 

    const isUserLikeCard = this._likes.find(user => user._id === this._userId)
    if(isUserLikeCard) {
      this._handleSetLike()
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    this._cardDeleteButton.addEventListener("click", () =>
      this._handleDeleteCard(this._id)
    );
    this._cardLikeButton.addEventListener("click", () => this._handleLikeClick(this._id));
  }

  handleRemoveCard() {
    this._card.remove();
    this._card = null;
  }

  _handleSetLike() {
    this._cardLikeButton.classList.toggle("card__islike-btn_state_active");
  }
}
