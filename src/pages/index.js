import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Userinfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import '../pages/index.css';
let userId;
const avatarSelector = document.querySelector('.profile__avatar')
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__avatar-edit');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupUpdateAvatar = document.querySelector('.popup_update-avatar');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const popupUpdateAvatarForm = popupUpdateAvatar.querySelector('.popup__form');
const popupInputProfileName = popupEditProfile.querySelector('.popup__input_profile_name');
const popupInputProfileDescription = popupEditProfile.querySelector('.popup__input_profile_description');
const userInfoSelectors = {
  userInfo: '.profile__description',
  userName: '.profile__name',
};
const elementContainer = document.querySelector('.elements');
const userInfo = new Userinfo(userInfoSelectors);
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '5bdde285-08ff-4c09-bc6a-dd3c3893d978',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
.then((result) => {
  userInfo.setUserInfo(result.name, result.about);
  avatarSelector.src = result.avatar;
  userId = result._id;
})
.then(() => {
  api.getInitialCards()
  .then((result) => {
    return result.map((item) => {
        return {
            name: item["name"],
            link: item["link"],
            likes: item["likes"],
            ownerId: item["owner"]._id,
            cardId: item["_id"],
            currentUserId: userId
        }
    })
  })
  .then((data) => {
    const section = new Section({
      items: data,
      renderer: createCard,
      currentUserid: userId
    });
    section.renderAll();
    })
    .catch((error) => {
      console.error(error); 
    });
})
.catch((error) => {
  console.error(error); 
});

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

function createCard (item) {
  const card = new Card(item, '#element', cardPopup.open, likeToggle, (id) => {
    popupDeleteCard.open(id);
  });
  const cardElement = card.generateCard();
  elementContainer.append(cardElement);
}

const section = new Section({
  items: [],
  renderer: createCard
}, '.elements');

const submitDeleteCard = (cardId) => {
  popupDeleteCard.renderLoading(true);
  api.deleteCard(cardId)
  .then(() => {
    document.getElementById(cardId).remove();
    popupDeleteCard.close();
  })
  .catch((err) =>{
    console.error(err);
  })
  .finally(() => {
    popupDeleteCard.renderLoading(false);
  })
};

const submitEditProfileForm = (inputValues) => {
  profilePopupWithForm.renderLoading(true);
  api.editProfile(inputValues)
  .then(() => {
    userInfo.setUserInfo(inputValues.profileName, inputValues.profileDescription);
    profilePopupWithForm.close();
  })
  .catch((err) =>{
    console.error(err);
  })
  .finally(() => {
    profilePopupWithForm.renderLoading(false);
  })
};

const likeToggle = (isLiked, counterElement, cardId) => {
  api.togglelike(cardId, isLiked)
  .then((res) => {
    counterElement.textContent = res.likes.length
  })
  .catch((err) =>{
    console.error(err);
  })
};

const submitAddCardForm = (inputValues) => {
  addPopupWithForm.renderLoading(true);
  api.addCard(inputValues)
  .then((res) => {
    inputValues.cardId = res._id;
    section.addItem(createCard(inputValues))
    addPopupWithForm.close();
    popupAddCardValidation.resetValidation()
  })
  .catch((err) =>{
    console.error(err);
  })
  .finally(() => {
    addPopupWithForm.renderLoading(false);
  })
};

const submitUpdateAvatarForm = (inputValues) => {
  avatarPopupWithForm.renderLoading(true);
  api.updateAvatar(inputValues.link)
  .then(() => {
    avatarSelector.src = inputValues.link;
    avatarPopupWithForm.close();
  })
  .catch((err) =>{
    console.error(err);
  })
  .finally(() => {
    avatarPopupWithForm.renderLoading(false);
  })
};

const popupDeleteCard = new PopupWithConfirmation('.popup_delete-card', submitDeleteCard);
const cardPopup = new PopupWithImage('.popup_zoom-image');
const profilePopupWithForm = new PopupWithForm('.popup_edit-profile', submitEditProfileForm);
const addPopupWithForm = new PopupWithForm('.popup_add-card', submitAddCardForm);
const avatarPopupWithForm = new PopupWithForm('.popup_update-avatar', submitUpdateAvatarForm);

const popupEditProfileValidation = new FormValidator(settings, popupEditProfileForm);
const popupUpdateAvatarValidation = new FormValidator(settings, popupUpdateAvatarForm);
popupEditProfileValidation.enableValidation();
popupUpdateAvatarValidation.enableValidation();
const popupAddCardValidation = new FormValidator(settings, popupAddCardForm);

function openPopupProfileEdit() {
  const popupInputsValue = userInfo.getUserInfo()
  popupInputProfileName.value = popupInputsValue.userName;
  popupInputProfileDescription.value = popupInputsValue.userInfo;
  profilePopupWithForm.open();
  popupEditProfileValidation.resetValidation();

}

popupDeleteCard.setEventListeners();
cardPopup.setEventListeners();
addPopupWithForm.setEventListeners();
avatarPopupWithForm.setEventListeners();
profilePopupWithForm.setEventListeners();
addButton.addEventListener('click', () => {
  addPopupWithForm.open();
});
editButton.addEventListener('click', openPopupProfileEdit);
editAvatarButton.addEventListener('click', () => {
  avatarPopupWithForm.open();
});



