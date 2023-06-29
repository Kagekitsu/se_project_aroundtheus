import '../pages/index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithConfirmation from '../components/PopupWithConfirm';
import {
  avatarImageElement,
  profileTitle,
  profileDescription,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  addNewCardButton,
  cardListEl,
  cardTitleInput,
  cardUrlInput,
  avatarEditButton,
  avatarModal,
  avatarModalCloseButton,
  avatarForm,
  avatarUrlInput,
  addModalCreateButton,
  initialCards
} from '../utils/constants.js'

import Api from '../components/Api.js';

fdfsdfsdfvdsfdsfadsfadsv adsgfadsvadsv avadsfvadsv adsfvadsvadsv avasdvasdv avdas

let userId;
let userInfo;
let cardList;

/* -------------------------------------------------------------------------- */
/*                                API                                         */
/* -------------------------------------------------------------------------- */

api
.loadData()
.then(({ userInfo: userInfoData, initialCards }) => {
  userInfo = new UserInfo({
    nameSelector: '.profile__title',
    jobSelector: '.profile__description',
    avatarSelector: '.profile__image'
  })
});

userInfo.setUserInfo(userInfoData.name, userInfoData.about);
userInfo.setAvatar(userInfoData.avatar);
userId = userInfoData._id;

/* -------------------------------------------------------------------------- */
/*                                  Card List                                 */
/* -------------------------------------------------------------------------- */

cardList = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData, userId);
      cardList.addItem(cardElement);
    },
  },
  ".card__list"
);

cardList.renderItems(initialCards);

/* -------------------------------------------------------------------------- */
/*                              Profile Edit Form                             */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(formData) {
  profileEditPopup.renderLoading(true);

  const nameInput = profileTitleInput;
  const jobInput = profileDescriptionInput;

  api
    .editProfile(nameInput.value, jobInput.value)
    .then((updatedInfo) => {
      userInfo.setUserInfo(
        updatedInfo.name,
        updatedInfo.about,
        userInfo.getAvatar()
      );
      profileEditPopup.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      profileEditPopup.renderLoading(false); 
    });
}

/* -------------------------------------------------------------------------- */
/*                                 Avatar Form                                */
/* -------------------------------------------------------------------------- */

function handleAvatarFormSubmit(formData) {
  avatarPopup.renderLoading(true);

  api
    .updateAvatar(formData.avatar)
    .then(() => {
      userInfo.setAvatar(formData.avatar);
      avatarPopup.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
}

/* -------------------------------------------------------------------------- */
/*                                Add Card Form                               */
/* -------------------------------------------------------------------------- */

function handleAddCardFormSubmit(formData) {
  addCardPopup.renderLoading(true);

  api

    .addCard(formData.name, formData.link)

    .then((newCardData) => {
      if (newCardData && newCardData._id) {
        const cardElement = createCard(newCardData, userId);
        cardList.addItem(cardElement);

        addCardPopup.close();
      } else {
        throw new Error("Invalid card data received from the server");
      }
    })

    .catch((error) => {
      console.error(`Failed to add card: ${error}`);
    })

    .finally(() => {
      addCardPopup.renderLoading(false);
    });
}

/* -------------------------------------------------------------------------- */
/*                                Card Deletion                               */
/* -------------------------------------------------------------------------- */

function handleCardDelete(cardId) {
  console.trace(`handleCardDelete called with ID: ${cardId}`);
  console.log("cardId", cardId);

  // Open the confirmation popup before deleting the card
  deleteCardPopup.open(cardId);

  deleteCardPopup.setConfirmHandler(() => {
    // Show loading
    deleteCardPopup.renderLoading(true);

    api
      .deleteCard(cardId)
      .then(() => {
        console.log(`Deleted card with ID: ${cardId}`);
        cardList.removeItem(cardId);
        deleteCardPopup.close();
      })
      .catch((error) => {
        console.error(`Failed to delete card: ${error}`);
      })
      .finally(() => {
        // Hide loading
        deleteCardPopup.renderLoading(false);
      });
  });
}

/* -------------------------------------------------------------------------- */
/*                                Adding Cards                                */
/* -------------------------------------------------------------------------- */

function createCard(cardData, userId) {
  const card = new Card(
    cardData,
    "#card-template",
    openImageModal,
    handleCardLike,
    handleCardDelete,
    userId,
    cardList
  );

  const cardElement = card.generateCard();

  return cardElement;
}

function openImageModal(cardData) {
  imagePopup.open(cardData);
}

/* -------------------------------------------------------------------------- */
/*                                  Card Like                                 */
/* -------------------------------------------------------------------------- */

function handleCardLike(card) {
  if (card.isLiked()) {
    api
      .removeLike(card._id)
      .then((updatedCardData) => {
        card.updateLikes(updatedCardData.likes);
        return updatedCardData;
      })
      .catch((error) => {
        console.error(`Failed to remove like: ${error}`);
      });
  } else {
    api
      .addLike(card._id)
      .then((updatedCardData) => {
        card.updateLikes(updatedCardData.likes);
        return updatedCardData;
      })
      .catch((error) => {
        console.error(`Failed to add like: ${error}`);
      });
  }
}

avatarEditButton.addEventListener("click", () => avatarPopup.open());

profileEditButton.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();
  profileTitleInput.value = profileInfo.name;
  profileDescriptionInput.value = profileInfo.job;
  profileEditFormValidator.resetValidation();
  profileEditPopup.open();
});

avatarModalCloseButton.addEventListener("click", () => {
  avatarPopup.close();
});

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                               Form Validation                              */
/* -------------------------------------------------------------------------- */

const formConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileEditFormValidator = new FormValidator(
  formConfig,
  document.querySelector("#profile-edit-modal form")
);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  formConfig,
  document.querySelector("#add-modal form")
);
addCardFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                               Popup Instances                              */
/* -------------------------------------------------------------------------- */

const avatarPopup = new PopupWithForm(
  "#edit-avatar-modal",
  handleAvatarFormSubmit,
  "Saving..."
);
avatarPopup.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  "Saving..."
);
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  "#add-modal",
  handleAddCardFormSubmit,
  "Saving..."
);
addCardPopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#delete-modal");

deleteCardPopup.setEventListeners();

const imagePopup = new PopupWithImage("#preview__image-modal");
imagePopup.setEventListeners();