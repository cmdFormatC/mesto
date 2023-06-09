import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._form = this._popup.querySelector('.popup__form');
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._popupSubmitButton = this._popup.querySelector('.popup__button');
        this._popupSubmitButtonText =this._popupSubmitButton.textContent;
    }
    _getInputValues = () => {
        const inputValues = {
            likes: []
        };
        this._inputList.forEach((item) => {
            inputValues[item.name] = item.value;
          });
        return inputValues
    }
    setEventListeners = () => {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners()
    }
    close() {
        super.close()
        this._form.reset();
    }
    renderLoading (isLoading) {
        if (isLoading) {
         this._popupSubmitButton.textContent = 'Загрузка...';
        } else {
         this._popupSubmitButton.textContent = this._popupSubmitButtonText;
        }
      }
}