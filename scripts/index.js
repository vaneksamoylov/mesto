let editButton = document.querySelector('.profile__edit-btn');
let closeButtonEditProfile = document.querySelector('.popup__close-btn_type_profile');
let popupEditProfile = document.querySelector('.popup_edit-profile')
// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input-text_type_username'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input-text_type_job'); // Воспользуйтесь инструментом .querySelector()

let profileUsername = document.querySelector('.profile__username');
let profileJob = document.querySelector('.profile__job');


function openPopup (popup) {
  popup.classList.add('popup_opened');
};


function closePopup (popup) {
  popup.classList.remove('popup_opened');
};


function inputUserInfo() {
  username = profileUsername.textContent;
  job = profileJob.textContent;
  nameInput.value = username;
  jobInput.value = job;
}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formUserProfileSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  nameInputValue = nameInput.value;
  jobInputValue = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  profileUsername.textContent = nameInputValue;
  profileJob.textContent = jobInputValue;
  closePopup(popupEditProfile);
}


editButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  inputUserInfo(popupEditProfile)
});

closeButtonEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formUserProfileSubmitHandler);


// Блок карточек

const addCardBtn = document.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_image');
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const closeButtonAddCard = document.querySelector('.popup__close-btn_type_add-card');
// const formElementAddCard = document.querySelector('.')

let linkInput = document.querySelector('.popup__input-text_type_link'); // Воспользуйтесь инструментом .querySelector()
let placeInput = document.querySelector('.popup__input-text_type_place'); // Воспользуйтесь инструментом .querySelector()

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function formAddCardSubmit (evt) {
  evt.preventDefault();

  // Получите значение полей PlaceInput и linkInput из свойства value
  const cardInfo = {
    name: placeInput.value,
    link: linkInput.value
  };

  const newCard = createCard(cardInfo);
  evt.target.reset();
  initialCards.prepend(newCard);

  closePopup(popupEditProfile);
}

formElement.addEventListener('submit', formAddCardSubmit);


function createCard({name, link}) {
  let cardTemplate = document.querySelector('#card-template').content;
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  let cardImage = cardElement.querySelector('.card__image');
  let cardPlace = cardElement.querySelector('.card__place');

  cardImage.src = link;
  cardImage.alt = cardPlace.textContent = name;

  return cardElement;
}

function popupFullSizeImage(name, link) {
  image.src = link;
  image.alt = imageCaption.textContent = name

  openPopup(popupImage);
};


initialCards.forEach(function (element) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__place').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;

  cardsList.append(cardElement)
})

addCardBtn.addEventListener('click', function () {
  openPopup(popupAddCard);
})

closeButtonAddCard.addEventListener('click', () => closePopup(popupAddCard));
