/**
 * Селекторы попапа
 */
const selectors = {
    popupClass: 'popup',

    closeBtnClass: 'popup__close',
    openedPopupClass: 'popup_opened'
}

/**
 * Выношу переменную для экспорта, чтобы не добавлять целый объект
 */
const popupClass = selectors.popupClass;

const popups = document.querySelectorAll(`.${selectors.popupClass}`);

/**
 * Функция закрытия попапа
 */
const closePopup = (popup) => {    
    popup.classList.remove(selectors.openedPopupClass);
    unbindEscPress();
};

/**
 * Функция открытия попапа
 */
const openPopup = (popup) => {
    popup.classList.add(selectors.openedPopupClass);
    bindEscPress();
};

/**
 * Обработчик нажатия на escape
 */
const handleEscPress = (e) => {
    if (e.key === 'Escape') {
        closePopup(document.querySelector(`.${selectors.openedPopupClass}`));
    }
};

/**
 * Вешаем обработчик нажатия на Escape
 */
const bindEscPress = () => {
    document.addEventListener('keydown', handleEscPress);
}

/**
 * Снимаем обработчик нажатия на Escape
 */
const unbindEscPress = () => {
    document.removeEventListener('keydown', handleEscPress);
}

/**
 * Вешаем обработчики по клику на крестие и на оверлее для всех попапов на странице
 */
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (e) => {
        
        if (e.target.classList.contains(selectors.openedPopupClass)) {
            closePopup(popup);
        }

        if (e.target.classList.contains(selectors.closeBtnClass)) {
            closePopup(popup);
        }
    })
});

export {popupClass, openPopup, closePopup};
