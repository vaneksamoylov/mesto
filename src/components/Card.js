export default class Card {
  constructor({ cardsData, userId, templateSelector, handleCardClick, handleDeleteCard }) {
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

    this._setLikes()

    // console.log('_id:', this._id)
    // console.log('ownerId:', this._ownerId)
    // console.log('userId:', this._userId)
    // console.log(cardsData)

    if(this._ownerId !== this._userId) {
      this._cardDeleteButton.style.display = "none";
    }

    this._setEventListeners();

    return this._card;
  }

  _setLikes() {
    const likeCounterElement = this._card.querySelector('.card__like-counter');
    likeCounterElement.textContent = this._likes.length; 
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    this._cardDeleteButton.addEventListener("click", () =>
      this._handleDeleteCard(this._id)
    );
    this._cardLikeButton.addEventListener("click", () => this._handleSetLike());
  }

  handleRemoveCard() {
    this._card.remove();
    this._card = null;
  }

  _handleSetLike() {
    this._cardLikeButton.classList.toggle("card__islike-btn_state_active");
  }
}
