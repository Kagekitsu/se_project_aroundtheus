import './index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
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
  cardModalForm,
  avatarForm,
} from '../utils/constants';
import Api from '../utils/Api';

const userInfoEl = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

/* -------------------------------------------------------------------------- */
/*                                     Api                                    */
/* -------------------------------------------------------------------------- */

const api = new Api({
  baseURL: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "d8b9199f-b9d7-4b7f-ad09-c5597d55941e",
    "Content-Type": "application/json",
  },
});

let sectionEl;
let currentUserId;

api
  .getAppInfo()
  .then(([userData, cardData]) => {
    currentUserId = userData._id;
    userInfoEl.setUserInfo({ name: userData.name, job: userData.about });
    userInfoEl.setAvatarInfo(userData.avatar);
    sectionEl = new Section(
      {
        items: cardData,

        renderer: (data) => {
          const card = createCard(data);
          sectionEl.addItem(card);
        },
      },
      ".cards__list"
    );
    sectionEl.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

/* -------------------------------------------------------------------------- */
/*                                    Card                                    */
/* -------------------------------------------------------------------------- */

function deleteCard(card, cardId) {
  deleteModal.open();
  deleteModal.setSubmitAction(() => {
    deleteModal.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        card.deleteClick();
        deleteModal.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        deleteModal.renderLoading(false);
      });
  });
}

function createCard(data) {
  const card = new Card({
    data,
    cardSelector: "#card-template",
    currentUserId,
    handlePreviewImage: () => {
      imagePopup.open(data);
    },
    handleLikeCard: (shouldRemoveLike) => {
      if (shouldRemoveLike) {
        api
          .removeLike(data)
          .then((data) => {
            card.updateLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(data)
          .then((data) => {
            card.updateLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleDeleteCard: (cardId) => {
      deleteCard(card, cardId);
    },
  });
  return card.generateCard();
}

/* -------------------------------------------------------------------------- */
/*                               Form Validator                               */
/* -------------------------------------------------------------------------- */

const addFormValidator = new FormValidator(cardModalForm, settings);
addFormValidator.enableValidation();

const profileFormValidator = new FormValidator(profileEditForm, settings);
profileFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(avatarForm, settings);
avatarFormValidator.enableValidation();

const deleteModal = new PopupWithConfirm('#delete-modal');
deleteModal.setEventListeners();

const editFormModal = new PopupWithForm('#profile-edit-modal', (inputValues) => {
  editFormModal.renderLoading(true);
  api
    .editProfile(inputValues)
    .then(() => {
      userInfoEl.setUserInfo({
        name: inputValues.name,
        job: inputValues.description,
      });
      editFormModal.close();
    })
    .catch((err) => {
      console.err(err);
    })
    .finally(() => {
      editFormModal.renderLoading(false);
    });
});
editFormModal.setEventListeners();

const addFormModal = new PopupWithForm('#profile-add-modal', (inputValues) => {
  addFormModal.renderLoading(true);
  api
    .addNewCard(inputValues)
    .then((data) => {
      const card = createCard(data);
      sectionEl.addItem(card);
      addFormModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addFormModal.renderLoading(false);
    });
});
addFormModal.setEventListeners();

const updateProfileForm = new PopupWithForm('#edit-avatar-modal', (inputValues) => {
  updateProfileForm.renderLoading(true);
  api
    .updateProfilePicture(inputValues)
    .then((value) => {
      userInfoEl.setAvatarInfo(value.avatar);
      updateProfileForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      updateProfileForm.renderLoading(false);
    });
});
updateProfileForm.setEventListeners();

const profileEdit = document.querySelector(".profile__image");
profileEdit.addEventListener("click", () => {
  updateProfileForm.open();
  avatarFormValidator.resetValidation();
});

/* -------------------------------------------------------------------------- */
/*                                   Popups                                   */
/* -------------------------------------------------------------------------- */

const imagePopup = new PopupWithImage('#preview-image-modal');
imagePopup.setEventListeners();

function openProfileModal() {
  const { name, job } = userInfoEl.getUserInfo();
  profileTitleEl.value = name;
  profileDescriptionEl.value = job;
  profileFormValidator.resetValidation();
  editFormModal.open();
}
profileEditButton.addEventListener("click", openProfileModal);
cardModalBtn.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addFormModal.open();
});

