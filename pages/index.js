import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { openPopup, closePopup } from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddBtn = document.querySelector("#profile-add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileCloseBtn = profileEditModal.querySelector(".modal__close");
const profileAddCloseBtn = profileAddModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = document.querySelector("#modal-edit-form");
const profileAddForm = document.querySelector("#modal-add-form");
const profileName = document.querySelector(".card__title");
const profileImage = document.querySelector(".card__description");
const profileNameInput = profileAddModal.querySelector("#add-name-input");
const profileImageInput = profileAddModal.querySelector("#add-url-input");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cardListEl = document.querySelector(".cards__list");
const previewImageModal = document.querySelector("#preview-image-modal");
const popupImage = previewImageModal.querySelector(".modal__image");
const popupCaption = previewImageModal.querySelector(".modal__caption");
const previewImgCloseBtn = previewImageModal.querySelector(".modal__close");

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(validationSettings, profileEditForm);
const addFormValidator = new FormValidator(validationSettings, profileAddForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
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
  const card = new Card(cardData, handleCardClick);
  const cardElement = card.getView();

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardListEl.prepend(cardElement);
}

function handleCardClick(link, name) {
  openPopup(previewImageModal);
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
}


profileEditBtn.addEventListener("click", () => {
  openPopup(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileAddBtn.addEventListener("click", () => {
  openPopup(profileAddModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileAddForm.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((cardData) => {
  createCard(cardData);
});

const popups = [profileEditModal, profileAddModal, previewImageModal];

popups.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal") ||
      e.target.classList.contains("modal__close")
    ) {
      closePopup(modal);
    }
  });
});
