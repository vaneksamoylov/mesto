import "./index.css";
import { initialCards } from "./cards.js";
import {
  buttonEdit,
  formEditProfileElement,
  formAddCardElement,
  settings,
  profileUsername,
  profileJob,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

// Подключение валидации для формы добавления карточек
const validatorCardForm = new FormValidator(settings, formAddCardElement);
validatorCardForm.enableValidation();

// Подключение валидации для формы редактирования профиля
const validatorProfileForm = new FormValidator(
  settings,
  formEditProfileElement
);
validatorProfileForm.enableValidation();

// Попап раскрывающий изображение в полный размер
const imageOnPopupImage = new PopupWithImage(".popup_image");
imageOnPopupImage.setEventListeners();

// Блок логики с карточками
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardsData) => {
      cardsList.addItem(createCardElement(cardsData));
    },
  },
  ".cards"
);
cardsList.renderItems();

function createCardElement(cardsData) {
  const card = new Card({
    cardsData: cardsData,
    templateSelector: "#card_template",
    handleCardClick: (cardName, cardLink) => {
      imageOnPopupImage.open(cardName, cardLink);
    },
  });
  const newCard = card.createCard();

  return newCard;
}

function handleSubmitForm(cardsData) {
  const newCard = createCardElement(cardsData);
  cardsList.addItem(newCard);
}

// Попап формы для добавления новой карточки
const popupAddCardForm = new PopupWithForm(
  ".popup_add-card",
  (data) => {
    handleSubmitForm({
      name: data.place,
      link: data.link,
    });
  }
);
popupAddCardForm.setEventListeners();

document
  .querySelector(".profile__add-btn")
  .addEventListener("click", () => {
    validatorCardForm.resetValidation();
    popupAddCardForm.open();
  });

// Блок работы с профилем
const userInfo = new UserInfo({ profileUsername, profileJob });

const popupEditProfile = new PopupWithForm(
  ".popup_edit-profile",
  (data) => {
    userInfo.setUserInfo(data);
  }
);
popupEditProfile.setEventListeners();

buttonEdit.addEventListener("click", () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
});
