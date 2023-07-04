export const initialCards = [
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
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

export const profileEditModal = document.querySelector('#profile-edit-modal');
export const cardModal = document.querySelector('#profile-add-modal');
export const profileAvatarModal = document.querySelector('#edit-avatar-modal');
export const deleteCardModal = document.querySelector('#delete-modal');
export const profileEditButton = document.querySelector('#profile-edit-button');
export const inputSelector = '.modal__input'
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__image');
export const profileDescriptionEl = document.querySelector('#profile-description-input');
export const profileTitleEl = document.querySelector('#profile-title-input');
export const cardTemplate = '#card-template';
export const addNewCardButton = document.querySelector('#profile-add-button');
export const profileAvatarIcon = document.querySelector('#profile-edit-button');
export const cardListEl = document.querySelector('.cards__list');
export const previewImageModal = document.querySelector('#preview-image-modal');


export const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button-inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};