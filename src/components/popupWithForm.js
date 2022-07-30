import {Popup, popupFormSelectors} from "./popup.js";
import {FormValidator} from "./formValidator.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._formValues = {};
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    const formElements = Array.from(this._form.querySelectorAll('.popup__input'));

    return formElements;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._getInputValues().forEach(input => this._formValues[input.name] = input.value);
      console.log('this._formValues', this._formValues)
      this._submitHandler(this._formValues);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}