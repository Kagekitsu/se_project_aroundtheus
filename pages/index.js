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

const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileAddForm = profileAddModal.querySelector(".modal__form");
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

const popups = [...document.querySelectorAll('.modal')];


function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener('keydown', closeModalWithKey);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener('keydown', closeModalWithKey);
}

const closeModalWithKey = (e) => {
  if (e.key === 'Escape') {
    const currentModal = document.querySelector('.modal_opened');
    closePopup(currentModal);
  }
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", () => {
    openPopup(previewImageModal);
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
  })

  cardTitleEl.textContent = cardData.name.trim();
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

function closePopupModal(popup) {
  popup.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('modal') ||
      e.target.classList.contains('modal__close')
    ) {
      closePopup(popup)
    }
  });
}

popups.forEach((modal) => {
  closePopupModal(modal);
});

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  const cardElement = getCardElement({
    name: profileNameInput.value,
    link: profileImageInput.value,
  });
  cardListEl.prepend(cardElement);
  closePopup(profileAddModal);

  profileAddForm.reset();
  const inputEls = [...profileAddForm.querySelectorAll(config.inputSelector)];
  const submitBtn = profileAddForm.querySelector(config.submitBtnSelector);
  toggleBtnState(inputEls, submitBtn, config);
};

profileEditBtn.addEventListener("click", () => {
  openPopup(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileAddBtn.addEventListener("click", () => {
  openPopup(profileAddModal)
});

popupImage.addEventListener("click", () => {
  openPopup(previewImageModal)
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileAddForm.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});