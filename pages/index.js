// Определяем редактируемые элементы профиля пользователя
let profile = document.querySelector('.profile');
let editBtn = profile.querySelector('.profile__edit-button');
let userName = profile.querySelector('.profile__title');
let userInfo = profile.querySelector('.profile__subtitle');
let addPictureBtn = profile.querySelector('.profile__add-button');

// Определяем элементы взаимодействия с карточками изображений
let cards = document.querySelector('.cards');
let images = cards.querySelectorAll('.card__image');

// Шаблон для добавления карточек
const cardTemplate = document.querySelector('#card').content;

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

initialCards.forEach(el => {
    let card = createCardBlock(el.name, el.link);

    cards.append(card);    
})


// Функция закрытия попапа редактирования информации о пользователе
function closeProfilePopup() {
    editProfilePopup.classList.remove('popup_opened');

    userNameInput.value = '';
    userInfoInput.value = '';
}

// Функция закрытия попапа добавления изображения
function closePicturePopup() {
    addPicturePopup.classList.remove('popup_opened');

    pictureTitleInput.value = '';
    pictureLinkInput.value = '';
}

// Функция "сохранения" информации о пользователе
function saveProfileInfo(e) {
    e.preventDefault();

    userName.innerText = userNameInput.value;
    userInfo.innerText = userInfoInput.value;

    closeProfilePopup();
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

    return cardItem;
}

// Функция добавления нового изображения
function addPicture(e) {
    e.preventDefault();

    let card = createCardBlock(pictureTitleInput.value, pictureLinkInput.value)
    cards.prepend(card);

    closePicturePopup();
}

// Функция открытия картинки большего размера
function openPicture() {

}










// Открытие попапа редактирования информации о пользователе
editBtn.addEventListener('click', function() {
    userNameInput.value = userName.innerText;
    userInfoInput.value = userInfo.innerText;

    editProfilePopup.classList.add('popup_opened');    
});

// Добавление обработчика закрытия попапа редактирования информации о пользователе без сохранения
closeProfilePopupBtn.addEventListener('click', closeProfilePopup);

// Добавление обработчика сохранения данных о пользователе
profileForm.addEventListener('submit', saveProfileInfo);

// Обработчик добавления нового изображения
addPictureBtn.addEventListener('click', function() {
    addPicturePopup.classList.add('popup_opened');
});

// Вешаем обработчик закрытия попапа добавления новой картинки
closePicturePopupBtn.addEventListener('click', closePicturePopup);

// Вешаем обработчик добавления изображения
pictureForm.addEventListener('submit', addPicture);
