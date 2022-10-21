const buttonEdit = document.querySelector(".profile__edit-btn");
const buttonCloseEditProfile = document.querySelector(
  ".popup__close-btn_type_profile"
);
const popupEditProfile = document.querySelector(".popup_edit-profile");
const formEditProfileElement = document.querySelector(
  ".popup__form_edit-profile"
);
const nameInput = document.querySelector(".popup__input-text_type_username");
const jobInput = document.querySelector(".popup__input-text_type_job");

const profileUsername = document.querySelector(".profile__username");
const profileJob = document.querySelector(".profile__job");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}

function formUserProfileSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  // Вставьте новые значения с помощью textContent
  profileUsername.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

buttonEdit.addEventListener("click", function () {
  openPopup(popupEditProfile);

  nameInput.value = profileUsername.textContent;
  jobInput.value = profileJob.textContent;
});

buttonCloseEditProfile.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfileElement.addEventListener("submit", formUserProfileSubmitHandler);

// Блок карточек
const formAddCardElement = document.querySelector(".popup__form_add-card"); // Воспользуйтесь методом querySelector()
const buttonAddCard = document.querySelector(".profile__add-btn");
const popupAddCard = document.querySelector(".popup_add-card");
const cardsList = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;
const buttonCloseAddCard = document.querySelector(
  ".popup__close-btn_type_add-card"
);

const linkInput = document.querySelector(".popup__input-text_type_link"); // Воспользуйтесь инструментом .querySelector()
const placeInput = document.querySelector(".popup__input-text_type_place"); // Воспользуйтесь инструментом .querySelector()

// Блок попапа с картинкой
const popupImage = document.querySelector(".popup_image");
const imageOnPopupImage = document.querySelector(".popup__image");
const imageCaptionOnPopupImage = document.querySelector(
  ".popup__image-caption"
);
const buttonClosePopupImage = document.querySelector(
  ".popup__close-btn_type_pic"
);

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardPlace = cardElement.querySelector(".card__place");

  cardImage.src = link;
  cardImage.alt = cardPlace.textContent = name;

  cardImage.addEventListener("click", handleOpenPopupImage);

  cardElement
    .querySelector(".card__islike-btn")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__islike-btn_state_active");
    });

  cardElement
    .querySelector(".card__delete-btn")
    .addEventListener("click", handleRemoveCard);

  return cardElement;
}

function handleOpenPopupImage(evt) {
  openPopup(popupImage);

  const imageFromCard = evt.target;
  const card = imageFromCard.closest(".card");
  const cardPlace = card.querySelector(".card__place");

  imageOnPopupImage.src = imageFromCard.src;
  imageOnPopupImage.alt = imageCaptionOnPopupImage.textContent =
    cardPlace.textContent;
}

function handleRemoveCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

function renderCard(card, list) {
  list.prepend(card);
}

function renderInitialCards() {
  initialCards.forEach((card) =>
    renderCard(createCard(card.name, card.link), cardsList)
  );
}

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();

  renderCard(createCard(placeInput.value, linkInput.value), cardsList);

  evt.target.reset();

  closePopup(popupAddCard);
}

formAddCardElement.addEventListener("submit", handleFormAddCardSubmit);
buttonAddCard.addEventListener("click", function () {
  openPopup(popupAddCard);
});

buttonClosePopupImage.addEventListener("click", () => closePopup(popupImage));

buttonCloseAddCard.addEventListener("click", () => closePopup(popupAddCard));
renderInitialCards();
