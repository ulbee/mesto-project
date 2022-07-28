import {popupFormSelectors} from "./modal.js";

// Определяем редактируемые элементы профиля пользователя
const profile = document.querySelector('.profile');
const userAvatarBtn = profile.querySelector('.profile__avatar-edit-button');
const userAvatar = profile.querySelector('.profile__avatar');
const editProfileBtn = profile.querySelector('.profile__edit-button');
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

export {
    profile,
    userAvatarBtn,
    userAvatar,
    editProfileBtn,
    addPictureBtn,
    editUserAvatarPopup,
    editUserAvatarForm,
    userAvatarInput,
    editProfilePopup,
    profileForm,
    userNameInput,
    userInfoInput,
    addPicturePopup,
    pictureForm,
    pictureTitleInput,
    pictureLinkInput
};