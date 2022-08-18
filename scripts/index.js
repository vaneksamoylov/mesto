console.log('Include js');

let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let popupEditProfile = document.querySelector('.popup_edit-profile')

editButton.addEventListener('click', function () {
  console.log('click open')
  popupEditProfile.classList.add('popup_opened');
});

closeButton.addEventListener('click', function () {
  popupEditProfile.classList.remove('popup_opened');
})


// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input-text-username'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input-text-job'); // Воспользуйтесь инструментом .querySelector()

let profileUsername = document.querySelector('.profile__username');
let profileJob = document.querySelector('.profile__job');

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
    popupEditProfile.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);