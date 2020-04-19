'use strict'
/*
fetch('https://praktikum.tk/cohort10/cards', {
  headers: {
    authorization: 'b7bf284d-e98b-46e7-a116-decc877d1eec'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

  */



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

const nameInput = popUpEditWindow.querySelector('.popup__input_type_Editname');
const jobInput = popUpEditWindow.querySelector('.popup__input_type_Editlink-url');
const userDiv = document.querySelector('.user-info__data');
const userInforName = userDiv.querySelector('.user-info__name');
const userInfoNameVal = userInforName.textContent;
const userInfoJob = userDiv.querySelector('.user-info__job');
const userInfoJobVal = userInfoJob.textContent;
const formEdit = document.forms.popupEdit;



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

const newEditUserInfo = new UserInfo(userInfoNameVal, userInfoJobVal, formEdit, userDiv);

newEditUserInfo.updateUserInfo();


const editValidationForm = new FormValidator(formEdit, errorMessages);
editValidationForm.setEventListeners();

const addImageValidation = new FormValidator(form, errorMessages);
addImageValidation.setEventListeners();
//addButton.addEventListener('click', cardPopup.open.bind(cardPopup));
//when popup opens the form should be with non active button
addButton.addEventListener('click', function() {
  cardPopup.open.bind(cardPopup)();
  addImageValidation.resetForm();

});

//при открытии попапа сетается юзер инфо
editButton.addEventListener('click', function () {
  newEditUserInfo.updateUserInfo();
  cardEditPopup.open.bind(cardEditPopup)();
  editValidationForm.validateAllForm();
});

//forms- submit event

formEdit.addEventListener('submit', function (event) {

    event.preventDefault();
    newEditUserInfo.setUserInfo(nameInput.value, jobInput.value);
    newEditUserInfo.updateUserInfo();
    cardEditPopup.close();
})


form.addEventListener('submit', function(event){
    event.preventDefault();
    const customCard = new Card(userName.value, imageLink.value, popupImageInstance);
    newCardList.addNewCard(customCard);
    cardPopup.close();
    form.reset();
})



/*REVIEW. Резюме.

В целом неплохая работа.

Код на классы разбит. Выполнено требование чек-листа о передаче в параметры класса CardList, экземпляров класса Card,
создаваемых для каждой карточки.

Что надо исправить.

1. Done Перед удалением карточки нужно удалить обработчики событий карточки (подробные комментарии в файле класса Card).

2. Done В слушателе открытия формы карточки делать кнопку сабмита формы недоступной и белого цвета. done
Протестировать работу валидации формы карточки и, если не удастся отладить валидацию этой формы по
трбованиям дополнительного задания из проекта 7, сделать минимальную валидацию формы карточки,
как у Вас было в 7-м задании.
Появление системных сообщений об ошибках на форме недопустимо.

3. Done Сделать до конца правильной валидацию формы профиля.
Сейчас она сделана только наполовину - работает правильно
только при выходе из этой формы по сабмиту. Если из формы выйти по крестику,
предварительно сделав в полях формы информацию невалидной, при следующем входе в форму
информация со страницы на форму не переносится,
остаются видны сообщения об ошибках и кнопка сабмита остаётся неактивной, хотя по
обязательному требованию, форма профиля при открытии должна всегда иметь валидный вид.

Поэтому, чтобы не беспокоиться о том, как был совершён предыдущий выход из формы профиля -
по сабмиту или крестику, нужно осуществлять перенос информация со страницы на форму в
!!слушателе открытия этой формы, в этом же слушателе убирать!!
сообщения об ошибках и делать кнопку сабмита активной и черного цвета.

4. Done Занести все файлы с расширением js в отдельную папку в корне проекта.


Что можно улучшить.

1. Метод открытия большого фото лучше перенести в класс PopupImage (подробные комментарии в файле класса Card).

2. Лучше, чтобы класс CardList не знал, что у класса Card есть метод create, это бы сделало эти классы более
независимыми друг от друга (подробные комментарии в файле класса CardList).

3. Лучше (и это обязательное требование 7-го задания), чтобы метод checkInputValidity не зависел от объекта события event,
то есть у него были такие же параметры как у функции checkInputValidity в 7-м задании, тогда этот метод можно было бы вызывать
в слушателе открытия формы профиля, для придания ей валидного вида, как указано в пункте 3 критических замечаний.


________________________________________________________________________________________________________________________________________________________

REVIEW2. Резюме2.

Валидация форм испрвлена. Метод checkInputValidity сделан независимым от объекта события.

Что надо исправить сейчас.

1. DoneНадо удалить не только обрабртчик события открытия большого фото,
но и обработчики события лайка и удаления самой карточки
(подробные комментарии в файле класса Card).

2. Done Весь код, не входящий в объявление какого-либо класса, должен быть помещён в файл-точку входа проекта,
файл index.js (подробные комментарии в файле класса UserInfo и в файле класса FormValidator).


________________________________________________________________________________________________________________________________________________________

REVIEW3. Резюме3.

Критические замечания исправлены. Весь функционал проекта, требуемый по заданию, работает правильно.

Сделано дополнительное задание - полная валидация формы карточки.

Что можно улучшить.

1. Выполнить рекомендации предыдущих ревью.

2. После окончания отладки проекта, перед предоставлением возможности просмотра проекта другим людям,
положено удалять закоментированный код и отладочные инструкции console.log() - правило программистского этикета).

Работа принимается!


*/