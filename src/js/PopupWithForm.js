import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
        this._form = this._popupSelector.querySelector('.popup__form');
        this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    }
    _getInputValues = () => {
        const inputValues = {};
        this._inputList.forEach((item) => {
            inputValues[item.name] = item.value;
          });
        return inputValues
    }
    setEventListeners = () => {
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault()
            const inputValues = this._getInputValues();
            this._handleFormSubmit(inputValues);
        });
        this._closeButton.addEventListener('click', this.close);
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')) {
                this.close();
            }
          });
    }
    close = () => {
        this._popupSelector.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
        this._form.reset();
    }
}