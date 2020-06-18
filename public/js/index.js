'use strict'



const errorMessages = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Здесь должна быть ссылка'
}

const api = new Api('https://praktikum.tk/cohort10', 'b7bf284d-e98b-46e7-a116-decc877d1eec');

const container = document.querySelector('.root');
const listContainer = container.querySelector('.places-list');
const form = document.forms.new;

const popUpWindow = container.querySelector('.popup');
const popUpEditWindow = container.querySelector('.popupEdit');
const popUpImageWindow = container.querySelector('.popupImage');
const popupAvatarWindow = container.querySelector('.popupAvatar');


const cardPopup = new Popup(popUpWindow);
const cardEditPopup = new Popup(popUpEditWindow)
const popupImageInstance = new PopupImage(popUpImageWindow);
const cardPopupAvatar = new Popup(popupAvatarWindow);


const addButton = container.querySelector('.user-info__button');
const editButton = container.querySelector('.user-info-edit__button');
const avatarButton = container.querySelector('.user-info__photo');
const closeButton = container.querySelector('.popup__close');
const closeEditButton = container.querySelector('.popup__edit-close');
const closeImageButton = container.querySelector('.popup__image-close');

const nameInput = popUpEditWindow.querySelector('.popup__input_type_Editname');
const jobInput = popUpEditWindow.querySelector('.popup__input_type_Editlink-url');
const userDiv = document.querySelector('.user-info');

const formEdit = document.forms.popupEdit;

const userId = 'a076321f76901e271ae386a7';


closeButton.addEventListener('click', cardPopup.close.bind(cardPopup));
closeEditButton.addEventListener('click', cardEditPopup.close.bind(cardEditPopup));
closeImageButton.addEventListener('click', popupImageInstance.close.bind(popupImageInstance));


const userName = popUpWindow.querySelector('.popup__input_type_name');
const imageLink = popUpWindow.querySelector('.popup__input_type_link-url');

const newEditUserInfo = new UserInfo(formEdit, userDiv);


api.getUserInfo()
  .then(userInfoResponse => {
    newEditUserInfo.setUserInfo(userInfoResponse.name, userInfoResponse.about, userInfoResponse.avatar);
    newEditUserInfo.updateUserInfo();
  })

const cardsArray = [];

const customCardList = new CardList(listContainer, cardsArray);

const handleDelete = (cardId) => api.deleteCard(cardId);

api.getInitialCards()
  .then(cardsResponse => {
    for (let card of cardsResponse) {

      const initCard = new Card(card.name, card.link, card.likes, card._id, card.owner._id, userId, popupImageInstance, handleDelete);
      cardsArray.push(initCard);
    }
    customCardList.render();
  })

  .catch(err => {
    console.log(err);
  })



form.addEventListener('submit', function (event) {
  event.preventDefault();
  api.addCard(userName.value, imageLink.value)
    .then(response => {
      const customCard = new Card(response.name, response.link, popupImageInstance);
      customCardList.addNewCard(customCard);
      cardPopup.close();
      form.reset();
    })
    .catch(err => {
      console.log(err);
    })
})





const editValidationForm = new FormValidator(formEdit, errorMessages);
editValidationForm.setEventListeners();

const addImageValidation = new FormValidator(form, errorMessages);
addImageValidation.setEventListeners();
//addButton.addEventListener('click', cardPopup.open.bind(cardPopup));
//when popup opens the form should be with non active button
addButton.addEventListener('click', function () {
  cardPopup.open.bind(cardPopup)();
  addImageValidation.resetForm();

});

//при открытии попапа сетается юзер инфо
editButton.addEventListener('click', function () {
  newEditUserInfo.updateUserInfo();
  cardEditPopup.open.bind(cardEditPopup)();
  editValidationForm.validateAllForm();
});

avatarButton.addEventListener('click', () => {
  cardPopupAvatar.open.bind(cardPopupAvatar)();
})

//forms- submit event

formEdit.addEventListener('submit', function (event) {

  event.preventDefault();
  api.editUserInfo(nameInput.value, jobInput.value)
    .then(response => {
      newEditUserInfo.setUserInfo(response.name, response.about, response.avatar);
      newEditUserInfo.updateUserInfo();
      cardEditPopup.close();
    })
    .catch(err => {
      console.log(err);
    })

})






