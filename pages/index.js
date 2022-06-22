import {enableFromValidation, showSaveButtonState} from "../src/components/validate.js";
import * as Card from "../src/components/card.js";
import * as Popup from "../src/components/modal.js";


// Контейнер для карточек с изображениями
const cards = document.querySelector('.cards');
Card.init(cards);

// Селекторы содержимого попапов
const popupFormSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

enableFromValidation(popupFormSelectors);

// Определяем редактируемые элементы профиля пользователя
const profile = document.querySelector('.profile');
const userAvatar = profile.querySelector('.profile__avatar');
const editProfileBtn = profile.querySelector('.profile__edit-button');
const userName = profile.querySelector('.profile__title');
const userInfo = profile.querySelector('.profile__subtitle');
const addPictureBtn = profile.querySelector('.profile__add-button');

// Попап обновления аватара пользователя
const editUserAvatarPopup = document.querySelector('#editUserAvatar');
const editUserAvatarForm = editUserAvatarPopup.querySelector(popupFormSelectors.formSelector);
const userAvatarInput = editUserAvatarForm.querySelector(`${popupFormSelectors.inputSelector}[name="url"]`);

// Определяем элементы попапа редактирования информации о пользователе 
const editProfilePopup = document.querySelector('#editUserInfo');
const profileForm = editProfilePopup.querySelector(popupFormSelectors.formSelector);
const userNameInput = profileForm.querySelector(`${popupFormSelectors.inputSelector}[name="name"]`);
const userInfoInput = profileForm.querySelector(`${popupFormSelectors.inputSelector}[name="additional-info"]`);

// Определяем элементы попапа добавления нового изображения
const addPicturePopup = document.querySelector('#addPicture');
const pictureForm = addPicturePopup.querySelector(popupFormSelectors.formSelector);
const pictureTitleInput = pictureForm.querySelector(`${popupFormSelectors.inputSelector}[name="title"]`);
const pictureLinkInput = pictureForm.querySelector(`${popupFormSelectors.inputSelector}[name="link"]`);


// Функция "сохранения" информации о пользователе
const saveProfileInfo = (e) => {
    e.preventDefault();
    const popup = e.target.closest(`.${Popup.popupClass}`);

    userName.innerText = userNameInput.value;
    userInfo.innerText = userInfoInput.value;

    Popup.closePopup(popup);
}

// Функция сохранения аватара пользователя
const saveUserAvatar = (e) => {
    e.preventDefault();

    const popup = e.target.closest('.popup');

    userAvatar.src = userAvatarInput.value;
    Popup.closePopup(popup);
    editUserAvatarForm.reset();
}

// Функция добавления нового изображения
const addPicture = (e) => {
    e.preventDefault();

    const popup = e.target.closest(`.${Popup.popupClass}`);
    Card.addCard(cards, {title: pictureTitleInput.value, link: pictureLinkInput.value});
    
    Popup.closePopup(popup);
    e.target.reset();
    showSaveButtonState(e.target, popupFormSelectors);
}

// Открытие попапа редактирования информации о пользователе
editProfileBtn.addEventListener('click', function() {
    userNameInput.value = userName.innerText;
    userInfoInput.value = userInfo.innerText;

    Popup.openPopup(editProfilePopup);
});

// Добавление обработчика сохранения данных о пользователе
profileForm.addEventListener('submit', saveProfileInfo);

// Обработчик добавления нового изображения
addPictureBtn.addEventListener('click', function() {
    Popup.openPopup(addPicturePopup);
});

// Вешаем обработчик добавления изображения
pictureForm.addEventListener('submit', addPicture);

// Открытие попапа обновления аватара пользователя
userAvatar.addEventListener('click', (e) => {
    Popup.openPopup(editUserAvatarPopup);
});

// Обработчик обновления аватара
editUserAvatarForm.addEventListener('submit', saveUserAvatar);
