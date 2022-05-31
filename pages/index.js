// Определяем редактируемые элементы профиля пользователя
let profile = document.querySelector('.profile');
let editBtn = profile.querySelector('.profile__edit-button');
let userName = profile.querySelector('.profile__title');
let userInfo = profile.querySelector('.profile__subtitle');
let addPictureBtn = profile.querySelector('.profile__add-button');

// Контейнер для карточек с изображениями
let cards = document.querySelector('.cards');

// Шаблон для добавления карточек
const cardTemplate = document.querySelector('#card').content;

/* Определяем элементы попапа редактирования. 
 * Для того, чтобы различать попапы, решила использовать id вместо класса.
 * Это добавляет специфичности.
 */
let editProfilePopup = document.querySelector('#editUserInfo');
let profileForm = editProfilePopup.querySelector('.popup__form');
let userNameInput = profileForm.querySelector('.popup__input[name="name"]');
let userInfoInput = profileForm.querySelector('.popup__input[name="additional-info"]');

// Определяем элементы попапа добавления нового изображения
let addPicturePopup = document.querySelector('#addPicture');
let pictureForm = addPicturePopup.querySelector('.popup__form');
let pictureTitleInput = pictureForm.querySelector('.popup__input[name="title"]');
let pictureLinkInput = pictureForm.querySelector('.popup__input[name="link"]');

// Попап показа изображения
let showPicturePopup = document.querySelector('#showPicture');

// Кнопки закрытия попапов
let closePopupBtns = document.querySelectorAll('.popup__close');

// Массив добавленных по умолчанию карточек
const initialCards = [{
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    }, {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    }, {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    }, {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    }, {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    }, {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }];

initialCards.forEach(item => {
    let card = createCardBlock(item.name, item.link);

    cards.append(card);    
});

// Функция закрытия попапа
function closePopup(e) {
    let popup = e.target.closest('.popup');
    popup.classList.remove('popup_opened');

    popup.querySelectorAll('.popup__input').forEach(item => {
        item.value = '';
    })
}

// Функция "сохранения" информации о пользователе
function saveProfileInfo(e) {
    e.preventDefault();

    // TODO проверить на XSS!!!
    userName.innerText = userNameInput.value;
    userInfo.innerText = userInfoInput.value;

    closePopup(e);
}

// Функция создания html-разметки блока карточки
function createCardBlock(title, link) {
    const cardItem = cardTemplate.cloneNode(true);
    
    cardItem.querySelector('.card__image').src = link;
    cardItem.querySelector('.card__image').alt = title;
    cardItem.querySelector('.card__title').textContent = title;

    cardItem.querySelector('.card__delete').addEventListener('click', function(e) {
        e.target.closest('.card').remove();
    });
    cardItem.querySelector('.card__like').addEventListener('click', function(e) {
        e.target.classList.toggle('card__like_active');
    });
    cardItem.querySelector('.card__image').addEventListener('click', function(e) {
        openPicture(e);
    });

    return cardItem;
}

// Функция добавления нового изображения
function addPicture(e) {
    e.preventDefault();

    let card = createCardBlock(pictureTitleInput.value, pictureLinkInput.value)
    cards.prepend(card);
    
    closePopup(e);
}

// Функция открытия картинки большего размера
function openPicture(el) {
    let src = el.target.src;
    let title = el.target.alt;

    showPicturePopup.querySelector('.popup__image').src = src;
    showPicturePopup.querySelector('.popup__image-title').textContent = title;
    showPicturePopup.classList.add('popup_opened');
}

// Обработчики на закрытие попапов
closePopupBtns.forEach(function(item) {
    item.addEventListener('click', closePopup);
});

// Открытие попапа редактирования информации о пользователе
editBtn.addEventListener('click', function() {
    userNameInput.value = userName.innerText;
    userInfoInput.value = userInfo.innerText;

    editProfilePopup.classList.add('popup_opened');    
});

// Добавление обработчика сохранения данных о пользователе
profileForm.addEventListener('submit', saveProfileInfo);

// Обработчик добавления нового изображения
addPictureBtn.addEventListener('click', function() {
    addPicturePopup.classList.add('popup_opened');
});

// Вешаем обработчик добавления изображения
pictureForm.addEventListener('submit', addPicture);
