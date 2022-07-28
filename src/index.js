import './styles/index.css';

import { FormValidator } from "./components/validate.js";
import { Card } from "./components/card.js";
import { popupFormSelectors } from "./components/modal.js";
import { PopupWithForm } from './components/popupWithForm.js';
import { Api } from './components/api.js';
import { Section } from './components/section.js';
import { PopupWithImage } from "./components/popupWithImage.js";
import { UserInfo } from './components/userInfo.js';
import {
  userAvatarBtn,
  userAvatar,
  editProfileBtn,
  addPictureBtn,
  editUserAvatarForm,
  userAvatarInput,
  editProfilePopup,
  profileForm,
  userNameInput,
  userInfoInput,
  pictureForm,
  pictureTitleInput,
  pictureLinkInput
} from './components/utils.js';

const avatarValidation = new FormValidator(popupFormSelectors, editUserAvatarForm); //или editUserAvatarPopup??
const profileValidation = new FormValidator(popupFormSelectors, profileForm);
const pictureValidation = new FormValidator(popupFormSelectors, pictureForm);

// Функция сохранения информации о пользователе
const saveProfileInfo = () => {
  userPopup.setLoader(editProfilePopup);

  const userData = {
      name: userNameInput.value,
      about: userInfoInput.value
  }

  api.saveUserInfo(userData)
    .then((res)=> {
      user.setUserInfo(res);

      userPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      userPopup.removeLoader();
    });
}

// Функция обновления аватара пользователе
const saveAvatar = () => {
  avatarPopup.setLoader();

  api.saveUserAvatar(userAvatarInput.value)
    .then((res) => {
      user.setUserInfo(res);

      userAvatar.src = res.avatar;

      avatarPopup.close();
      avatarValidation._showSaveButtonState();
    })
    .catch(err => console.log(err))
    .finally(() => {
        avatarPopup.removeLoader();
    });
}

// Функция добавления нового изображения
const addPicture = () => {
  addCardPopup.setLoader();
  api.saveCard({name: pictureTitleInput.value, link: pictureLinkInput.value})
      .then((res) => {
        addCardPopup.close();

        cardsContainer.addItem(res);
      })
      .catch(err => console.log(err))
      .finally(() => {
        addCardPopup.removeLoader();
      });
      
}

const api = new Api({
  baseURL: 'https://nomoreparties.co/v1/plus-cohort-13',
  headers: {
    authorization: '36c8d5bf-5129-4f58-81ea-48641e8f9a0a'
  }
});

const userPopup = new PopupWithForm('#editUserInfo', () => {
  saveProfileInfo();
});
userPopup.setEventListeners();

const avatarPopup = new PopupWithForm('#editUserAvatar', () => {
  saveAvatar();
});
avatarPopup.setEventListeners();

const addCardPopup = new PopupWithForm('#addPicture', () => {
  addPicture();
});
addCardPopup.setEventListeners();

const popupZoomImage = new PopupWithImage('#showPicture');
popupZoomImage.setEventListeners();

let userId = 0;

const cardsContainer = new Section({
  items: [],
  renderer: (cardItem) => {
    const card = new Card({
      data: cardItem,
      deleteHandler: () => {
        api.deleteCard(card.getId())
          .then(() => {
            card.getCard().remove();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      likeHandler: () => {
        api.toggleLike(card.getId(), card.getIsLiked())
        .then((res) => {
          card.updateLikeStatus(!card.getIsLiked());
          card.getCard().querySelector('.card__like').classList.toggle('card__like_active');
          card.getCard().querySelector('.card__likes-number').textContent = res.likes.length;
        })
        .catch((error) => {
          console.log(error);
        });
      },
      imageHandler: () => {
        popupZoomImage.open(cardItem.link, cardItem.name)
      }
    },
    '#card');

    return card.generate(userId);
  }
},
'.cards');

const user = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
})

/**
 * Инициализация данных о пользователе и добавленных карточек
 * (с проверкой возможности удалить карточку данному пользователю)
 */
 const init = () => {
    const userDataPromise = api.getUser();
    const cardsDataPromise = api.getInitialCards();

    Promise.all([userDataPromise, cardsDataPromise])
        .then((res) => {
            user.setUserInfo(res[0]);
            userId = res[0]._id;

            res[1].reverse().forEach((cardItem) => {
              cardsContainer.addItem(cardItem);
            });
            
        })
        .catch((error) => {
            console.log('Ошибка: ' + error);
        })
}

init();

// Открытие попапа редактирования информации о пользователе
editProfileBtn.addEventListener('click', function() {
  const userInfo = user.getUserInfo();

  userNameInput.value = userInfo.name;
  userInfoInput.value = userInfo.about;

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

avatarValidation.enableFormValidation();
profileValidation.enableFormValidation();
pictureValidation.enableFormValidation();
