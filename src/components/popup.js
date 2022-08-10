import {popupFormSelectors} from './utils.js'

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._submitButton = this._popup.querySelector(popupFormSelectors.submitButtonSelector);
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
    this._submitButton.textContent = 'Сохранение...';
  }

  removeLoader() {
    const btnText = this._submitButton.value || 'Сохранить';

    this._submitButton.textContent = btnText;
  }
}
