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
 profileTitleInput,
 profileDescription,
 profileEditButton,
 editImageButton,
 cardDelteModal,
 selectors,
} from '../utils/constants.js';

import api from '../utils/Api.js';

/* -------------------------------------------------------------------------- */
/*                               Popup w/ Image                               */
/* -------------------------------------------------------------------------- */

const cardPreview = new PopupWithImage({ popupSelector: '#preview-image-modal'});
cardPreview.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                 Create Card                                */
/* -------------------------------------------------------------------------- */

const renderCard = (data) => {
  const likes = data.likes || [];
  const cardElement = new Card(
    {
      data,
      handleImageClick: (imageData) => {
        cardPreview.open(imageData);
      },
      handleDeleteClick: () => {
        deleteModal.setSubmitAction(() => {
          deleteModal.renderLoading(true);
          const id = cardElement.getId();
          api
            .deleteCard(id)
            .then(() => {
              cardElement.deleteCard();
              deleteModal.close();
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              deleteModal.renderLoading(false);
            });
        });
        deleteModal.open();
      },

      handleLikeClick: () => {
        const id = cardElement.getId();
        if (cardElement.isLiked()) {
          api
            .removeLike(id)
            .then((data) => {
              cardElement.setLikes(data.likes);
            })
            .catch((err) => console.error(err));
        } else {
          api
            .likeCard(id)
            .then((data) => {
              cardElement.setLikes(data.likes);
            })
            .catch((err) => console.error(err));
        }
      },
      myId: userId,
    },
    selectors.cardTemplate
  );

  const newCard = cardElement.getView();
  cardSection.addItem(newCard);
};

/* -------------------------------------------------------------------------- */
/*                                 Delete Card                                */
/* -------------------------------------------------------------------------- */

const deleteModal = new PopupWithConfirmation({
  popupSelector: cardDelteModal,
  loadingText: "Deleting...",
});


/* -------------------------------------------------------------------------- */
/*                                  UserInfo                                  */
/* -------------------------------------------------------------------------- */

const user = new UserInfo(
  '.profile__title',
  '.profile__subtitle',
  '.profile__image'
);

/* -------------------------------------------------------------------------- */
/*                                     API                                    */
/* -------------------------------------------------------------------------- */

let cardSection;
let userId;

Promise.all([api.getUserInfo(), api.getCardList()])
  .then(([userData, data]) => {
    user.setUserInfo({
      title: userData.name,
      subtitle: userData.about,
    });
    user.setAvatarInfo(userData.avatar);
    userId = userData._id;
    cardSection = new Section(
      {
        items: data,
        renderer: renderCard,
      },
      selectors.cardSection
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

  /* -------------------------------------------------------------------------- */
  /*                       Popup w/ form New Card Creation                      */
  /* -------------------------------------------------------------------------- */

  const newCardPopup = new PopupWithForm({
    popupSelector: "#add-card-modal",
    handleFormSubmit: (inputValues) => {
      newCardPopup.renderLoading(true);
      api
        .addCard(inputValues)
        .then((inputValues) => {
          renderCard(inputValues);
          newCardPopup.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          newCardPopup.renderLoading(false);
        });
    },
    loadingText: "Saving...",
  });
  
  newCardPopup.setEventListeners();
  
  const editProfileModal = new PopupWithForm({
    popupSelector: "#profile-add-modal",
    handleFormSubmit: (inputValues) => {
      editProfileModal.renderLoading(true);
      api
        .updateUserInfo(inputValues.title, inputValues.subtitle)
        .then((response) => {
          user.setUserInfo({
            title: response.name,
            subtitle: response.about,
            avatar: response.avatar,
          });
          editProfileModal.close();
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        })
        .finally(() => {
          editProfileModal.renderLoading(false);
        });
    },
    loadingText: "Saving...",
  });
  
  editProfileModal.setEventListeners();
  
  editButtonAvatar.addEventListener("click", () => {
    avatarImageModal.open();
    profileImageValidator.resetValidation();
  });
  
  deleteModal.setEventListeners();
  
  const avatarImageModal = new PopupWithForm({
    popupSelector: "#modal-profile-image",
    handleFormSubmit: (inputValues) => {
      avatarImageModal.renderLoading(true);
      api
        .updateAvatar({ avatar: inputValues.link })
        .then((response) => {
          user.setAvatarInfo(response.avatar);
          avatarImageModal.close();
        })
        .catch(console.error)
        .finally(() => {
          avatarImageModal.renderLoading(false);
        });
    },
    loadingText: "Saving...",
  });
  
  avatarImageModal.setEventListeners();

  /* -------------------------------------------------------------------------- */
  /*                                    Popup                                   */
  /* -------------------------------------------------------------------------- */

const openEditPopupButton = document.querySelector("#profile-edit-button");
openEditPopupButton.addEventListener("click", () => {
  const userData = user.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescription.value = userData.subtitle;
  editFormValidator.resetValidation();
  editProfileModal.open();
});
const openAddPopupButton = document.querySelector(".profile__buttons-add");
openAddPopupButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  newCardPopup.open();
});

const profileImageSaveButton = document.querySelector(".modal__button_save");
const profileImage = document.querySelector("#modal-profile-image");
const editForm = document.querySelector("#profile-form");
const editFormValidator = new FormValidator(config, editForm);
editFormValidator.enableValidation();
const addCardFormElement = document.querySelector("#add-card-form");
const addFormValidator = new FormValidator(config, addCardFormElement);
addFormValidator.enableValidation();
const addProfileImageElement = document.querySelector("#profile-change-image");
const profileImageValidator = new FormValidator(config, addProfileImageElement);
profileImageValidator.enableValidation();
const deleteFormElement = document.querySelector("#modal-delete-form");
const deleteFormValidator = new FormValidator(config, deleteFormElement);
deleteFormValidator.enableValidation();