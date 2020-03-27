'use strict'

// переменные
const container = document.querySelector('.root');
const rootSection = container.querySelector('.places-list');
const addButton = container.querySelector('.user-info__button');
const popUpWindow = container.querySelector('.popup');
const popUpButton = container.querySelector('.popup__button');
const popUpEditWindow = container.querySelector('.popupEdit');
const popUpImageWindow = container.querySelector('.popupImage');
const popUpImageContent = popUpImageWindow.querySelector('.popup__content-image');
const editButton = container.querySelector('.user-info-edit__button');
const form = document.forms.new;
// Имя переменной в неверной нотации
// Надо исправить edit with capital letter camelCase
const form_edit = document.forms.popupEdit;
const userInforName = container.querySelector('.user-info__name');
const userInfoJob = container.querySelector('.user-info__job');
// Эти 5 переменных не используются
// Не стоит ли их удалить


// функции

// enables the button depending on the input in PopUpWindow
function inputHandler() {
  // Можно лучше -- деструктуризация
  // const { name, link } = form;
  const inputName = form.name;
  const inputLink = form.link;
  if (inputName.value.length === 0 || inputLink.value.length === 0) {
    popUpButton.setAttribute('disabled', false);
    popUpButton.classList.add('popup__button-disabled');
  } else {
    popUpButton.removeAttribute('disabled');
    popUpButton.classList.remove('popup__button-disabled');
  }
}

function setSubmitButtonState(button, isInputValid) {
  if (!isInputValid) {
    button.setAttribute('disabled', false);
    button.classList.add('popup__button-disabled');
  } else {
    button.removeAttribute('disabled', false);
    button.classList.remove('popup__button-disabled');
  }
}

function checkInputValidity(input, error) {
  // Можно лучше
  // Текст ошибок лучше представить в виде объекта вида:
  // const errorMessages = {
  //   valueMissing: 'Это обязательное поле',
  //   tooShort: 'Должно быть от 2 до 30 символов',
  //   typeMismatch: 'Здесь должна быть ссылка'
  // };
  // Объект передаем в метод валидации и текст берем уже по ключу объекта
  // Что это дает? Так мы отвязываемся от локали, можно объект на любом
  // языке скинуть, таким образом можно легко осуществить локализацию.
  if (!input.value) {
    error.classList.remove('error-message__hidden');
    error.textContent = 'Это обязательное поле';
    return false;
    // Надо исправить
    // else после return не нужен, достаточно if
  }
  if (input.value.length < 2 || input.value.length > 30) {
    error.classList.remove('error-message__hidden');
    error.textContent = 'Должно быть от 2 до 30 символов';
    return false;
    // Надо исправить
    // А здесь не нужен else
  }
  error.textContent = '';
  error.classList.add('error-message__hidden');
  return true;
}

function validateForm(form) {
  // create a flag
  let isValidForm = true;
  // make an input array from the edit form

  // You need to fix it
  // Ary you sure that there are only inputs will be inside the form? It's a hardcode.
  // You need to collect ONLY inputs from form. check if div is input (how to get only inputs?)
  const inputs = Array.from(form);
  // iterate through every input from the array list
  inputs.forEach((elem) => {

    // if it's not a button, execute code
    // Надо исправить
    // submit не определен
    // Кроме того, эту проверку убеорите, ведь все равно мы в массив будем добавлять
    // только инпуты а не все на свете
    // для этого используйте someParentNode.getElementsByTagName() - 
    if (elem.id !== submit.id) {
      // find const errorElement
      const errorElement = container.querySelector(`#error-${elem.id}`)
      // if the element doesn't pass validation, flag changes to false

      if (!checkInputValidity(elem, errorElement)) isValidForm = false;
    }
  });
  // find a submit button by class which is found on a form
  const submitButton = form.querySelector('.popup__button');
  // use setSubmitButtonState to pass the arguments button and isValidForm to link to a button state
  setSubmitButtonState(submitButton, isValidForm);
}

function setEventListeners(popupElem) {
  // find id of a popup
  const popupID = popupElem.id;
  const form = document.forms[popupID];
  // add event listener to the form, which reacts on the input, and validates form
  form.addEventListener('input', (event) => {
    validateForm(form);
  })
}

setEventListeners(popUpEditWindow);


// adds a card with a name and a link, can add any attribute
function addCard(name, link) {
  const html = `<div class="place-card">
    <div class="place-card__image" backLink="${link}"  style="background-image: url(${link})">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name">${name}</h3>
      <button class="place-card__like-icon"></button>
    </div>
  </div>`;
  rootSection.insertAdjacentHTML('beforeend', html);
 
}


initialCards.forEach(({
  name,
  link
}) => addCard(name, link));



// action - like card
function likeCard(event) {
  event.target.classList.toggle('place-card__like-icon_liked');
}
// action - delete card
function deleteCard(event) {
  const card = event.target.closest('.place-card');
  rootSection.removeChild(card);
}

// action - enlarge card
function enlargeCard(event) {
  const imageStyle = event.target.getAttribute('backLink');
  popUpImageContent.setAttribute('src', imageStyle);
  popUpImageWindow.classList.add('popup_is-opened');
}

// handles events on the card
function cardHandler(event) {
  if (event.target.closest('.place-card__like-icon')) {
    likeCard(event);
  } else if (event.target.closest('.place-card__delete-icon')) {
    deleteCard(event);
  } else if (event.target.classList.contains('place-card__image')) {
    enlargeCard(event);
  }
}



// edit and save user's info in editPopup
function editInfo(userName, about) {
  userInforName.textContent = userName.value;
  userInfoJob.textContent = about.value;
}

function assignCloseButton(popUpBlock) {
  // Надо исправить -- метод в методе определять не стоит
  // еще см. комментарий в Review.md
  function handlePopup() {
    popUpBlock.classList.toggle('popup_is-opened');
  }

  const closeButton = popUpBlock.querySelector('.popup__close');

  closeButton.addEventListener('click', handlePopup);
}
/*
assignCloseButton(popUpWindow);
assignCloseButton(popUpEditWindow);
assignCloseButton(popUpImageWindow);
*/

function toggleAnyPopup (block) {
  block.classList.toggle('popup_is-opened');
}

// open or close the popup
function handlePopup() {
  form.reset();
  toggleAnyPopup(popUpWindow);
  inputHandler();
}

// open close edit popup
function handleEditPopup() {
  toggleAnyPopup(popUpEditWindow);
  const currentName = userInforName.textContent;
  const currentJob = userInfoJob.textContent;
  const nameInput = popUpEditWindow.querySelector('.popup__input_type_Editname');
  nameInput.value = currentName;
  const jobInput = popUpEditWindow.querySelector('.popup__input_type_Editlink-url');
  jobInput.value = currentJob;
}

// слушатели

editButton.addEventListener('click', handleEditPopup);
addButton.addEventListener('click', handlePopup);


rootSection.addEventListener('click', cardHandler);

form.addEventListener('submit', function (event) {
  event.preventDefault();


  const {
    name,
    link
  } = form.elements;

  addCard(name.value, link.value);
  form.reset();
  handlePopup();
});



form.addEventListener('input', inputHandler);

form_edit.addEventListener('submit', function (event) {
  event.preventDefault();

  const {
    userName,
    about
  } = form_edit.elements;

  editInfo(userName, about);

  form_edit.reset();
  handleEditPopup();

})


// См. Review.md