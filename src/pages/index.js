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
  profileTitle,
  profileDescriptionInput,
  profileTitleInput,
  profileDescription,
  cardListEl,
  previewImageModal,
} from '../utils/constants.js';

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

const editProfilePopup = new PopupWithForm(profileEditModal, (elementObject) => {
  userInfo.setUserInfo(elementObject.name, elementObject.description);
  editProfilePopup.close()
});

profileEditBtn.addEventListener('click', openProfilePopup);

function openProfilePopup() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitleInput.value = profileName;
  profileDescriptionInput.value = description;
  editFormValidator._toggleButtonState();
  editProfilePopup.open();
}

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

profileAddBtn.addEventListener('click', () => {
  addFormValidator._toggleButtonState();
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

previewImagePopup.setEventListeners();