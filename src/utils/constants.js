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
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

 const profileEditModal = document.querySelector('#profile-edit-modal');
 const profileEditButton = document.querySelector('#profile-edit-button');
 const profileModalCloseBtn = profileEditModal.querySelector('.modal__close');
 const profileEditForm = profileEditModal.querySelector('.modal__form');
 const profileTitleEl = document.querySelector('#profile-title-input');
 const profileDescriptionEl = document.querySelector('#profile-description-input');
 const cardModal = document.querySelector('#profile-add-modal');
 const cardModalBtn = document.querySelector('#profile-add-button')
 const cardModalForm = cardModal.querySelector('#profile-add-form');
 const previewImageModal = document.querySelector('#preview-image-modal');
 const previewImageModalCloseBtn = previewImageModal.querySelector('.modal__close');
 const avatarForm = document.querySelector('#edit-avatar-form"');

 const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button-inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

export function handleOverlayClose(e) {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target);
  }
}

export function handleEscUp(e) {
  e.preventDefault();
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".modal_opened");
    closeModal(openPopup);
  }
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", handleOverlayClose);
  document.addEventListener("keyup", handleEscUp);
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", handleOverlayClose);
  document.removeEventListener("keyup", handleEscUp);
}

export {
  settings,
  previewImageModalCloseBtn,
  previewImageModal,
  profileModalCloseBtn,
  profileDescriptionEl,
  profileTitleEl,
  profileEditForm,
  cardModal,
  cardModalBtn,
  profileEditButton,
  cardModalForm ,
  avatarForm,
}