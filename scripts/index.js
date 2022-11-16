import Card from "./Card.js";
import { initialCards } from "./cards.js";
import FormValidator from "./FormValidator.js";

// универсальные константы
const closeButtons = document.querySelectorAll('.popup__close-btn');

// блок профиля
const buttonCloseEditProfile = document.querySelector(
  ".popup__close-btn_type_profile"
);
const buttonEdit = document.querySelector(".profile__edit-btn");
const formEditProfileElement = document.querySelector(
  ".popup__form_edit-profile"
);
const jobInput = document.querySelector(".popup__input-text_type_job");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const nameInput = document.querySelector(".popup__input-text_type_username");
const profileJob = document.querySelector(".profile__job");
const profileUsername = document.querySelector(".profile__username");

// Блок карточек
const buttonAddCard = document.querySelector(".profile__add-btn");
const cardsList = document.querySelector(".cards");
const formAddCardElement = document.querySelector(".popup__form_add-card");
const linkInput = document.querySelector(".popup__input-text_type_link");
const placeInput = document.querySelector(".popup__input-text_type_place");
const popupAddCard = document.querySelector(".popup_add-card");
const submitNewCardButton = document.querySelector(
  ".popup__input-save-btn_type_card"
);
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__input-save-btn",
  inactiveButtonClass: "popup__input-save-btn-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Блок попапа с картинкой
const buttonClosePopupImage = document.querySelector(
  ".popup__close-btn_type_pic"
);
const imageOnPopupImage = document.querySelector(".popup__image");
const imageCaptionOnPopupImage = document.querySelector(
  ".popup__image-caption"
);
const popupImage = document.querySelector(".popup_image");

// Подключение валидации для формы добавления карточек
const validatorCardForm = new FormValidator(settings, formAddCardElement);
validatorCardForm.enableValidation();

// Подключение валидации для формы редактирования профиля
const validatorProfileForm = new FormValidator(
  settings,
  formEditProfileElement
);
validatorProfileForm.enableValidation();
formEditProfileElement.addEventListener("submit", handleProfileFormSubmit);

// Блок действий с попап-ами
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("mousedown", closeByClickToOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
  popup.removeEventListener("mousedown", closeByClickToOverlay);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function closeByClickToOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

buttonEdit.addEventListener("click", function () {
  openPopup(popupEditProfile);

  nameInput.value = profileUsername.textContent;
  jobInput.value = profileJob.textContent;
});

buttonCloseEditProfile.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

// Блок отправки изменений в профиле
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileUsername.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

// функции для работы с карточками
function handleCardClick(name, link) {
  imageOnPopupImage.src = link;
  imageOnPopupImage.alt = imageCaptionOnPopupImage.textContent = name;
  openPopup(popupImage);
}

function createCardElement(cardsData) {
  const card = new Card(cardsData, "#card_template", handleCardClick);
  const newCard = card.createCard();
  return newCard;
}

function handleAddCard(cardsData) {
  const newCard = createCardElement(cardsData, "#card_template");
  cardsList.prepend(newCard);
}

buttonAddCard.addEventListener("click", () => {
  validatorCardForm.resetValidation();
  openPopup(popupAddCard);
});

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: placeInput.value,
    link: linkInput.value,
  };
  handleAddCard(card);
  closePopup(popupAddCard);
  placeInput.value = linkInput.value = '';
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

formAddCardElement.addEventListener("submit", handleFormAddCardSubmit);

initialCards.forEach((element) => {
  const cardElement = createCardElement(element);
  cardsList.prepend(cardElement);
});

export { openPopup, popupImage, imageCaptionOnPopupImage, imageOnPopupImage };
