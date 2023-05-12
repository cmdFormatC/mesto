export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._form = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = formElement.querySelector(this._settings.submitButtonSelector);
    }
    _showInputError (inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    };
      
    _hideInputError (inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    };
    
    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };
    _setEventListeners () {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };
    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }); 
    }
    _toggleButtonState () {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this._buttonElement.disabled = false;
      } 
    }
    resetValidation() {
        this._toggleButtonState(); 
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
  
      }
    enableValidation () {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();

    };
}