import "./index.css";
import {
  buttonEdit,
  formEditProfileElement,
  formEditAvatar,
  formAddCardElement,
  settings,
  profileUsername,
  profileJob,
  profileAvatar
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
let userId;

api.getUserProfile()
  .then((res) => {
    userInfo.setUserInfo(res);
    userInfo.setUserAvatar(res);

    userId = res._id;
  })
  .catch(console.log);

// Подключение валидации для формы добавления карточек
const validatorCardForm = new FormValidator(settings, formAddCardElement);
validatorCardForm.enableValidation();

// Подключение валидации для формы редактирования профиля
const validatorProfileForm = new FormValidator(
  settings,
  formEditProfileElement
);
validatorProfileForm.enableValidation();

// Подключение валидации для формы редактирования аватара профиля
const validatorAvatarForm = new FormValidator(
  settings,
  formEditAvatar
)
validatorAvatarForm.enableValidation();

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
// cardsList.renderItems();

function createCardElement(cardsData) {
  // console.log(cardsData)
  const card = new Card({
    cardsData: cardsData,
    userId: userId,
    templateSelector: "#card_template",
    handleCardClick: (cardName, cardLink) => {
      imageOnPopupImage.open(cardName, cardLink);
    },
    handleDeleteCard: (id) => {
      popupDeleteCardConfirm.open()
      popupDeleteCardConfirm.changeHandleSubmitForm(() => {
        api.deleteCardFromServer(id)
          .then(res => {
            card.handleRemoveCard()
            console.log(res)
          })
      })
    }
  });

  // api.addCardToServer(cardName, cardLink);

  const newCard = card.createCard();
  return newCard;
}

function handleSubmitForm(cardsData) {
  const newCard = createCardElement(cardsData);
  cardsList.addItem(newCard);
  // console.log(newCard)
}

api.getCardsFromServer()
  .then(cardList => {
    cardList.reverse().forEach(data => {
      const card = createCardElement(data);
      cardsList.addItem(card)
    })
  })

// Попап формы для добавления новой карточки
const popupAddCardForm = new PopupWithForm(".popup_add-card", (data) => {
  console.log('data', data)
  api.addCardToServer(data.place, data.link)
    .then(res => {
      console.log('res', res)
      handleSubmitForm({
        name: res.name,
        link: res.link,
        likes: res.likes,
        _id: res._id,
        userId: userId,
        ownerId: res.owner._id 
      });
    })
});
popupAddCardForm.setEventListeners();

document.querySelector(".profile__add-btn").addEventListener("click", () => {
  validatorCardForm.resetValidation();
  popupAddCardForm.open();
});

// Попап удаления карточки

const popupDeleteCardConfirm = new PopupWithForm(".popup_delete-card")
popupDeleteCardConfirm.setEventListeners()

// Блок работы с профилем
const userInfo = new UserInfo({ profileUsername, profileJob, profileAvatar });

const popupEditProfile = new PopupWithForm(".popup_edit-profile", (data) => {
  api.editUserProfile(data.user, data.job)
    .then(res => {
        userInfo.setUserInfo(res);
    })
});
popupEditProfile.setEventListeners();

const popupEditAvatar = new PopupWithForm(".popup_edit-avatar", (data) => {
  api.editUserAvatar(data.avatar)
    .then(res => {
      userInfo.setUserAvatar(res)
    })
})
popupEditAvatar.setEventListeners();

document.querySelector(".profile__avatar").addEventListener("click", () => {
  popupEditAvatar.setInputValues(userInfo.getUserInfo())
})

buttonEdit.addEventListener("click", () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
});
