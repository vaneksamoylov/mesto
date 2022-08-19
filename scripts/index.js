let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let popupEditProfile = document.querySelector('.popup_edit-profile')
// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input-text_type_username'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input-text_type_job'); // Воспользуйтесь инструментом .querySelector()

let profileUsername = document.querySelector('.profile__username');
let profileJob = document.querySelector('.profile__job');


function openPopup (el) {
  el.classList.add('popup_opened');
  username = profileUsername.textContent;
  job = profileJob.textContent;
  nameInput.value = username;
  jobInput.value = job;
};

function closePopup (el) {
  el.classList.remove('popup_opened');
};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
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
});

closeButton.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);