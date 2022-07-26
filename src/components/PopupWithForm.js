import {Popup, popupFormSelectors} from "./modal.js";
import {FormValidator} from "./validate.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    const formElements = Array.from(this._form.querySelectorAll('.popup__input'));

    return formElements;
  }

  setEventListeners() {
    super.setEventListeners();
    //проверить, валидна ли форма
    FormValidator.enableFormValidation(popupFormSelectors);//поменять после переписывания валидации

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();

      this._submitHandler();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}