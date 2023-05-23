export default class Card {
    constructor(name, link, template, handleCardClick) {
        this._name = name;
        this._link = link;
        this._template = template;
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._likeButton = this._cardElement.querySelector('.element__like-button');
        this._deleteButton = this._cardElement.querySelector('.element__delete-button');
        this._handleCardClick = handleCardClick;
      }
    _getTemplate() {
        const cardElement = this._template.content.cloneNode(true);
        return cardElement
    };
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        this._likeButton.classList.toggle('element__like-button_active');
      });
      this._deleteButton.addEventListener('click', () => {
        this._deleteButton.parentElement.remove();
      });
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link)
      });
    };
    generateCard() {
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._cardElement.querySelector('.element__title').textContent = this._name;
      this._setEventListeners();
      return this._cardElement
    }
}
