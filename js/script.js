let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let openButton = document.querySelector('.profile__edit-button');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__description');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');
let likeButton = ''
const elements = document.querySelector('.elements');
function popupClose() {
    popup.classList.add('closed');
}

function popupOpen() {
    popup.classList.remove('closed');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupClose()
}

function handleClick(e) {
    likeButton = e.target
    if (likeButton.classList.contains('element__like-button_active') === true) {
        likeButton.classList.remove('element__like-button_active');
    } else if (likeButton.classList.contains('element__like-button') === true) {
        likeButton.classList.add('element__like-button_active');
    }
  }
elements.addEventListener('click', handleClick);


openButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', handleFormSubmit);