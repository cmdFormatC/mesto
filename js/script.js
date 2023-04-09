const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup-mesto');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
let popupInputProfileName = popupEditProfile.querySelector('.popup__input_profile_name');
let popupInputProfileDescription = popupEditProfile.querySelector('.popup__input_profile_description');
const popupProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const popupAddCloseButton = popupAddCard.querySelector('.popup__close-button');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button');
const popupScaledImage = popupImage.querySelector('.popup-mesto__image');
const popupImageCaption = popupImage.querySelector('.popup-mesto__caption');
let popupInputCardUrl = popupAddCard.querySelector('.popup__input_card_url');
let popupInputCardName = popupAddCard.querySelector('.popup__input_card_name');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
const element = document.querySelector('#element').content;
initialCards.forEach(function (createCard) {
    const mestoElement = element.cloneNode(true);
    mestoElement.querySelector('.element__image').src = createCard.link;
    mestoElement.querySelector('.element__image').alt = createCard.name;
    mestoElement.querySelector('.element__title').textContent = createCard.name;
    elements.append(mestoElement);

})
function profileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupInputProfileName.value; 
    profileJob.textContent = popupInputProfileDescription.value; 
    closePopup(popupEditProfile);
}
function openPopup (popup) {
    const openButton = popup.target;
    if (openButton.classList.contains('profile__edit-button') === true) {
        popupEditProfile.classList.remove('popup_closed');
        popupInputProfileName.value = profileName.textContent;
        popupInputProfileDescription.value = profileJob.textContent;
    } else if (openButton.classList.contains('profile__add-button') === true) {
        popupAddCard.classList.remove('popup_closed');
    } else if (openButton.classList.contains('element__image') === true) {
        popupImage.classList.remove('popup_closed');
        popupScaledImage.src = openButton.src;
        popupImageCaption.textContent = openButton.parentNode.querySelector('.element__title').textContent;
    } 
}
function closePopup (popup) {
    if (popup.classList.contains('popup_edit-profile') === true) {
        popupEditProfile.classList.add('popup_closed');
    } else if (popup.classList.contains('popup_add-card') === true) {
        popupAddCard.classList.add('popup_closed');
    } else if (popup.classList.contains('popup_image') === true) {
        popupImage.classList.add('popup_closed');
    }
}

function createCard (evt) {
    evt.preventDefault();
    let card = document.querySelector('.element').cloneNode(true);
    const firstElement = elements.firstChild.nextSibling;
    card.querySelector('.element__image').src = popupInputCardUrl.value;
    card.querySelector('.element__title').textContent = popupInputCardName.value;
    elements.insertBefore(card, firstElement);
    closePopup(popupAddCard);
    popupInputCardUrl.value = '';
    popupInputCardName.value = '';
}


function handleClick(e) {
    let elementButton = e.target;
    if (elementButton.classList.contains('element__like-button_active') === true) {
        elementButton.classList.remove('element__like-button_active');
    } else if (elementButton.classList.contains('element__like-button') === true) {
        elementButton.classList.add('element__like-button_active');
    } else if (elementButton.classList.contains('element__delete-button') === true) {
        let deletedElement = e.target.parentElement;
        deletedElement.remove();
    } 
  }
elements.addEventListener('click', handleClick);
addButton.addEventListener('click', openPopup);
editButton.addEventListener('click', openPopup);
popupEditProfileForm.addEventListener('submit', profileFormSubmit);
popupProfileCloseButton.addEventListener('click', () => closePopup (popupEditProfile));
popupAddCloseButton.addEventListener('click', () => closePopup (popupAddCard));
popupImageCloseButton.addEventListener('click', () => closePopup (popupImage));
elements.addEventListener('click', openPopup);
popupAddCardForm.addEventListener('submit', createCard);