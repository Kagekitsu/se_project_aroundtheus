import Popup from '../components/Popup.js';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { openPopup, closePopup } from "../utils/utils.js";
import '../pages/index.css';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js'
import {
  initialCards,
  validationSettings,
  profileEditModal,
  profileAddModal,
  profileEditBtn,
  profileAddBtn,
  profileTitle,
  profileDescription,
  profileDescriptionInput,
  profileTitleInput,
  cardListEl,
  previewImageModal,
} from '../utils/constants.js';

/* -------------------------------------------------------------------------- */
/*                               Form Validator                               */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(validationSettings, profileEditModal);
const addFormValidator = new FormValidator(validationSettings, profileAddMOdal);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const cardList = {
  addItem: (cardElement) => {
    cardListEl.append(cardElement);
  },
};

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  popupWithForm.close();
}

function handleProfileAddSubmit(e) {
  e.preventDefault();

  const cardData = {
    name: profileNameInput.value,
    link: profileImageInput.value,
  };

  createCard(cardData);

  closePopup(profileAddModal);

  profileAddForm.reset();
  addFormValidator.resetValidation();
}

function createCard(cardData) {
  const card = new Card(cardData, _handleCardClick);
  const cardElement = card.getView();
  cardList.addItem(cardElement);
}

function _handleCardClick(link, name) {
  openPopup(previewImageModal);
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
}

profileEditBtn.addEventListener("click", () => {
  Popup.open(profileEditForm);
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
});

profileAddBtn.addEventListener("click", () => {
  openPopup(profileAddModal);
});

profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  popupWithForm.setSubmitHandler((formValues) => {
    handleProfileEditSubmit(formValues);
  });
  popupWithForm.open();
});

profileAddForm.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((cardData) => {
  createCard(cardData);
});

const popupSelectors = ["#profile-edit-modal", profileAddModal];
const popups = {};
popupSelectors.forEach((modal) => {
  const popup = new PopupWithForm(modal);
  // add popup to object
});