import zoomCard from './script.js';

  export default class Card {
    constructor(name, link, template) {
        this._name = name;
        this._link = link;
        this._template = template;
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._likeButton = this._cardElement.querySelector('.element__like-button');
        this._deleteButton = this._cardElement.querySelector('.element__delete-button');
      }
    _getTemplate() {
        const cardElement = this._template.content.cloneNode(true);
        return cardElement
    };
    _setEventListeners(deleteButton, likeButton, cardImage) {
      likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('element__like-button_active');
      });
      deleteButton.addEventListener('click', function () {
        deleteButton.parentElement.remove();
      });
      cardImage.addEventListener('click', function () {
        zoomCard(cardImage);
      });
    };
    generateCard() {
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._cardElement.querySelector('.element__title').textContent = this._name;
      this._setEventListeners(this._deleteButton, this._likeButton, this._cardImage);
      return this._cardElement
    }
}
