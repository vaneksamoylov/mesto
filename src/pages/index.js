import "./index.css";
import {
  buttonEdit,
  formEditProfileElement,
  formAddCardElement,
  settings,
  profileUsername,
  profileJob,
} from "../utils/constants.js";
import Api from "../components/Api";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

// Подключение Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: '863b22da-7796-4e73-90ed-c34374fc920f',
    'Content-Type': 'application/json'
  }
})

// Работа с профилем через Api

api.getUserProfile()
  .then((res) => {
    userInfo.setUserInfo(res);
    // console.log(`res: ${res}`)
  });

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
const initialCards = []

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

api.getCardsFromServer()
  .then(cardList => {
    cardList.forEach(data => {
      const card = createCardElement(data);
      cardsList.addItem(card)
    })
  })

// Попап формы для добавления новой карточки
const popupAddCardForm = new PopupWithForm(".popup_add-card", (data) => {
  handleSubmitForm({
    name: data.place,
    link: data.link,
  });
});
popupAddCardForm.setEventListeners();

document.querySelector(".profile__add-btn").addEventListener("click", () => {
  validatorCardForm.resetValidation();
  popupAddCardForm.open();
});

// Блок работы с профилем
const userInfo = new UserInfo({ profileUsername, profileJob });

const popupEditProfile = new PopupWithForm(".popup_edit-profile", (data) => {
  console.log(data)
  api.editUserProfile(data.user, data.job)
    .then(res => {
        console.log(res)
        userInfo.setUserInfo(res);
    })
});
popupEditProfile.setEventListeners();

buttonEdit.addEventListener("click", () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
});
