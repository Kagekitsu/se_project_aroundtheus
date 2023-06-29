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
  profileDescriptionInput,
  profileTitleInput,
  cardListEl,
  previewImageModal,
  submitButtonEditProfileInfo,
  submitButtonAddNewCard,
  submitButtonChangeAvatar,
  submitButtonDeleteCard,
} from '../utils/constants.js';
import Api from '../components/Api.js';

/* -------------------------------------------------------------------------- */
/*                                API Constant                                */
/* -------------------------------------------------------------------------- */

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/cohort-3-en',
  headers: {
    authorization: 'd8b9199f-b9d7-4b7f-ad09-c5597d55941e',
    "Content-Type": "application/json"
  }
});

let userId;

/* -------------------------------------------------------------------------- */
/*                                Card Function                               */
/* -------------------------------------------------------------------------- */

const renderCard = (item) => {
  const addNewCard = new Card(
    item,
    '#card-template',
    handleCardClick,
    userId,
    handleCardLike,
    cardTrashBtnVerify,
    handleDeleteCard
  );
  const cardElement = addNewCard.generateCard();
  cardListSection.addItem(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                                   Profile                                  */
/* -------------------------------------------------------------------------- */

const cardSection = new Section({ renderer: renderCard }, '.cards');

const userInfo = new UserInfo({
  userNameSelector: '.profile__title', 
  userJobSelector: '.profile__description',
  userAvatarSelector: '.profile__image'
});



/* -------------------------------------------------------------------------- */
/*                               Form Validator                               */
/* -------------------------------------------------------------------------- */

const formValidators = {};

function validatorEnabling(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((element) => {
    const validator = new FormValidator(settings, element);
    const formName = element.getAttribute('id');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}
validatorEnabling(validationSettings);

/* -------------------------------------------------------------------------- */
/*                              Initial page load                             */
/* -------------------------------------------------------------------------- */


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardSection.renderItems(cardData);
  })
  .catch((err) => {
    console.error(err);
  });

/* -------------------------------------------------------------------------- */
/*                              Profile User Info                             */
/* -------------------------------------------------------------------------- */

function handleProfileFormSubmit(data) {
  profilePopupForm.renderLoading(data);
  api
    .editProfileInformation(data)
    .then((newUserData) => {
      userInfo.setUserInfo(newUserData);
    })
    .then(() => {
      profilePopupForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profilePopupForm.renderLoading(false);
    });
}

const profilePopupForm = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
profilePopupForm.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  titleInput.value = userData.userName;
  jobInput.value = userData.userJobDescription;
  formValidators["profile-input-form"].toggleButtonState();
  profilePopupForm.open();
});

/* -------------------------------------------------------------------------- */
/*                                Popup Card Image                            */
/* -------------------------------------------------------------------------- */

const previewImagePopup = new PopupWithImage('.modal__image');
previewImagePopup.setEventListeners();

function handleCardClick(data) {
  previewImagePopup.open(data);
}

/* -------------------------------------------------------------------------- */
/*                           Changing Avatar Picture                          */
/* -------------------------------------------------------------------------- */

function handleAvatarImageServerSubmit(data) {
  avatarChangeFormPoup.renderLoading(data);
  api
    .updateProfilePicture(data)
    .then((response) => {
      classUserInfo.setUserInfo(response);
    })
    .then(() => {
      avatarChangeFormPoup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarChangeFormPoup.renderLoading(false);
    });
}

const avatarChangeFormPoup = new PopupWithForm(
  ".avatar__modal",
  handleAvatarImageServerSubmit
);

profileAvatarEditButton.addEventListener("click", () => {
  formValidators["avatar-form"].toggleButtonState();
  avatarChangeFormPoup.open();
});
avatarChangeFormPoup.setEventListeners();


/* -------------------------------------------------------------------------- */
/*                              Adding New Cards                              */
/* -------------------------------------------------------------------------- */

function handleNewCardServerRenderSubmit(data) {
  newCardPopupForm.renderLoading(data);
  api
    .addNewCard(data)
    .then((cardData) => {
      cardSection.renderItems([cardData]);
    })
    .then(() => {
      newCardPopupForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardPopupForm.renderLoading(false);
    });
}

const newCardPopupForm = new PopupWithForm(
  "#profile-add-modal",
  handleNewCardServerRenderSubmit
);

cardAddButton.addEventListener("click", () => {
  formValidators["new-card-form"].toggleButtonState();
  newCardPopupForm.open();
});
newCardPopupForm.setEventListeners();



/* -------------------------------------------------------------------------- */
/*                          Card Like/Unlike Function                         */
/* -------------------------------------------------------------------------- */

function handleCardLike(card) {
  if (card.cardIsLiked()) {
    api
      .likesCountRemove(card._cardId)
      .then((res) => {
        card.updateLike(res);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likesCountAdd(card._cardId)
      .then((res) => {
        card.updateLike(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

/* -------------------------------------------------------------------------- */
/*                          Verify Delete Card Modal                          */
/* -------------------------------------------------------------------------- */

const cardVerifyDelete = new PopupCardDeleteVerify(
  ".card-delete-verify",
  handleDeleteCard
);
cardVerifyDelete.setEventListeners();

function handleDeleteCard(cardId, element) {
  cardVerifyDelete.setSubmitAction(() => {
    cardVerifyDelete.renderLoading(cardId);

    api
      .deleteCardRequest(cardId)
      .then(() => {
        element.remove();
      })
      .then(() => {
        cardVerifyDelete.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardVerifyDelete.renderLoading(false);
      });
  });
}

function cardTrashButtonVerify() {
  cardVerifyDelete.open();
}