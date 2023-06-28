import '../pages/index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
  initialCards,
  validationSettings,
  profileEditModal,
  profileAddModal,
  profileEditBtn,
  profileAddBtn,
  profileDescriptionInput,
  profileTitleInput,
  cardListEl,
  previewImageModal,
} from '../utils/constants.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/cohort-3-en',
  headers: {
    Authorization: 'd8b9199f-b9d7-4b7f-ad09-c5597d55941e',
    "Content-Type": "application/json"
  }
});

api.getInitialCards()
.then((cards) => {
  console.log(cards)
})



/* -------------------------------------------------------------------------- */
/*                               Form Validator                               */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(validationSettings, profileEditModal);
const addFormValidator = new FormValidator(validationSettings, profileAddModal);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                   Profile                                  */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  nameSelector: '.profile__title', 
  jobSelector: '.profile__description'
});

const editProfilePopup = new PopupWithForm(profileEditModal, ({ title, description }) => {
  userInfo.setUserInfo({ title, job: description });
  editProfilePopup.close();
});

profileEditBtn.addEventListener('click', openProfilePopup);

function openProfilePopup() {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  editFormValidator.toggleButtonState();
  editProfilePopup.open();
}

editProfilePopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                Section Class                               */
/* -------------------------------------------------------------------------- */

const cardListSection = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const newCard = createCard({ name, link });
      cardListSection.addItem(newCard);
    },
  },
  cardListEl
);

cardListSection.renderItems();

/* -------------------------------------------------------------------------- */
/*                                PopupWithForm                               */
/* -------------------------------------------------------------------------- */

const newCardPopup = new PopupWithForm(profileAddModal, submitCard);
const previewImagePopup = new PopupWithImage(previewImageModal);
previewImagePopup.setEventListeners();

profileAddBtn.addEventListener('click', () => {
  addFormValidator.toggleButtonState();
  newCardPopup.open();
})

 newCardPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                Card Function                               */
/* -------------------------------------------------------------------------- */

function createCard ({ name, link }) {
  const cardElement = new Card ({ name, link}, '#card-template', ({ name, link }) => {
    previewImagePopup.open({ name, link});
  });
  return cardElement.generateCard();
} 

function submitCard({ title, url }) {
  const newCardData = { name: title, link: url };
  const newCard = createCard(newCardData);
  cardListSection.prependItem(newCard);
  newCardPopup.close();
}