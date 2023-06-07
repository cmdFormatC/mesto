export default class Card {
    constructor(item, template, handleCardClick, handleLikeToggle, handleCardDeleteClick) {
        this._name = item.name;
        this._cardId= item.cardId;
        this._link = item.link;
        this._template = template;
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._likeButton = this._cardElement.querySelector('.element__like-button');
        this._deleteButton = this._cardElement.querySelector('.element__delete-button');
        this._likes = item.likes;
        this._likeCounter = this._cardElement.querySelector('.element__like-counter');
        this._handleCardClick = handleCardClick;
        this._handleCardDeleteClick = handleCardDeleteClick;
        this._currentUserId = item.currentUserId;
        this._ownerId = item.ownerId;
        this._handleLikeToggle = handleLikeToggle;
      }
    _getTemplate() {
        const cardElement = document.querySelector(this._template).content.cloneNode(true);
        return cardElement
    };
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        let isLiked = this._likeButton.classList.toggle('element__like-button_active');
        this._handleLikeToggle(isLiked, this._likeCounter, this._cardId)
      });
      this._deleteButton.addEventListener('click', () => {
        this._handleCardDeleteClick(this._cardId);
      });
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link)
      });
    };
    generateCard() {
      if (this._currentUserId != this._ownerId) {
        this._deleteButton.remove();
      }
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._likeCounter.textContent = this._likes.length;
      this._cardElement.querySelector('.element__title').textContent = this._name;
      const elementDiv = this._cardElement.querySelector('.element');
      elementDiv.setAttribute('id', this._cardId);
      this._setEventListeners();
      return this._cardElement
    }
}
