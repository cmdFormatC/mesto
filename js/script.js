const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
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
const popoups = Array.from(document.querySelectorAll('.popup'));
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
function createCard (url, cardName) {
  const card = element.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  cardImage.src = url;
  cardImage.alt = cardName;
  card.querySelector('.element__title').textContent = cardName;
  return card
}
initialCards.forEach(function (createCards) {
    const card = createCard(createCards.link, createCards.name);
    elements.append(card);
});
function submitEditProfileForm (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupInputProfileName.value; 
    profileJob.textContent = popupInputProfileDescription.value; 
    closePopup(popupEditProfile);
}
function openPopup (popup) {
    popup.classList.add('popup_opened');
}
function closePopup (popup) {
    popup.classList.remove('popup_opened');
}


function submitAddCardForm (evt) {
  evt.preventDefault(); 
  const newCard = createCard (popupInputCardUrl.value, popupInputCardName.value);
  const firstElement = elements.firstChild.nextSibling;
  elements.insertBefore(newCard, firstElement); 
  closePopup(popupAddCard);
  popupInputCardUrl.value = '';
  popupInputCardName.value = '';
}
function openPopupProfileEdit() {
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileDescription.value = profileJob.textContent;
  openPopup(popupEditProfile);
}
function zoomCard(elementButton) {
  popupScaledImage.src = elementButton.src;
  const cardName = elementButton.parentNode.querySelector('.element__title').textContent;
  popupScaledImage.alt = cardName;
  popupImageCaption.textContent = cardName;
  openPopup(popupImage);
}

function handleClick(e) {
    const elementButton = e.target;
    if (elementButton.classList.contains('element__like-button_active')) {
        elementButton.classList.remove('element__like-button_active');
    } else if (elementButton.classList.contains('element__like-button')) {
        elementButton.classList.add('element__like-button_active');
    } else if (elementButton.classList.contains('element__delete-button')) {
        const deletedElement = e.target.parentElement;
        deletedElement.remove();
    } else if (elementButton.classList.contains('element__image')) {
      zoomCard(elementButton);
  } 
  }
popoups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
});
elements.addEventListener('click', handleClick);
addButton.addEventListener('click', () => openPopup (popupAddCard));
editButton.addEventListener('click', openPopupProfileEdit);
popupEditProfileForm.addEventListener('submit', submitEditProfileForm);
popupProfileCloseButton.addEventListener('click', () => closePopup (popupEditProfile));
popupAddCloseButton.addEventListener('click', () => closePopup (popupAddCard));
popupImageCloseButton.addEventListener('click', () => closePopup (popupImage));
popupAddCardForm.addEventListener('submit', submitAddCardForm);