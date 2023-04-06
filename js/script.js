const popup = document.querySelector('.popup');
const popopContainer = document.querySelector('#popup').content;
const openButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
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
const popupMesto = document.querySelector('#popupMesto').content;
initialCards.forEach(function (createCard) {
    const mestoElement = element.cloneNode(true);
    mestoElement.querySelector('.element__image').src = createCard.link;
    mestoElement.querySelector('.element__title').textContent = createCard.name;
    elements.append(mestoElement);

})
function popupCreate(el) {
    const addPopup = popopContainer.cloneNode(true);
    popup.classList.remove('popup_closed');
    if (el.target.classList.contains('profile__edit-button') === true) {
        addPopup.querySelector('#inputOne').value = profileName.textContent;
        addPopup.querySelector('#inputTwo').value = job.textContent;
        addPopup.querySelector('#inputOne').classList.add('popup__input_profile_name');
        addPopup.querySelector('#inputTwo').classList.add('popup__input_profile_description');
        addPopup.querySelector('.popup__title').textContent = 'Редактировать профиль';
        addPopup.querySelector('.popup__button').textContent = 'Сохранить';
        popup.append(addPopup);
        const closeButton = document.querySelector('.popup__close-button');
        const formElement = document.querySelector('.popup__form');
        function handleFormSubmit (evt) {
            let nameInput = formElement.querySelector('.popup__input_profile_name');
            let jobInput = formElement.querySelector('.popup__input_profile_description');
            evt.preventDefault();
            profileName.textContent = nameInput.value;
            job.textContent = jobInput.value;
            popupClose()
        }
        closeButton.addEventListener('click', popupClose);
        formElement.addEventListener('submit', handleFormSubmit);
    } else if (el.target.classList.contains('profile__add-button') === true) {
        addPopup.querySelector('#inputOne').placeholder = 'Название';
        addPopup.querySelector('#inputTwo').placeholder = 'Ссылка на картинку';
        addPopup.querySelector('#inputOne').classList.add('popup__input_element_name');
        addPopup.querySelector('#inputTwo').classList.add('popup__input_element_url');
        addPopup.querySelector('.popup__title').textContent = 'Новое место';
        addPopup.querySelector('.popup__button').textContent = 'Создать';
        popup.append(addPopup);
        const closeButton = document.querySelector('.popup__close-button');
        const formElement = document.querySelector('.popup__form');
        function handleFormSubmit (evt) {
            let nameInput = formElement.querySelector('.popup__input_element_name');
            let urlInput = formElement.querySelector('.popup__input_element_url');
            evt.preventDefault();
            const mestoElement = element.cloneNode(true);
            mestoElement.querySelector('.element__image').src = urlInput.value;
            mestoElement.querySelector('.element__title').textContent = nameInput.value;
            elements.prepend(mestoElement);
            popupClose();
        }
        formElement.addEventListener('submit', handleFormSubmit);
        closeButton.addEventListener('click', popupClose);
    }
}
function popupClose() {
    popup.classList.add('popup_closed');
    let child = popup.querySelector('.popup__container');
    child.remove();
}
function popupMestoClose() {
    popup.classList.add('popup_closed');
    let child = popup.querySelector('.popup-mesto__container');
    child.remove();
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
    } else if (elementButton.classList.contains('element__image') === true) {
        const addPopup = popupMesto.cloneNode(true);
        popup.classList.remove('popup_closed');
        let selectedItem = e.target.parentElement;
        popopCaption = selectedItem.querySelector('.element__title').textContent;
        addPopup.querySelector('.popup-mesto__image').src = elementButton.src;
        addPopup.querySelector('.popup-mesto__caption').textContent = popopCaption;
        popup.append(addPopup);
        const closeButton = document.querySelector('.popup__close-button');
        closeButton.addEventListener('click', popupMestoClose);
    } 
  }
elements.addEventListener('click', handleClick);
openButton.addEventListener('click', popupCreate);
addButton.addEventListener('click', popupCreate);