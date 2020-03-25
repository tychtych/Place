'use strict'

const container = document.querySelector('.root');
const rootSection = container.querySelector('.places-list');
const addButton = container.querySelector('.user-info__button');
const popUpWindow = container.querySelector('.popup');
const popUpButton = container.querySelector('.popup__button');
const popUpEditWindow = container.querySelector('.popupEdit');
const popUpEditButton = popUpEditWindow.querySelector('.popup__button');
const popUpImageWindow = container.querySelector('.popupImage');
const popUpImageContent = popUpImageWindow.querySelector('.popup__content-image');
const editButton = container.querySelector('.user-info-edit__button');
const form = document.forms.new;
const form_edit = document.forms.edit;
const userInforName = container.querySelector('.user-info__name');
const userInfoJob = container.querySelector('.user-info__job');
const inputName = form_edit.name;
const editInput = popUpEditWindow.querySelector('.popup__input_type_name');
const aboutInput = popUpEditWindow.querySelector('.popup__input_type_link-url');
const editNameErrorMessage = popUpEditWindow.querySelector('#error-edit-name');
const editAboutErrorMessage = popUpEditWindow.querySelector('#error-edit-about');

function inputHandler () {
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

function setSubmitButtonState () {
  const editName = form_edit.userName;
  const editAbout = form_edit.about;
  if (editName.value.length < 2 || editAbout.value.length > 30) {
    popUpEditButton.setAttribute('disabled', false);
    popUpEditButton.classList.add('popup__button-disabled');
  } else {
    popUpEditButton.removeAttribute('disabled');
    popUpEditButton.classList.remove('popup__button-disabled');
  }

}



function checkInputValidity (input, error) {
    if (!input.value) {
      error.classList.remove('error-message__hidden');
       error.textContent = 'Это обязательное поле';
    } else if (input.value.length < 2 || input.value.length > 30) {
      error.classList.remove('error-message__hidden');
      error.textContent= 'Должно быть от 2 до 30 символов';
    } else {
      error.textContent ='';
      error.classList.add('error-message__hidden');
    }
  }

  
function setEventListeners(popupElem) {

popupElem.addEventListener('input', (event) => {
  setSubmitButtonState();
  checkInputValidity(event.target,  editNameErrorMessage);
  
})

popupElem.addEventListener('input', (event) => {
  setSubmitButtonState();
  checkInputValidity(event.target, editAboutErrorMessage);
  
})

}

setEventListeners(editInput);
setEventListeners(aboutInput);


function assignCloseButton(popUpBlock) {
  function handlePopup() {
    popUpBlock.classList.toggle('popup_is-opened');
  }

  const closeButton = popUpBlock.querySelector('.popup__close');

  closeButton.addEventListener('click', handlePopup);
}

assignCloseButton(popUpWindow);
assignCloseButton(popUpEditWindow);
assignCloseButton(popUpImageWindow);




function addCard(name, link) {
  //Спасибо за рекомендацию !
  // Можно лучше
  // Прочитайте на досуге вот про такие удобные вещи
  // https://developer.mozilla.org/ru/docs/Web/HTML/Element/template -- шиблон
  // https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment -- контейнер без лишних оберток
  // очень выручают когда нужно создавать много похожих объектов
  // будет здорово если попробуете реализовать, там реально 4-5 строк кода, зато
  // не надо будет разметку HTML сюда тящить.
  const html = `<div class="place-card">
    <div class="place-card__image" style="background-image: url(${link})">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name">${name}</h3>
      <button class="place-card__like-icon"></button>
    </div>
  </div>`;
  // А тут двойные кавычки не заменили))
  rootSection.insertAdjacentHTML('beforeend', html);
}

initialCards.forEach(({ name, link }) => addCard(name, link));
// action - like card
function likeCard(event) {
  event.target.classList.toggle('place-card__like-icon_liked');
}
// action - delete card
function deleteCard(event) {
  const card = event.target.closest('.place-card');
  rootSection.removeChild(card);
}


 container.addEventListener('click', function() {
  if (event.target.classList.contains('place-card__image')) {
    popUpImageWindow.classList.add('popup_is-opened');
  }
});

function enlargeCard(event) {
  const imageStyle = event.target.getAttribute('style');
    popUpImageContent.setAttribute('style', imageStyle);
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

rootSection.addEventListener('click', cardHandler);

function editInfo (userName, about) {
  userInforName.textContent = userName.value;
  userInfoJob.textContent = about.value;
}


function handlePopup() {
  form.reset();
  popUpWindow.classList.toggle('popup_is-opened');
  inputHandler();
}


function handleEditPopup () {
  popUpEditWindow.classList.toggle('popup_is-opened'); 

  const currentName = userInforName.textContent;
  const currentJob = userInfoJob.textContent;
  
  const nameInput = popUpEditWindow.querySelector('.popup__input_type_name');
  nameInput.value = currentName;
  const jobInput = popUpEditWindow.querySelector('.popup__input_type_link-url');
  jobInput.value = currentJob;
}

editButton.addEventListener('click', handleEditPopup);
addButton.addEventListener('click', handlePopup);




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

form_edit.addEventListener('submit', function (event){
  event.preventDefault();

  const {userName, about} = form_edit.elements;
  
  editInfo(userName, about);

  form_edit.reset();
  handleEditPopup(); 
  
})




// Добрый день!

// Работа аккуратная, код легко читается, карточки загружаются из массива, добавляются новые карточки пользователя.
// Для удаления карточек реализовано делегирование -- отлично!
// Но есть пара моментов, которые следует улучшить

// Надо исправить:

// Закрытие и открытие окна попапа нужно вынести в отдельный метод, который через classList.toggle
// будет менять состояние окна. Этот метод
// можно прикрепить к обработчикам открытия и закрытия окна, в методе добавления новой карты использовать.

// Рефакторинг обработки лайков

// Прочие замечания в коде

// Можно лучше
// - деструктуризация
// - стрелочные функции для коллбэков
// - используйте один тип кавычек для строк ''
// - переменные лучше определять в отдельном блоке
// - массив можно вынести в отдельный файл и подключать в HTML через <script>

// Исправьте критические замечания и присылайте работу на проверку.

// Здравствуйте! Спасибо за комментарии, доступно и понятно для нубиков как я : )))


// ============== Review 2
// Еще раз добрый день.
// Уже можно было бы зачет получить, но у вас окно попапа не закрывается, потому что переменная не объявлена в которой элемент
// кнопки закрытия должен быть.
//Какой вывод из этого мы должны сделать -- после рефакторинга всегда проверяйте работоспособность приложения,
// особенно в той части функционала, которую меняли, всегда тестируйте с открытой консольлю, т
//уда будут валиться ошибки. Используйте 'use strict'.
//
// Рефакторинг вы провели хорошо, код стал чище, гораздо лучше читается, и вообще лишнее ушло.
//Что касается места нахождения файлов скрипта, забыл
// еще в первый раз написать, что лучше заведите в корне проекта папку js или script и
//храните их там, это удобнее.
//
// Комментарии и пожелания в коде.
//
// Исправьте ошибку и присылайте на проверку, и помните, что новички рано или поздно становятся миддлами и лидами,
//все зависит только от стремления
// и желания узнавать новое )))

// === Review 3
// Все работает, карты загружаются из массива, можно добавить свою карту, удалить карту, поставить лайк.addButton
// Код чистый, хорошо структурированный. Все обязательные задания выполнены. Работа зачтена.

// Можно лучше

// - добавить проверку полей формы (пустые или нет, если пустые, то не сохранять карту)
