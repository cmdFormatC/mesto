import Card from './Card.js';
import FormValidator from './FormValidator.js';
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_zoom-image');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const popupInputProfileName = popupEditProfile.querySelector('.popup__input_profile_name');
const popupInputProfileDescription = popupEditProfile.querySelector('.popup__input_profile_description');
const popupProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const popupAddCloseButton = popupAddCard.querySelector('.popup__close-button');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button');
const popupScaledImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupInputCardUrl = popupAddCard.querySelector('.popup__input_card_url');
const popupInputCardName = popupAddCard.querySelector('.popup__input_card_name');
const popups = Array.from(document.querySelectorAll('.popup'));
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element');
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
const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
function createCard (item) {
  const card = new Card(item.name, item.link, elementTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}
function handleCardClick(name, link) {
  popupScaledImage.src = link;
  popupScaledImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}
initialCards.forEach((item) => {
  const cardElement = createCard (item);
  elements.append(cardElement);
});

const popupEditProfileValidation = new FormValidator(settings, popupEditProfileForm);
popupEditProfileValidation.enableValidation();
const popupAddCardValidation = new FormValidator(settings, popupAddCardForm);
popupAddCardValidation.enableValidation();
function submitEditProfileForm (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupInputProfileName.value; 
    profileJob.textContent = popupInputProfileDescription.value; 
    closePopup(popupEditProfile);
}
function openPopup(popup) {
  popup.classList.add("popup_opened");
  function handleButtonEsc(evt) {
    closePopupByButtonEsc(evt, popup);
  }
  document.addEventListener("keydown", handleButtonEsc);
  popup.handleButtonEsc = handleButtonEsc;
}

function closePopupByButtonEsc(evt, popup) {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", popup.handleButtonEsc);
}
function submitAddCardForm (evt) {
  evt.preventDefault();
  initialCards.push({
    name: popupInputCardName.value,
    link: popupInputCardUrl.value
  });
  const newCard = createCard(initialCards[initialCards.length - 1]);
  const firstElement = elements.firstChild.nextSibling;
  elements.insertBefore(newCard, firstElement); 
  closePopup(popupAddCard);
  evt.target.reset();
  popupAddCardValidation.resetValidation()
}
function openPopupProfileEdit() {
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileDescription.value = profileJob.textContent;
  openPopup(popupEditProfile);
  popupEditProfileValidation.resetValidation()

}


popups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  });
});
addButton.addEventListener('click', () => openPopup (popupAddCard));
editButton.addEventListener('click', openPopupProfileEdit);
popupEditProfileForm.addEventListener('submit', submitEditProfileForm);
popupProfileCloseButton.addEventListener('click', () => closePopup (popupEditProfile));
popupAddCloseButton.addEventListener('click', () => closePopup (popupAddCard));
popupImageCloseButton.addEventListener('click', () => closePopup (popupImage));
popupAddCardForm.addEventListener('submit', submitAddCardForm);
