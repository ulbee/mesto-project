
export class FormValidator {
  constructor(data, form) {
    this._data = data;
    this._form = form;
    this._inputArray = Array.from(this._form.querySelectorAll(this._data.inputSelector));
    this._button = this._form.querySelector(this._data.submitButtonSelector);
  }

  //показать ошибку валидации
  _showErrorMessage = (input) => {
    const errorElement = this._form.querySelector(`.${input.id}__error`);

    input.classList.add(this._data.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._data.errorClass);
  };

  //скрыть ошибку валидации
  _hideErrorMessage = (input) => {
    const errorElement = this._form.querySelector(`.${input.id}__error`);

    input.classList.remove(this._data.inputErrorClass);
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = '';
  }

  //Проверка валидности всех инпутов формы
  _hasInvalidValues = () => {
    return this._inputArray.some((input) => !input.validity.valid);
  };

  //смена состояния кнопки
  showSaveButtonState = () => {
    if (this._hasInvalidValues()) {
      this._button.classList.add(this._data.inactiveButtonClass);
      this._button.setAttribute('disabled', true);
    } else {
      this._button.classList.remove(this._data.inactiveButtonClass);
      this._button.removeAttribute('disabled');
    }
  }

  //включение валидации
  enableFormValidation = () => {
      this.showSaveButtonState();

      this._inputArray.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          if (!inputElement.validity.valid) {
            this._showErrorMessage( inputElement);
          } else {
            this._hideErrorMessage(inputElement);
          }

          this.showSaveButtonState();
        });
      });
  }
}
