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
    popup.classList.add('popup_opened');
}
function closePopup (popup) {
    popup.classList.remove('popup_opened');
    popup.setAttribute("style",  "transition: visibility 0.3s, opacity 0.3s linear;");
}

function createCard () {
    const card = document.querySelector('.element').cloneNode(true);
    card.querySelector('.element__image').src = popupInputCardUrl.value;
    card.querySelector('.element__image').alt = popupInputCardName.value;
    card.querySelector('.element__title').textContent = popupInputCardName.value;
    return card
}
function addFormSubmit (evt) {
  evt.preventDefault(); 
  const newCard = createCard ();
  const firstElement = elements.firstChild.nextSibling;
  console.log(newCard)
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
function zoomCard(e) {
  if (e.target.classList.contains('element__image') === true) {
    popupScaledImage.src = e.target.src;
    popupImageCaption.textContent = e.target.parentNode.querySelector('.element__title').textContent;
    openPopup(popupImage);
  }
}

function handleClick(e) {
    const elementButton = e.target;
    if (elementButton.classList.contains('element__like-button_active') === true) {
        elementButton.classList.remove('element__like-button_active');
    } else if (elementButton.classList.contains('element__like-button') === true) {
        elementButton.classList.add('element__like-button_active');
    } else if (elementButton.classList.contains('element__delete-button') === true) {
        const deletedElement = e.target.parentElement;
        deletedElement.remove();
    } 
  }
elements.addEventListener('click', handleClick);
addButton.addEventListener('click', () => openPopup (popupAddCard));
editButton.addEventListener('click', openPopupProfileEdit);
popupEditProfileForm.addEventListener('submit', profileFormSubmit);
popupProfileCloseButton.addEventListener('click', () => closePopup (popupEditProfile));
popupAddCloseButton.addEventListener('click', () => closePopup (popupAddCard));
popupImageCloseButton.addEventListener('click', () => closePopup (popupImage));
elements.addEventListener('click', zoomCard);
popupAddCardForm.addEventListener('submit', addFormSubmit);