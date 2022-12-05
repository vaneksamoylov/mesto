// универсальные константы
export const closeButtons = document.querySelectorAll('.popup__close-btn');

// блок профиля
export const buttonCloseEditProfile = document.querySelector(
  ".popup__close-btn_type_profile"
);
export const buttonEdit = document.querySelector(".profile__edit-btn");
export const formEditProfileElement = document.querySelector(
  ".popup__form_edit-profile"
);
export const jobInput = document.querySelector(".popup__input-text_type_job");
export const nameInput = document.querySelector(".popup__input-text_type_username");
export const popupEditProfile = document.querySelector(".popup_edit-profile");
export const profileJob = ".profile__job";
export const profileUsername = ".profile__username";

// Блок карточек
export const buttonAddCard = document.querySelector(".profile__add-btn");
export const cardsList = document.querySelector(".cards");
export const formAddCardElement = document.querySelector(".popup__form_add-card");
export const linkInput = document.querySelector(".popup__input-text_type_link");
export const placeInput = document.querySelector(".popup__input-text_type_place");
export const popupAddCard = document.querySelector(".popup_add-card");
export const submitNewCardButton = document.querySelector(
  ".popup__input-save-btn_type_card"
);
export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__input-save-btn",
  inactiveButtonClass: "popup__input-save-btn-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Блок попапа с картинкой
export const buttonClosePopupImage = document.querySelector(
  ".popup__close-btn_type_pic"
);
export const imageOnPopupImage = document.querySelector(".popup__image");
export const imageCaptionOnPopupImage = document.querySelector(
  ".popup__image-caption"
);
export const popupImage = document.querySelector(".popup_image");
