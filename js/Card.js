import zoomCard from './script.js';

  export default class Card {
    constructor(name, link, template) {
        this._name = name;
        this._link = link;
        this._template = template;
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
      const card = this._getTemplate();
      const cardImage = card.querySelector('.element__image');
      const likeButton = card.querySelector('.element__like-button');
      const deleteButton = card.querySelector('.element__delete-button');
      cardImage.src = this._link;
      cardImage.alt = this._name;
      card.querySelector('.element__title').textContent = this._name;
      this._setEventListeners(deleteButton, likeButton, cardImage);
      return card
    }
}
