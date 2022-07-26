
// проверить параметры функций, убрать ненужные, а, кажется, ненужные почти все, кроме тех, что в шоу/хайд.
//чекнуть остальные заметки по коду итд.

export class FormValidator {
  constructor(data, form) {
    this._data = data;
    this._form = form;
    this._inputArray = Array.from(this._form.querySelectorAll(this._data.inputSelector)) //я так понимаю, я могу так использовать инпут селектор из popupFormSelectors, который лежит в modal.js. проверить
    this._button = this._form.querySelector(this._data.submitButtonSelector) //тут так же выбираю кнопку отправки формы. проверить
  }

  //показать ошибку валидации
  _showErrorMessage = (form, input, data) => {
    const errorElement = this._form.querySelector(`.${input.id}__error`);

    input.classList.add(this._data.inputErrorClass);
    errorElement.textContent = input.validationMessage; //не могу понять, что ставить сюда вместо input
    errorElement.classList.add(this._data.errorClass);
  };

  //скрыть ошибку валидации
  _hideErrorMessage = (form, input, data) => {
    const errorElement = this._form.querySelector(`.${input.id}__error`);

    input.classList.remove(this._data.inputErrorClass); //аналогично с 14 строкой
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = '';
  }

  //Проверка валидности всех инпутов формы
  _hasInvalidValues = (form, data) => {
    // const inputList = Array.from(form.querySelectorAll(data.inputSelector)); //возможно могу закомментить, потому что массив теперь в конструкторе

    return this._inputArray.some((input) => !input.validity.valid); //проверить: у меня вообще по-другому написан весь блок валидации
  };

  //смена состояния кнопки
  _showSaveButtonState = () => {
    // const saveBtn = form.querySelector(data.submitButtonSelector);

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
    const formElements = Array.from(document.querySelectorAll(this._data.formSelector));

    formElements.forEach(() => {
      // const inputList = Array.from(this._form.querySelectorAll(this._data.inputSelector));

      this._showSaveButtonState(this._form, this._data);

      this._inputArray.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          if (!inputElement.validity.valid) {
            this._showErrorMessage(this._form, inputElement, this._data);
          } else {
            this._hideErrorMessage(this._form, inputElement, this._data);
          }

          this._showSaveButtonState(this._form, this._data);
        });
      });
    });

  }
}

/**
 * Показ инлайного сообщения об ошибке для поля ввода
 *
 * @param {HTMLElement} form - элемент видимой пользователю формы, для которой сейчас происходит валидация
 * @param {HTMLElement} input - валидируемое поле ввода
 * @param {object} data - необходимые селекторы для поиска нужных элементов
 */
// const showErrorMessage = (form, input, data) => {
//   const errorElement = form.querySelector(`.${input.id}__error`);
//
//   input.classList.add(data.inputErrorClass);
//   errorElement.textContent = input.validationMessage;
//   errorElement.classList.add(data.errorClass);
// };

/**
 * Функция скрытия сообщения об ошибке для инпута
 *
 * @param {HTMLElement} form - элемент видимой пользователю формы, для которой сейчас происходит валидация
 * @param {HTMLElement} input - валидируемое поле ввода
 * @param {object} data - необходимые селекторы для поиска нужных элементов
 */
// const hideErrorMessage = (form, input, data) => {
//   const errorElement = form.querySelector(`.${input.id}__error`);
//
//   input.classList.remove(data.inputErrorClass);
//   errorElement.classList.remove(data.errorClass);
//   errorElement.textContent = '';
// }

/**
 * Проверка валидности всех инпутов формы
 *
 * @param {HTMLElement} form - элемент видимой пользователю формы, для которой сейчас происходит валидация
 * @param {object} data - необходимые селекторы для поиска нужных элементов
 */
// const hasInvalidValues = (form, data) => {
//   const inputList = Array.from(form.querySelectorAll(data.inputSelector));
//
//   return inputList.some((input) => !input.validity.valid);
// };

/**
 * Функция отображения актуального состояния кнопки для сохранения формы
 *
 * @param {HTMLElement} form - элемент видимой пользователю формы, для которой сейчас происходит валидация
 * @param {object} data - необходимые селекторы для поиска нужных элементов
 */
// const showSaveButtonState = (form, data) => {
//   const saveBtn = form.querySelector(data.submitButtonSelector);
//
//   if (hasInvalidValues(form, data)) {
//     saveBtn.classList.add(data.inactiveButtonClass);
//     saveBtn.setAttribute('disabled', true);
//   } else {
//     saveBtn.classList.remove(data.inactiveButtonClass);
//     saveBtn.removeAttribute('disabled');
//   }
// }

/**
 * Добавление валидации для всех форм в попапах
 *
 * @param {object} data - объект с селекторами формы, инпутов и кнопок для их валидации
 * @example
 * ```enableFromValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save-button',
        inactiveButtonClass: 'popup__save-button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
    });
 * ```
 *
 */
// const enableFromValidation = (data) => {
//   const formElements = Array.from(document.querySelectorAll(data.formSelector));
//
//   formElements.forEach((formElement) => {
//     const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
//
//     showSaveButtonState(formElement, data);
//
//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', () => {
//         if (!inputElement.validity.valid) {
//           showErrorMessage(formElement, inputElement, data);
//         } else {
//           hideErrorMessage(formElement, inputElement, data);
//         }
//
//         showSaveButtonState(formElement, data);
//       });
//     });
//   });
//
// }


// export {enableFromValidation, showSaveButtonState};