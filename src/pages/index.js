import { initialCards } from "./cards.js";
import {
  formEditProfileElement,
  formAddCardElement,
  settings,
  profileUsername,
  profileJob
} from "../utils/constants.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js"
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

const imageOnPopupImage = new PopupWithImage(document.querySelector(".popup_image"));
imageOnPopupImage.setEventListeners();

const cardsList = new Section({
  items: initialCards, 
  renderer: (cardsData) => {
    cardsList.addItem(createCardElement(cardsData))
  }
}, '.cards' ) 

cardsList.renderItems();

function createCardElement (cardsData) {
  const card = new Card({cardsData: cardsData, templateSelector: '#card_template',
    handleCardClick: (cardsData) => {
      console.log(cardsData.link)
      imageOnPopupImage.open(cardsData);
    }
  });
  const newCard = card.createCard();
  
  return newCard;
}

// const popupImage = new PopupWithImage(document.querySelector('.popup_image'));
// popupImage.setEventListeners();
// console.log(popupImage)

const userInfo = new UserInfo({
  profileUsername, profileJob
})
