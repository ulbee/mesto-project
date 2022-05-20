// Определяем редактируемые элементы профиля пользователя
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let userName = profile.querySelector('.profile__title');
let userInfo = profile.querySelector('.profile__subtitle');
let addPictureBtn = profile.querySelector('.profile__add-button');

// Определяем элементы взаимодействия с карточками изображений
let cards = document.querySelector('.cards');
let likeButtons = cards.querySelectorAll('.card__like'); 

/* Определяем элементы попапа редактирования. 
 * Для того, чтобы различать попапы, решила использовать id вместо класса.
 * Это добавляет специфичности.
 */
let editProfilePopup = document.querySelector('#editUserInfo');
let closeProfilePopupBtn = editProfilePopup.querySelector('.popup__close');
let profileForm = editProfilePopup.querySelector('.popup__form');
let userNameInput = profileForm.querySelector('.popup__input[name="name"]');
let userInfoInput = profileForm.querySelector('.popup__input[name="additional-info"]');

// Определяем элементы попапа добавления нового изображения
let addPicturePopup = document.querySelector('#addPicture');
let closePicturePopupBtn = addPicturePopup.querySelector('.popup__close');
let pictureForm = addPicturePopup.querySelector('.popup__form');
let pictureTitleInput = pictureForm.querySelector('.popup__input[name="title"]');
let pictureLinkInput = pictureForm.querySelector('.popup__input[name="link"]');

// Функция закрытия попапа редактирования информации о пользователе
function closeProfilePopup() {
    editProfilePopup.classList.remove('popup_opened');

    userNameInput.value = '';
    userInfoInput.value = '';
}

// Функция "сохранения" информации о пользователе
function saveProfileInfo(e) {
    e.preventDefault();

    userName.innerText = userNameInput.value;
    userInfo.innerText = userInfoInput.value;

    closeProfilePopup();
}

// Функция закрытия попапа добавления изображения
function closePicturePopup() {
    addPicturePopup.classList.remove('popup_opened');

    pictureTitleInput.value = '';
    pictureLinkInput.value = '';
}

// Функция добавления нового изображения
function addPicture(e) {
    e.preventDefault();

    let title = pictureTitleInput.value;
    let link = pictureLinkInput.value;

    cards.insertAdjacentHTML('afterbegin', `<div class="card">
        <img class="card__image" src="${link}" alt="${title}">
            <div class="card__info">
                <h2 class="card__title">${title}</h2>
                <button type="button" class="card__like"></button>
            </div>
    </div>`);

    closePicturePopup();
}










// Открытие попапа редактирования информации о пользователе
editButton.addEventListener('click', function() {
    userNameInput.value = userName.innerText;
    userInfoInput.value = userInfo.innerText;

    editProfilePopup.classList.add('popup_opened');    
});

// Добавление обработчика закрытия попапа редактирования информации о пользователе без сохранения
closeProfilePopupBtn.addEventListener('click', closeProfilePopup);

// Добавление обработчика сохранения данных о пользователе
profileForm.addEventListener('submit', saveProfileInfo);

/* Лайк изображения. 
 * Добавляем обработчики в цикле, потому что карточек на странице много
 * TODO !!! Не работает лайк только что добавленно карточки!!!
 */
for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener('click', function() {
        this.classList.toggle('card__like_active');
    });
}

// Обработчик добавления нового изображения
addPictureBtn.addEventListener('click', function() {
    addPicturePopup.classList.add('popup_opened');
});

// Вешаем обработчик закрытия попапа добавления новой картинки
closePicturePopupBtn.addEventListener('click', closePicturePopup);

pictureForm.addEventListener('submit', addPicture);