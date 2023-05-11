export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._form = formElement;
    }
    _showInputError (formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    };
      
    _hideInputError (formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    };
    
    _checkInputValidity (formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };
    _setEventListeners (formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._settings.inputSelector));
        const buttonElement = formElement.querySelector(this._settings.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement, this._settings.inactiveButtonClass);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement, this._settings.inactiveButtonClass);
            });
        });
    };
    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }); 
    }
    _toggleButtonState (inputList, buttonElement, errorClass) {
        if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(errorClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(errorClass);
        buttonElement.disabled = false;
      } 
    }
    enableValidation () {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners(this._form);

    };
}