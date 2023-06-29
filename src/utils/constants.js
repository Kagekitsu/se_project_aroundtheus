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

export const avatarImageElement = document.querySelector(".profile__image");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const addNewCardButton = document.querySelector(".profile__add-button");
export const cardListEl = document.querySelector(".cards__list");
export const cardTitleInput = document.querySelector("#add-name-input");
export const cardUrlInput = document.querySelector("#add-url-input");
export const avatarEditButton = document.querySelector(".profile__image-edit");
export const avatarModal = document.querySelector("#edit-avatar-modal");
export const avatarModalCloseButton = document.querySelector(
  "#edit-avatar-modal-close-button"
);
export const avatarForm = document.querySelector("#edit-avatar-form");
export const avatarUrlInput = document.querySelector("#avatar-url-input");
export const addModalCreateButton = document.getElementById(
  "profile-create-button"
);