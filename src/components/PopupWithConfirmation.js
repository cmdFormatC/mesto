import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupSubmitButton = this._popup.querySelector('.popup__button');
        this._popupSubmitButtonText =this._popupSubmitButton.textContent;
        this._сardId = '';
    }
    setEventListeners = () => {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._сardId);
        });
        super.setEventListeners()
    }

    open(cardId) {
        super.open()
        this._сardId = cardId;
    }
    renderLoading (isLoading) {
        if (isLoading) {
         this._popupSubmitButton.textContent = 'Загрузка...';
        } else {
         this._popupSubmitButton.textContent = this._popupSubmitButtonText;
        }
      }
}