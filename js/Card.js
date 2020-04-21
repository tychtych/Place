class Card {

  constructor(name, link, imagePopup) {
    this.name = name;
    this.link = link;
    this.imagePopup = imagePopup;


  }

  /*
   *Creates a div with a name and image background
   *
   *@return {HTMLElement} - card div with name and link as a background
   */
  //TODO return HTMLElement
  create() {
    const cardContainer = document.createElement('div');


    const cardImage = document.createElement('div');
    const buttonDelete = document.createElement('button');
    const cardDescription = document.createElement('div');
    const cardName = document.createElement('h3');
    const buttonLike = document.createElement('button');
    const likeCounter = document.createElement('h4');
    cardContainer.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    buttonDelete.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    buttonLike.classList.add('place-card__like-icon');
    likeCounter.classList.add('place-card__like-counter');

    cardImage.setAttribute('style', `background-image: url(${this.link})`);

    cardName.textContent = this.name;

    cardContainer.appendChild(cardImage);
    cardImage.appendChild(buttonDelete);
    cardContainer.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(buttonLike);

    this.cardElement = cardContainer;

    this.setEventListeners();
    return cardContainer;
  }

  setEventListeners() {
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);

    this.removeHandler = this.remove.bind(this);
    this.cardElement.addEventListener('click', this.removeHandler);

    this.enlargeHandler = this.enlarge.bind(this);
    this.cardElement.addEventListener('click', this.enlargeHandler);

  }

  /*REVIEW. Можно лучше. Я думаю метод открытия большого фото лучше перенести в класс PopupImage,
  добавление обработчика события открытия большого фото осуществлять в index.js,
  используя делегирование, например, на контейнер всех карточек.
  Тогда обработчик этого события не надо будет удалять  при удалении карточки и классу Card
  не надо было бы передавать экземляры PopupImage, что сделало бы Card более независимым
  и легче переиспользуемым в других проектах. */
  enlarge() {

    if (event.target.classList.contains('place-card__image')){
    this.imagePopup.setLink(this.link);
    this.imagePopup.open();
    }
  }

  like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
    if (event.target.closest('.place-card__delete-icon')) {
      this.cardElement.removeEventListener('click', this.enlargeHandler);
      this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
      this.cardElement.removeEventListener('click', this.removeHandler);
      this.cardElement.parentNode.removeChild(this.cardElement);
    }
  }
}


