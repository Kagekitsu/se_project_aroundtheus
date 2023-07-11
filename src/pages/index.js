import './index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditModal,
  cardModal,
  profileAvatarModal,
  deleteCardModal,
  profileEditButton,
  inputSelector,
  profileTitle,
  profileDescription,
  profileAvatar,
  profileDescriptionEl,
  profileTitleEl,
  cardTemplate,
  addNewCardButton,
  profileAvatarIcon,
  cardListEl,
  previewImageModal,
  initialCards, 
  settings
} from '../utils/constants';
import Api from '../utils/Api';

/* -------------------------------------------------------------------------- */
/*                                  Instances                                 */
/* -------------------------------------------------------------------------- */

const editProfileFormValidator = new FormValidator(settings, profileEditModal);
const addCardFormValidator = new FormValidator(settings, cardModal);
const avatarFromValidator = new FormValidator(settings, profileAvatarModal);
const deleteCardFormValidator = new FormValidator(settings, deleteCardModal);
const userInfo = new UserInfo(profileTitle, profileDescription, profileAvatar);
const editProfilePopup = new PopupWithForm(profileEditModal, handleProfileFormSubmit);
const previewImagePopup = new PopupWithImage(previewImageModal);
const addNewCardPopup = new PopupWithForm(cardModal, handleSubmitCard);
const deleteImagePopup = new PopupWithConfirm(deleteCardModal);
const editAvatarPopup = new PopupWithForm(profileAvatarModal, handleProfileAvatarSubmit);

const api = new Api({
  baseURL: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "d8b9199f-b9d7-4b7f-ad09-c5597d55941e",
    "Content-Type": "application/json",
  },
});


/* -------------------------------------------------------------------------- */
/*                               Form Validators                              */
/* -------------------------------------------------------------------------- */

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFromValidator.enableValidation();
deleteCardFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                 Api Promise                                */
/* -------------------------------------------------------------------------- */

let userId;
let cardList;

Promise.all([Api.getInitialCards(), Api.getUserInfo()])
.then(([initialCards, userData]) => {
  userId = userData._id;
  userDataInfo.setUserInfo(userData.name, userData.about);
  userInfo.setProfileAvatar(userData.avatar);
  cardList = new Section(
    {
      items: initialCards,
      renderer: (data) => {
        const newCard = createCard(data);
        cardList.addItem(newCard);
      },
    },
    cardList
  );
  cardList.renderItems();
})
.catch(() => console.log(err));

/* -------------------------------------------------------------------------- */
/*                              Profile Functions                             */
/* -------------------------------------------------------------------------- */

function openProfilePopup() {
  const { nameSelector, descriptionSelector} = userInfo.getUserInfo();
  profileTitleEl.value = nameSelector;
  profileDescriptionEl.value = descriptionSelector;
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
}

function handleProfileFormSubmit({ name, about }) {
  editProfilePopup.setLoading(true);
  Api
    .updateUserInfo(name, about)
    .then(() => {
      userInfo.setUserInfo(name, about);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopup.setLoading(false, "Save");
    });
}

/* -------------------------------------------------------------------------- */
/*                           Profile Event Listeners                          */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener('click', openProfilePopup);

profileAvatarIcon.addEventListener('click', () => {
  avatarFromValidator.toggleButtonState();
  editAvatarPopup.open();
})

function handleProfileAvatarSubmit(url) {
  editAvatarPopup.setLoading(true);
  Api
   .setUsereAvatar(url)
   .then((userData) => {
    userInfo.setProfileAvatar(userData.avatar);
    editAvatarPopup.close();
   })
   .catch((err) => {
    console.error(err);
   })
   .finally(() => {
    editAvatarPopup.setLoading(false, 'Save');
   });
}

/* -------------------------------------------------------------------------- */
/*                               Card Functions                               */
/* -------------------------------------------------------------------------- */

function handleSubmitCard({ title, url }) {
  Api
   .addCard(title, url)
   .then((card) => {
    const newCard = createCard(card);
    cardList.prependItem(newCard);
    addNewCardPopup.close();
   })
   .catch((err) => {
    console.error(err);
   })
   .finally(() => {
    addNewCardPopup.setLoading(false, 'Create');
   });
}

function createCard(data) {
  const newCard = new Card(
    data,
    userId,
    cardTemplateElement,
    function handleCardClick() {
      previewImagePopup.open(data);
    },
    function handleCardDelete() {
      deleteImagePopup.setSubmitAction(() => {
        deleteImagePopup.setLoading(true);
        Api
          .deleteCard(data._id)
          .then((res) => {
            newCard.remove(res._id);
            deleteImagePopup.close();
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            deleteImagePopup.setLoading(false, "Yes");
          });
      });
      deleteImagePopup.open(data._id);
    },
    function handleCardLikeClick(data) {
      Api
        .changeLikeCardStatus(data._id, newCard.isLiked())
        .then((res) => {
          const likes = res.likes || [];
          newCard.setLikes(likes);
          newCard.toggleLikes();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  );
  return newCard.generateCard();
}

/* ---------------------------------------------------------------------------------------------- */
/*                                    Card Set Event Listeners                                    */
/* ---------------------------------------------------------------------------------------------- */
addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addNewCardPopup.open();
});