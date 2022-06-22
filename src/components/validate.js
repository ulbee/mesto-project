/**
 * Показ инлайного сообщения об ошибке для поля ввода
 * 
 * @param {TYPE} form - элемент видимой пользователю формы, для которой сейчас происходит валидация
 * @param {TYPE} input - валидируемое поле ввода
 * @param {object} data - необходимые селекторы для поиска нужных элементов
 */
 const showErrorMessage = (form, input, data) => {
    const errorElement = form.querySelector(`.${input.id}__error`);

    input.classList.add(data.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(data.errorClass);
};

/**
 * Функция скрытия сообщения об ошибке для инпута
 * 
 * @param {TYPE} form - элемент видимой пользователю формы, для которой сейчас происходит валидация
 * @param {TYPE} input - валидируемое поле ввода
 * @param {object} data - необходимые селекторы для поиска нужных элементов
 */
const hideErrorMessage = (form, input, data) => {
    const errorElement = form.querySelector(`.${input.id}__error`);

    input.classList.remove(data.inputErrorClass);
    errorElement.classList.remove(data.errorClass);
    errorElement.textContent = '';
}

/**
 * Проверка валидности всех инпутов формы
 * 
 * @param {TYPE} form - элемент видимой пользователю формы, для которой сейчас происходит валидация
 * @param {object} data - необходимые селекторы для поиска нужных элементов
 */
const hasInvalidValues = (form, data) => {
    const inputList = Array.from(form.querySelectorAll(data.inputSelector));

    return inputList.some((input) => !input.validity.valid);    
};

/**
 * Функция отображения актуального состояния кнопки для сохранения формы
 * 
 * @param {TYPE} form - элемент видимой пользователю формы, для которой сейчас происходит валидация
 * @param {object} data - необходимые селекторы для поиска нужных элементов
 */
const showSaveButtonState = (form, data) => {
    const saveBtn = form.querySelector(data.submitButtonSelector);

    if (hasInvalidValues(form, data)) {
        saveBtn.classList.add(data.inactiveButtonClass);
        saveBtn.setAttribute('disabled', true);
    } else {
        saveBtn.classList.remove(data.inactiveButtonClass);
        saveBtn.removeAttribute('disabled');
    }
}

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
const enableFromValidation = (data) => {
    const formElements = Array.from(document.querySelectorAll(data.formSelector));

    formElements.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));

        showSaveButtonState(formElement, data);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                if (!inputElement.validity.valid) {
                    showErrorMessage(formElement, inputElement, data);
                } else {
                    hideErrorMessage(formElement, inputElement, data);
                }

                showSaveButtonState(formElement, data);
            });
        });
    });

}


export {enableFromValidation};