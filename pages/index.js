// Определяем редактируемые элементы профиля пользователя
const profile = document.querySelector('.profile');
const userAvatar = profile.querySelector('.profile__avatar');
const editBtn = profile.querySelector('.profile__edit-button');
const userName = profile.querySelector('.profile__title');
const userInfo = profile.querySelector('.profile__subtitle');
const addPictureBtn = profile.querySelector('.profile__add-button');

// Контейнер для карточек с изображениями
const cards = document.querySelector('.cards');

// Шаблон для добавления карточек
const cardTemplate = document.querySelector('#card').content;

// Попап обновления аватара пользователя
const editUserAvatarPopup = document.querySelector('#editUserAvatar');
const editUserAvatarForm = editUserAvatarPopup.querySelector('.popup__form');
const userAvatarInput = editUserAvatarForm.querySelector('.popup__input[name="url"]');

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

// 
const popups = document.querySelectorAll('.popup');
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
function closePopup(popup) {    
    popup.classList.remove('popup_opened');    
}

// Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

// Функция "сохранения" информации о пользователе
function saveProfileInfo(e) {
    e.preventDefault();
    const popup = e.target.closest('.popup');

    userName.innerText = userNameInput.value;
    userInfo.innerText = userInfoInput.value;

    closePopup(popup);
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

// Функция сохранения аватара пользователя
function saveUserAvatar(e) {
    e.preventDefault();

    const popup = e.target.closest('.popup');

    userAvatar.src = userAvatarInput.value;
    closePopup(popup);
    editUserAvatarForm.reset();
}

// Функция добавления нового изображения
function addPicture(e) {
    e.preventDefault();

    const popup = e.target.closest('.popup');
    const card = createCardBlock(pictureTitleInput.value, pictureLinkInput.value)
    cards.prepend(card);
    
    closePopup(popup);
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

/**
 * Показ инлайного сообщения об ошибке для поля ввода
 */
const showErrorMessage = (form, input) => {
    const errorElement = form.querySelector(`.${input.id}__error`);

    input.classList.add('popup__input_type_error');
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add('popup__input-error_active');
};

/**
 * Функция скрытия сообщения об ошибке для инпута
 */
const hideErrorMessage = (form, input) => {
    const errorElement = form.querySelector(`.${input.id}__error`);

    input.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
}

/**
 * Проверка валидности всех инпутов формы
 */
const hasInvalidValues = (form) => {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));

    return inputList.some((input) => !input.validity.valid);    
};

/**
 * Функция отображения актуального состояния кнопки для сохранения формы
 */
const showSaveButtonState = (form) => {
    const saveBtn = form.querySelector('.popup__save-button');

    if (hasInvalidValues(form)) {
        saveBtn.classList.add('popup__save-button_disabled');        
        saveBtn.setAttribute('disabled', true);
    } else {
        saveBtn.classList.remove('popup__save-button_disabled');
        saveBtn.removeAttribute('disabled');
    }
}

/**
 * Добавление валидации для всех форм в попапах
 */
const enableFromValidation = () => {
    const formElements = Array.from(document.querySelectorAll('.popup__form'));

    formElements.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

        showSaveButtonState(formElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                if (!inputElement.validity.valid) {
                    showErrorMessage(formElement, inputElement);
                } else {
                    hideErrorMessage(formElement, inputElement);
                }

                showSaveButtonState(formElement);
            });
        });
    });

}


enableFromValidation();


// Обработчики на закрытие попапов
closePopupBtns.forEach(function(item) {
    
    item.addEventListener('click', function(e) {
        const popup = e.target.closest('.popup');
        closePopup(popup);
    });
});

// Закрытие попапа по кнопке Escape
document.addEventListener('keydown', (e) => {        
    const openedPopup = document.querySelector('.popup_opened');

    if (e.key === 'Escape' && openedPopup) {
        closePopup(openedPopup);
    }
});

// Закрытие попапа по клику на оверлей
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('popup')) {
        closePopup(e.target);
    }
});

// Открытие попапа обновления аватара пользователя
userAvatar.addEventListener('click', (e) => {
    openPopup(editUserAvatarPopup);
})

// Открытие попапа редактирования информации о пользователе
editBtn.addEventListener('click', function() {
    userNameInput.value = userName.innerText;
    userInfoInput.value = userInfo.innerText;

    openPopup(editProfilePopup);
});

// Обработчик обновления аватара
editUserAvatarForm.addEventListener('submit', saveUserAvatar);

// Добавление обработчика сохранения данных о пользователе
profileForm.addEventListener('submit', saveProfileInfo);

// Обработчик добавления нового изображения
addPictureBtn.addEventListener('click', function() {
    openPopup(addPicturePopup);
});

// Вешаем обработчик добавления изображения
pictureForm.addEventListener('submit', addPicture);



