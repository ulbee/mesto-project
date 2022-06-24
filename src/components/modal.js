/**
 * Селекторы попапа
 */
const selectors = {
    popupClass: 'popup',
    closeBtnSelector: '.popup__close',
    openedPopupClass: 'popup_opened'
}

/**
 * Выношу переменную для экспорта, чтобы не добавлять целый объект
 */
const popupClass = selectors.popupClass;
/**
 * Нужные элементы попапов на странице
 */
const popups = document.querySelectorAll(`.${selectors.popupClass}`);
const closePopupBtns = document.querySelectorAll(selectors.closeBtnSelector);

/**
 * Функция закрытия попапа
 */
const closePopup = (popup) => {    
    popup.classList.remove(selectors.openedPopupClass);
    unbindEscEvent();
};

/**
 * Функция открытия попапа
 */
const openPopup = (popup) => {
    popup.classList.add(selectors.openedPopupClass);
    bindEscEvent();
};

/**
 * Обработчик нажатия на escape
 */
const onEscPress = (e) => {
    if (e.key === 'Escape') {
        closePopup(document.querySelector(`.${selectors.openedPopupClass}`));
    }
};

/**
 * Вешаем обработчик нажатия на Escape
 */
const bindEscEvent = () => {
    document.addEventListener('keydown', onEscPress);
}

/**
 * Снимаем обработчик нажатия на Escape
 */
const unbindEscEvent = () => {
    document.removeEventListener('keydown', onEscPress);
}

/**
 * Вешаем обработчики по клику на крестие для всех попапов на странице
 * 
 * Решила, что все-таки это относится к модулю попапов: они сами должны знать, как закрываться
 */
closePopupBtns.forEach(function(item) {
    
    item.addEventListener('click', function(e) {
        const popup = e.target.closest(`.${selectors.popupClass}`);
        closePopup(popup);
    });
});

/**
 * Закрытие попапа по клику на оверлей
 */ 
document.addEventListener('click', function(e) {
    if (e.target.classList.contains(selectors.popupClass)) {
        closePopup(e.target);
    }
});

export {popupClass, openPopup, closePopup};
