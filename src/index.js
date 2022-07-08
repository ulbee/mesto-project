import './styles/index.css';

import {enableFromValidation, showSaveButtonState} from "./components/validate.js";
import * as Card from "./components/card.js";
import * as Popup from "./components/modal.js";
import * as User from "./components/user.js";
import {getInitialCards, getUser, saveUserInfo, saveUserAvatar} from './components/api';

// Контейнер для карточек
const cards = document.querySelector('.cards');

// Определяем редактируемые элементы профиля пользователя
const profile = document.querySelector('.profile');
const userAvatarBtn = profile.querySelector('.profile__avatar-edit-button');
const userAvatar = profile.querySelector('.profile__avatar');
const editProfileBtn = profile.querySelector('.profile__edit-button');
const userName = profile.querySelector('.profile__title');
const userInfo = profile.querySelector('.profile__subtitle');
const addPictureBtn = profile.querySelector('.profile__add-button');

// Попап обновления аватара пользователя
const editUserAvatarPopup = document.querySelector('#editUserAvatar');
const editUserAvatarForm = editUserAvatarPopup.querySelector(Popup.popupFormSelectors.formSelector);
const userAvatarInput = editUserAvatarForm.querySelector(`${Popup.popupFormSelectors.inputSelector}[name="url"]`);

// Определяем элементы попапа редактирования информации о пользователе 
const editProfilePopup = document.querySelector('#editUserInfo');
const profileForm = editProfilePopup.querySelector(Popup.popupFormSelectors.formSelector);
const userNameInput = profileForm.querySelector(`${Popup.popupFormSelectors.inputSelector}[name="name"]`);
const userInfoInput = profileForm.querySelector(`${Popup.popupFormSelectors.inputSelector}[name="additional-info"]`);

// Определяем элементы попапа добавления нового изображения
const addPicturePopup = document.querySelector('#addPicture');
const pictureForm = addPicturePopup.querySelector(Popup.popupFormSelectors.formSelector);
const pictureTitleInput = pictureForm.querySelector(`${Popup.popupFormSelectors.inputSelector}[name="title"]`);
const pictureLinkInput = pictureForm.querySelector(`${Popup.popupFormSelectors.inputSelector}[name="link"]`);

/**
 * Инициализация данных о пользователе и добавленных карточек 
 * (с проверкой возможности удалить карточку данному пользователю)
 */
 const init = () => {
    const userDataPromise = getUser();
    const cardsDataPromise = getInitialCards();

    Promise.all([userDataPromise, cardsDataPromise])
        .then((res) => {
            User.init(res[0]);
            Card.init(cards, res[1]);
        })
        .catch((error) => {
            console.log('Ошибка: ' + error);
        })
}

init();

enableFromValidation(Popup.popupFormSelectors);

// Функция сохранения информации о пользователе
const saveProfileInfo = (e) => {
    e.preventDefault();
    Popup.setLoader(editProfilePopup);
    
    const userData = {
        name: userNameInput.value,
        about: userInfoInput.value
    }

    saveUserInfo(userData)
    .then((user)=> {
        userName.textContent = user.name;
        userInfo.textContent = user.about;

        Popup.closePopup(editProfilePopup);        
    })
    .catch(err => console.log(err))
    .finally(() => {
        Popup.removeLoader(editProfilePopup);
    });
}

// Функция обновления аватара пользователе
const saveAvatar = (e) => {
    e.preventDefault();
    Popup.setLoader(editUserAvatarPopup);

    saveUserAvatar(userAvatarInput.value)
    .then((res) => {
        userAvatar.src = res.avatar;
        Popup.closePopup(editUserAvatarPopup);        
        editUserAvatarForm.reset();
        showSaveButtonState(e.target, Popup.popupFormSelectors);
    })
    .catch(err => console.log(err))
    .finally(() => {
        Popup.removeLoader(editUserAvatarPopup);
    });
}

// Функция добавления нового изображения
const addPicture = (e) => {
    e.preventDefault();
    Popup.setLoader(addPicturePopup);

    Card.addCard(cards, {name: pictureTitleInput.value, link: pictureLinkInput.value})
        .then(() => {
            Popup.closePopup(addPicturePopup);
            e.target.reset();
            showSaveButtonState(e.target, Popup.popupFormSelectors);
        })
        .catch(err => console.log(err))
        .finally(() => {
            Popup.removeLoader(addPicturePopup);
        });
}

// Открытие попапа редактирования информации о пользователе
editProfileBtn.addEventListener('click', function() {
    userNameInput.value = userName.innerText;
    userInfoInput.value = userInfo.innerText;

    Popup.openPopup(editProfilePopup);
});

// Открытие попапа обновления аватара пользователя
userAvatarBtn.addEventListener('click', (e) => {
    Popup.openPopup(editUserAvatarPopup);
});

// Открытие попапа добавления нового изображения
addPictureBtn.addEventListener('click', () => {
    Popup.openPopup(addPicturePopup);
});

// Добавление обработчика сохранения данных о пользователе
profileForm.addEventListener('submit', saveProfileInfo);

// Обработчик обновления аватара
editUserAvatarForm.addEventListener('submit', saveAvatar);

// Вешаем обработчик добавления изображения
pictureForm.addEventListener('submit', addPicture);