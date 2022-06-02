// Определяем редактируемые элементы профиля пользователя
const profile = document.querySelector('.profile');
const editBtn = profile.querySelector('.profile__edit-button');
const userName = profile.querySelector('.profile__title');
const userInfo = profile.querySelector('.profile__subtitle');
const addPictureBtn = profile.querySelector('.profile__add-button');

// Контейнер для карточек с изображениями
const cards = document.querySelector('.cards');

// Шаблон для добавления карточек
const cardTemplate = document.querySelector('#card').content;

/* Определяем элементы попапа редактирования. 
 * Для того, чтобы различать попапы, решила использовать id вместо класса.
 * Это добавляет специфичности.
 */
const editProfilePopup = document.querySelector('#editUserInfo');
const profileForm = editProfilePopup.querySelector('.popup__form');
const userNameInput = profileForm.querySelector('.popup__input[name="name"]');
const userInfoInput = profileForm.querySelector('.popup__input[name="additional-info"]');

// Определяем элементы попапа добавления нового изображения
const addPicturePopup = document.querySelector('#addPicture');
const pictureForm = addPicturePopup.querySelector('.popup__form');
const pictureTitleInput = pictureForm.querySelector('.popup__input[name="title"]');
const pictureLinkInput = pictureForm.querySelector('.popup__input[name="link"]');

// Попап показа изображения
const showPicturePopup = document.querySelector('#showPicture');
const popupImage = showPicturePopup.querySelector('.popup__image');
const popupImageTitle = showPicturePopup.querySelector('.popup__image-title');

// Кнопки закрытия попапов
const closePopupBtns = document.querySelectorAll('.popup__close');

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
    const card = createCardBlock(item.name, item.link);

    cards.append(card);    
});

// Функция закрытия попапа
function closePopup(e) {
    const popup = e.target.closest('.popup');
    popup.classList.remove('popup_opened');    
}

// Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

// Функция "сохранения" информации о пользователе
function saveProfileInfo(e) {
    e.preventDefault();

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

    const card = createCardBlock(pictureTitleInput.value, pictureLinkInput.value)
    cards.prepend(card);
    
    closePopup(e);
    e.target.reset();
}

// Функция открытия картинки большего размера
function openPicture(el) {
    const src = el.target.src;
    const title = el.target.alt;

    popupImage.src = src;
    popupImage.alt = title;
    popupImageTitle.textContent = title;

    openPopup(showPicturePopup);
}

// Обработчики на закрытие попапов
closePopupBtns.forEach(function(item) {
    item.addEventListener('click', closePopup);
});

// Открытие попапа редактирования информации о пользователе
editBtn.addEventListener('click', function() {
    userNameInput.value = userName.innerText;
    userInfoInput.value = userInfo.innerText;

    openPopup(editProfilePopup);
});

// Добавление обработчика сохранения данных о пользователе
profileForm.addEventListener('submit', saveProfileInfo);

// Обработчик добавления нового изображения
addPictureBtn.addEventListener('click', function() {
    openPopup(addPicturePopup);
});

// Вешаем обработчик добавления изображения
pictureForm.addEventListener('submit', addPicture);
