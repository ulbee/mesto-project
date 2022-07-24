import {Popup, popupFormSelectors} from "./modal";
import {enableFromValidation} from "./validate";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form')
  }
  _getInputValues() {
    const formElements = Array.from(this._form.querySelectorAll('.popup__input'));
  }
  setEventListeners() {
    super.setEventListeners();
    //проверить, валидна ли форма
    enableFromValidation(popupFormSelectors);//поменять после переписывания валидации
    this._submitHandler()
  }
  close() {
    super.close();
    this._form.reset();
  }
}