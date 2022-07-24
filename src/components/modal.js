/**
 * Селекторы попапа
 */
const selectors = {
  popupClass: 'popup',

  closeBtnClass: 'popup__close',
  openedPopupClass: 'popup_opened'
}

/**
 * Селекторы содержимого попапов
 */
const popupFormSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscPress = (event) => {
    if(event.key === 'Escape'){
      this.close();
    }
  }

  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscPress)
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscPress)
  }

  setEventListeners(){
    this._popup.addEventListener('mousedown', (evt) => {
      if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    })
  }

  setLoader() {
    this._popup.querySelector(popupFormSelectors.submitButtonSelector).textContent = 'Сохранение...';
  }

  removeLoader() {
    const btn = this._popup.querySelector(popupFormSelectors.submitButtonSelector);
    const btnText = btn.value || 'Сохранить';

    btn.textContent = btnText;
  }
}


/**
 * Выношу переменную для экспорта, чтобы не добавлять целый объект
 */
// const popupClass = selectors.popupClass;
//
// const popups = document.querySelectorAll(`.${selectors.popupClass}`);

/**
 * Функция закрытия попапа
 */
// const closePopup = (popup) => {
//   popup.classList.remove(selectors.openedPopupClass);
//   unbindEscPress();
// };

/**
 * Функция открытия попапа
 */
// const openPopup = (popup) => {
//   popup.classList.add(selectors.openedPopupClass);
//   bindEscPress();
// };

/**
 * Установка лоадера на кнопке отправки формы
 */
// const setLoader = (popup) => {
//   popup.querySelector(popupFormSelectors.submitButtonSelector).textContent = 'Сохранение...';
// }

/**
 * Снятие лоадера на кнопке отправки формы. Предполагается, что в value кнопки содержится нужный
 * текст для кнопки
 */
// const removeLoader = (popup) => {
//   const btn = popup.querySelector(popupFormSelectors.submitButtonSelector);
//   const btnText = btn.value || 'Сохранить';
//
//   btn.textContent = btnText;
// }

/**
 * Обработчик нажатия на escape
 */
// const handleEscPress = (e) => {
//   if (e.key === 'Escape') {
//     closePopup(document.querySelector(`.${selectors.openedPopupClass}`));
//   }
// };

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
// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (e) => {
//
//     if (e.target.classList.contains(selectors.openedPopupClass)) {
//       closePopup(popup);
//     }
//
//     if (e.target.classList.contains(selectors.closeBtnClass)) {
//       closePopup(popup);
//     }
//   })
// });

export {popupFormSelectors};
