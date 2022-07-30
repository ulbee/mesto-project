/**
 * Селекторы содержимого попапов
 */
const popupFormSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

// Определяем редактируемые элементы профиля пользователя
const profile = document.querySelector('.profile');
const userAvatarBtn = profile.querySelector('.profile__avatar-edit-button');
const editProfileBtn = profile.querySelector('.profile__edit-button');
const addPictureBtn = profile.querySelector('.profile__add-button');

// Попап обновления аватара пользователя
const editUserAvatarPopup = document.querySelector('#editUserAvatar');
const editUserAvatarForm = editUserAvatarPopup.querySelector(popupFormSelectors.formSelector);

// Определяем элементы попапа редактирования информации о пользователе
const editProfilePopup = document.querySelector('#editUserInfo');
const profileForm = editProfilePopup.querySelector(popupFormSelectors.formSelector);
const userNameInput = profileForm.querySelector(`${popupFormSelectors.inputSelector}[name="name"]`);
const userInfoInput = profileForm.querySelector(`${popupFormSelectors.inputSelector}[name="about"]`);

// Определяем элементы попапа добавления нового изображения
const addPicturePopup = document.querySelector('#addPicture');
const pictureForm = addPicturePopup.querySelector(popupFormSelectors.formSelector);

export {
    profile,
    userAvatarBtn,
    editProfileBtn,
    addPictureBtn,
    editUserAvatarPopup,
    editUserAvatarForm,
    editProfilePopup,
    profileForm,
    userNameInput,
    userInfoInput,
    addPicturePopup,
    pictureForm,
    popupFormSelectors
};