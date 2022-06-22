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
}

/**
 * Функция открытия попапа
 */
const openPopup = (popup) => {
    popup.classList.add(selectors.openedPopupClass);
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
 * Закрытие попапа по кнопке Escape
 */ 
document.addEventListener('keydown', (e) => {        
    const openedPopup = document.querySelector(`.${selectors.openedPopupClass}`);

    if (e.key === 'Escape' && openedPopup) {
        closePopup(openedPopup);
    }
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
