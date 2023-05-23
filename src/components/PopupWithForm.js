import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._form = this._popup.querySelector('.popup__form');
        this._closeButton = this._popup.querySelector('.popup__close-button');
    }
    _getInputValues = () => {
        const inputValues = {};
        this._inputList.forEach((item) => {
            inputValues[item.name] = item.value;
          });
        return inputValues
    }
    setEventListeners = () => {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault()
            const inputValues = this._getInputValues();
            this._handleFormSubmit(inputValues);
        });
        super.setEventListeners()
    }
    close() {
        super.close()
        this._form.reset();
    }
}