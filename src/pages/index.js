import './index.css';
import { initialCards } from "./cards.js";
import {
	formEditProfileElement,
	formAddCardElement,
	settings,
	buttonEdit,
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
const imageOnPopupImage = new PopupWithImage(
	document.querySelector(".popup_image")
);
imageOnPopupImage.setEventListeners();

// Блок логики с карточками
const cardsList = new Section(
	{
		items: initialCards,
		renderer: cardsData => {
			cardsList.addItem(createCardElement(cardsData));
		},
	},
	".cards"
)
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

function handleAddCard(cardsData) {
  const newCard = createCardElement(cardsData);
  cardsList.addItem(newCard);
}

// Попап формы для добавления новой карточки
const popupAddCardForm = new PopupWithForm(document.querySelector('.popup_add-card'), (data) => {
  handleAddCard(
    {
      name: data.place,
      link: data.link
    },
    ".element-template"
  );
}); 
popupAddCardForm.setEventListeners();

document.querySelector(".profile__add-btn").addEventListener("mousedown", () => {
  validatorCardForm.resetValidation();
  popupAddCardForm.open();
});

// Блок работы с профилем
const userInfo = new UserInfo({ profileUsername, profileJob});

const popupEditProfile = new PopupWithForm(document.querySelector('.popup_edit-profile'), (data) => {
	userInfo.setUserInfo(data);
	console.log(data)
})
popupEditProfile.setEventListeners();

buttonEdit.addEventListener('mousedown', () => {
	popupEditProfile.setInputValues(userInfo.getUserInfo());
})