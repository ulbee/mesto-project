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
export const popupFormSelectors = {
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
