import { initialCards } from "./cards.js";
import {
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
const imageOnPopupImage = new PopupWithImage(
	document.querySelector(".popup_image")
);
imageOnPopupImage.setEventListeners();

const cardsList = new Section(
	{
		items: initialCards,
		renderer: cardsData => {
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

// Попап формы для добавления новой карточки
const popupAddCardForm = new PopupWithForm(document.querySelector('.popup_add-card'), (data) => {
  handleAddCard(
    {
      name: data.name,
      link: data.link
    },
    ".element-template"
  );
}); 
popupAddCardForm.setEventListeners();


document.querySelector(".profile__add-btn").addEventListener("click", () => {
  validatorCardForm.resetValidation();
  popupAddCardForm.open();
});