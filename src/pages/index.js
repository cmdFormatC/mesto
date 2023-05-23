import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Userinfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import '../pages/index.css';
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const popupInputProfileName = popupEditProfile.querySelector('.popup__input_profile_name');
const popupInputProfileDescription = popupEditProfile.querySelector('.popup__input_profile_description');
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

const userInfoSelectors = {
  userInfo: '.profile__description',
  userName: '.profile__name'
}

function createCard (item) {
  const card = new Card(item.name, item.link, '#element', cardPopup.open);
  const cardElement = card.generateCard();
  return cardElement
}

const section = new Section({
  items: initialCards,
  renderer: createCard
}, '.elements');

const submitEditProfileForm = (inputValues) => { 
  userInfo.setUserInfo(inputValues.profileName, inputValues.profileDescription)
  profilePopupWithForm.close();
}

const submitAddCardForm = (inputValues) => {
  section.addItem(createCard(inputValues))
  addPopupWithForm.close();
  popupAddCardValidation.resetValidation()
}

const userInfo = new Userinfo(userInfoSelectors);
const cardPopup = new PopupWithImage('.popup_zoom-image');
const profilePopupWithForm = new PopupWithForm('.popup_edit-profile', submitEditProfileForm)
const addPopupWithForm = new PopupWithForm('.popup_add-card', submitAddCardForm)

const popupEditProfileValidation = new FormValidator(settings, popupEditProfileForm);

popupEditProfileValidation.enableValidation();

const popupAddCardValidation = new FormValidator(settings, popupAddCardForm);



function openPopupProfileEdit() {
  const popupInputsValue = userInfo.getUserInfo()
  popupInputProfileName.value = popupInputsValue.userName;
  popupInputProfileDescription.value = popupInputsValue.userInfo;
  profilePopupWithForm.open();
  popupEditProfileValidation.resetValidation();

}

section.renderAll();
cardPopup.setEventListeners();
addPopupWithForm.setEventListeners()
profilePopupWithForm.setEventListeners()
addButton.addEventListener('click', () => {
  addPopupWithForm.open();
  popupAddCardValidation.enableValidation();
});
editButton.addEventListener('click', openPopupProfileEdit);




