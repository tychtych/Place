'use strict'

const errorMessages = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Здесь должна быть ссылка'
}

const container = document.querySelector('.root');
const listContainer = container.querySelector('.places-list');
const form = document.forms.new;

const popUpWindow = container.querySelector('.popup');
const popUpEditWindow = container.querySelector('.popupEdit');
const popUpImageWindow = container.querySelector('.popupImage');


const cardPopup = new Popup(popUpWindow);
const cardEditPopup = new Popup(popUpEditWindow)
const popupImageInstance = new PopupImage(popUpImageWindow);

const addButton = container.querySelector('.user-info__button');
const editButton = container.querySelector('.user-info-edit__button');
const closeButton = container.querySelector('.popup__close');
const closeEditButton = container.querySelector('.popup__edit-close');
const closeImageButton = container.querySelector('.popup__image-close');
const imageDiv = container.querySelector('.place-card__image');

addButton.addEventListener('click', cardPopup.open.bind(cardPopup));
editButton.addEventListener('click', cardEditPopup.open.bind(cardEditPopup));
closeButton.addEventListener('click', cardPopup.close.bind(cardPopup));
closeEditButton.addEventListener('click', cardEditPopup.close.bind(cardEditPopup));
closeImageButton.addEventListener('click', popupImageInstance.close.bind(popupImageInstance));


const userName = popUpWindow.querySelector('.popup__input_type_name');
const imageLink = popUpWindow.querySelector('.popup__input_type_link-url');





const inititalCardsArray = initialCards.map(card => new Card(card.name, card.link, popupImageInstance));
//map function - store new aaray in the new const - returns updated array. It helps
//to standatrise the array 

const newCardList = new CardList(listContainer, inititalCardsArray);
newCardList.render();


form.addEventListener('submit', function(event){
    event.preventDefault();
    const customCard = new Card(userName.value, imageLink.value, popupImageInstance);
    newCardList.addNewCard(customCard);
    cardPopup.close();
    form.reset();
})