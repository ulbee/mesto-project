import * as Popup from "./modal.js";

/**
 * Массив добавленных по умолчанию карточек
 */
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

/**
 * Шаблон для добавления карточек
 */
const cardTemplate = document.querySelector('#card').content;

/**
 * Объект с селекторами для взаимодействия с элементами шаблона карточки
 */
const selectors = {
    cardContainerSelector: '.card',
    imageSelector: '.card__image',
    titleSelector: '.card__title',
    deleteBtnSelector: '.card__delete',
    likeBtnSelector: '.card__like',
    likeBtnActiveClass: 'card__like_active'
}

/**
 * Селекторы показа увеличенной картинки
 */
const showPicturePopup = document.querySelector('#showPicture');
const popupImage = showPicturePopup.querySelector('.popup__image');
const popupImageTitle = showPicturePopup.querySelector('.popup__image-title');

/**
 * Функция создания html-разметки блока карточки
 * 
 * @param {string} title - название карточки
 * @param {string} link - url изображения добавляемого места
 * 
 * @todo cardTemplate
 * @todo openPicture
 */
const createCardBlock = (title, link) => {
    const cardItem = cardTemplate.cloneNode(true);
    
    cardItem.querySelector(selectors.imageSelector).src = link;
    cardItem.querySelector(selectors.imageSelector).alt = title;
    cardItem.querySelector(selectors.titleSelector).textContent = title;

    cardItem.querySelector(selectors.deleteBtnSelector).addEventListener('click', function(e) {
        e.target.closest(selectors.cardContainerSelector).remove();
    });
    cardItem.querySelector(selectors.likeBtnSelector).addEventListener('click', function(e) {
        e.target.classList.toggle(selectors.likeBtnActiveClass);
    });
    cardItem.querySelector(selectors.imageSelector).addEventListener('click', function(e) {
        openPicture(e);
    });

    return cardItem;
};

/**
 * Функция инициализации картинок на странице
 * 
 * @param {HTMLElement} cardsContainer - контейнер для добавления карточек
 */
const init = (cardsContainer) => {
    initialCards.forEach(item => {
        const card = createCardBlock(item.name, item.link);
    
        cardsContainer.append(card);    
    });    
}

/**
 * Функция добавления новой карточки (добавляем всегда перед уже имеющимися карточками)
 * 
 * @param {HTMLElement} cardsContainer - контейнер для добавления карточки
 * @param {object} cardsData - объект, содержащий link для картинки и title для карточки
 * @param {string} cardsData.title - название карточки
 * @param {string} cardsData.link - url изображения
 */
const addCard = (cardsContainer, cardsData) => {
    const card = createCardBlock(cardsData.title, cardsData.link);

    cardsContainer.prepend(card);
}

/**
 * Функция открытия картинки большего размера
 * 
 * Я решила, что эта функция должна относиться к модулю карточки: то есть карточка должна уметь 
 * добавляться, удаляться, лайкаться и также открывать попап с увеличенным изображением.
 */
const openPicture = (el) => {
    const src = el.target.src;
    const title = el.target.alt;

    popupImage.src = src;
    popupImage.alt = title;
    popupImageTitle.textContent = title;

    Popup.openPopup(showPicturePopup);
}

export {init, addCard};
