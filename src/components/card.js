import * as Popup from "./modal.js";
import {api} from "./api.js";
import {getUserId} from "./user.js";

/**
 * Шаблон для добавления карточек
 */
const cardTemplate = document.querySelector('#card').content;
const deleteBtnTemplate = document.querySelector('#card-delete-button').content;

/**
 * Объект с селекторами для взаимодействия с элементами шаблона карточки
 */
const selectors = {
    cardContainerSelector: '.card',
    imageSelector: '.card__image',
    titleSelector: '.card__title',
    deleteBtnSelector: '.card__delete',
    likeBtnSelector: '.card__like',
    likeBtnActiveClass: 'card__like_active',
    likesNumberSelector: '.card__likes-number'
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
 * @param {object} card - информация о карточке
 * @param {string} card.name - название изображения добавляемого места
 * @param {string} card.link - url изображения добавляемого места
 * @param {array} card.likes[] - список пользователей, лайкнувших карточку
 * @param {object} card.owner - объект пользователя, добавившего карточку
 * @param {object} card.owner._id - id пользователя, добавившего карточку
 */
const createCardBlock = (card) => {
    const cardItem = cardTemplate.cloneNode(true);
    const cardElement = cardItem.querySelector(selectors.cardContainerSelector);
    const imageElement = cardElement.querySelector(selectors.imageSelector);
    const titleElement = cardElement.querySelector(selectors.titleSelector);
    const likeElement = cardElement.querySelector(selectors.likeBtnSelector);
    const likeNumberElement = cardElement.querySelector(selectors.likesNumberSelector);

    const userId = getUserId();
    
    cardElement.id = card._id;
    imageElement.src = card.link;
    imageElement.alt = card.name;
    titleElement.textContent = card.name;
    likeNumberElement.textContent = card.likes.length;

    if (card.owner._id === userId) {
        addDeleteButton(cardElement);
    }

    if (card.likes.find((el) => el._id === userId)) {
        likeElement.classList.add(selectors.likeBtnActiveClass);
    }

    addLikeHandler(likeElement);

    imageElement.addEventListener('click', function(e) {
        openPicture(e);
    });

    return cardItem;
};

/**
 * Добавление разметки кнопки удаления карточки и слушателя по клику на неё
 */
const addDeleteButton = (cardElement) => {
    const deleteBtn = deleteBtnTemplate.cloneNode(true);

    cardElement.prepend(deleteBtn);

    cardElement.querySelector(selectors.deleteBtnSelector).addEventListener('click', function(e) {
        const cardItem = e.target.closest(selectors.cardContainerSelector);

        api.deleteCard(cardItem.id)
        .then(() => {
            cardItem.remove();
        })
        .catch((error) => {
            console.log(error);
        });
        
    });
}

/**
 * Добавление хендлера для кнопки лайка
 */
const addLikeHandler = (likeElement) => {
    likeElement.addEventListener('click', function(e) {
        const cardItem = e.target.closest(selectors.cardContainerSelector);        
        const likesNumberElement = cardItem.querySelector(selectors.likesNumberSelector);
        const isLiked = e.target.classList.contains(selectors.likeBtnActiveClass);

        api.toggleLike(cardItem.id, isLiked)
            .then((res) => {
                if (isLiked) {
                    e.target.classList.remove(selectors.likeBtnActiveClass);
                } else {
                    e.target.classList.add(selectors.likeBtnActiveClass);
                }
                likesNumberElement.textContent = res.likes.length;
            })
            .catch((error) => {
                console.log(error);
            });        
        
    });
}

/**
 * Функция инициализации картинок на странице
 * 
 * @param {HTMLElement} cardsContainer - контейнер для добавления карточек
 */
const init = (cardsContainer, cards) => {
    cards.forEach(item => {
        const card = createCardBlock(item);
    
        cardsContainer.append(card);    
    });
}

/**
 * Функция добавления новой карточки (добавляем всегда перед уже имеющимися карточками)
 * 
 * @param {HTMLElement} cardsContainer - контейнер для добавления карточки
 * @param {object} card - объект, содержащий link для картинки и title для карточки
 * @param {string} card.name - название карточки
 * @param {string} card.link - url изображения
 */
const addCard = (cardsContainer, card) => {
    return api.saveCard(card)
    .then((card) => {
        const cardMurkup = createCardBlock(card);

        cardsContainer.prepend(cardMurkup);
    })
    .catch((error) => {
        console.log(error);
    });    
}

/**
 * Функция открытия картинки большего размера
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
