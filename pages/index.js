// Определяем редактируемые элементы профиля пользователя
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let userName = profile.querySelector('.profile__title');
let userInfo = profile.querySelector('.profile__subtitle');

// Определяем элементы попапа редактирования
let popup = document.querySelector('.popup');
let closePopupButton = popup.querySelector('.popup__close');
let editForm = popup.querySelector('.popup__form');
let nameInput = editForm.querySelector('.popup__input[name="name"]');
let infoInput = editForm.querySelector('.popup__input[name="additional-info"]');

// Функция "сохранения" информации о пользователе
function editProfileInfo(e) {
    e.preventDefault();

    userName.innerText = nameInput.value;
    userInfo.innerText = infoInput.value;

    closePopupButton.dispatchEvent(new Event('click'))
}

// Открытие попапа редактирования информации о пользователе
editButton.addEventListener('click', function() {
    nameInput.value = userName.innerText;
    infoInput.value = userInfo.innerText;

    popup.classList.add('popup_opened');    
});

// Закрытие попапа редактирования информации о пользователе без сохранения
closePopupButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');

    nameInput.value = '';
    infoInput.value = '';
});

// Сохранение данных о пользователе
editForm.addEventListener('submit', editProfileInfo);