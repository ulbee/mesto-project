import './styles/index.css';

import {FormValidator} from "./components/validate.js";
import {Card} from "./components/card.js";
import {Popup, popupFormSelectors} from "./components/modal.js";
import {PopupWithForm} from './components/PopupWithForm.js';
import * as User from "./components/user.js";
import {Api} from './components/api.js';

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


const avatarValidation = new FormValidator(popupFormSelectors, editUserAvatarForm); //или editUserAvatarPopup??
const profileValidation = new FormValidator(popupFormSelectors, profileForm);
const pictureValidation = new FormValidator(popupFormSelectors, pictureForm);



const api = new Api({
  baseURL: 'https://nomoreparties.co/v1/plus-cohort-13',
  headers: {
    authorization: '36c8d5bf-5129-4f58-81ea-48641e8f9a0a'
  }
});

const userPopup = new Popup('#editUserInfo');
userPopup.setEventListeners();

const avatarPopup = new Popup('#editUserAvatar');
avatarPopup.setEventListeners();

const addCardPopup = new Popup('#addPicture');
addCardPopup.setEventListeners();

/**
 * Инициализация данных о пользователе и добавленных карточек
 * (с проверкой возможности удалить карточку данному пользователю)
 */
//перенести загрузку карточек в Cards
 const init = () => {
    const userDataPromise = api.getUser();
    const cardsDataPromise = api.getInitialCards();

    Promise.all([userDataPromise, cardsDataPromise])
        .then((res) => {
            const userId = res[0]._id;

            res[1].forEach((cardItem) => {
                const card = new Card({
                  data: cardItem,
                  deleteHandler: () => {
                    api.deleteCard(card.getId())
                      .then(() => {
                        card._element.remove();
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  },
                  likeHandler: () => {
                    api.toggleLike(card.getId(), card.getIsLiked())
                    .then((res) => {
                      card._isLiked = !card.getIsLiked();
                      card._element.querySelector('.card__like').classList.toggle('card__like_active');
                      card._element.querySelector('.card__likes-number').textContent = res.likes.length;
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                  }
                },
                '#card');

                cards.append(card.generate(userId));

            });
            User.init(res[0]);
        })
        .catch((error) => {
            console.log('Ошибка: ' + error);
        })
}

init();

// FormValidator.enableFromValidation(popupFormSelectors);

// Функция сохранения информации о пользователе
const saveProfileInfo = (e) => {
  e.preventDefault();
  
  userPopup.setLoader(editProfilePopup);

  const userData = {
      name: userNameInput.value,
      about: userInfoInput.value
  }

  api.saveUserInfo(userData)
  .then((user)=> {
      userName.textContent = user.name;
      userInfo.textContent = user.about;

      userPopup.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
      userPopup.removeLoader();
  });
}

// Функция обновления аватара пользователе
const saveAvatar = (e) => {
    e.preventDefault();
    avatarPopup.setLoader();

    api.saveUserAvatar(userAvatarInput.value)
    .then((res) => {
        userAvatar.src = res.avatar;
        avatarPopup.close();
        editUserAvatarForm.reset();
      avatarValidation._showSaveButtonState(e.target, popupFormSelectors);
    })
    .catch(err => console.log(err))
    .finally(() => {
        avatarPopup.removeLoader();
    });
}

// Функция добавления нового изображения
const addPicture = (e) => {
    e.preventDefault();
    addCardPopup.setLoader();
    api.saveCard({name: pictureTitleInput.value, link: pictureLinkInput.value})
        .then((res) => {
          console.log(res)
          addCardPopup.close();

            const newCard = new Card({
              data: res,
                deleteHandler: () => {
                  api.deleteCard(newCard.getId())
                    .then(() => {
                      newCard._element.remove();
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                },
                likeHandler: () => {
                  api.toggleLike(newCard.getId(), newCard.getIsLiked())
                    .then((res) => {
                      newCard._isLiked = !newCard.getIsLiked();
                      newCard._element.querySelector('.card__like').classList.toggle('card__like_active');
                      newCard._element.querySelector('.card__likes-number').textContent = res.likes.length;
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              },
              '#card');

            cards.prepend(newCard.generate(res.owner._id));
        })
        .catch(err => console.log(err))
        .finally(() => {
          addCardPopup.removeLoader();
        });
        
}

// Открытие попапа редактирования информации о пользователе
editProfileBtn.addEventListener('click', function() {
  userNameInput.value = userName.innerText;
  userInfoInput.value = userInfo.innerText;

  userPopup.open();
});

// Открытие попапа обновления аватара пользователя
userAvatarBtn.addEventListener('click', (e) => {
  avatarPopup.open();
});

// Открытие попапа добавления нового изображения
addPictureBtn.addEventListener('click', () => {
  addCardPopup.open();
});

// Добавление обработчика сохранения данных о пользователе
profileForm.addEventListener('submit', saveProfileInfo);

// Обработчик обновления аватара
editUserAvatarForm.addEventListener('submit', saveAvatar);

// Вешаем обработчик добавления изображения
pictureForm.addEventListener('submit', addPicture);

avatarValidation.enableFormValidation();
profileValidation.enableFormValidation();
pictureValidation.enableFormValidation();