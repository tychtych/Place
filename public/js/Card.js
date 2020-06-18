class Card {

  constructor(name, link, likesCount, cardId, cardOwnerId, userId, imagePopup, handleDelete) {
    this.name = name;
    this.link = link;
    this.likesCount = likesCount;
    this.cardId = cardId;
    this.cardOwnerId = cardOwnerId;
    this.userId = userId;
    this.imagePopup = imagePopup;
    this.handleDelete = handleDelete;
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
    const cardDescription = document.createElement('div');
    const cardName = document.createElement('h3');
    const buttonLike = document.createElement('button');
    const likeCounter = document.createElement('h4');
    const likeDiv = document.createElement('div');
    cardContainer.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    //нужно создавать батон делит только для тех карточек которые можно удалить
    if (this.cardOwnerId === this.userId) {
      const buttonDelete = document.createElement('button');
      buttonDelete.classList.add('place-card__delete-icon');
      cardImage.appendChild(buttonDelete);
    }

    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    likeDiv.classList.add('place-card__like-container');
    buttonLike.classList.add('place-card__like-icon');
    likeCounter.classList.add('place-card__like-counter');

    likeCounter.textContent = this.likesCount.length;

    cardImage.setAttribute('style', `background-image: url(${this.link})`);

    cardName.textContent = this.name;

    cardContainer.appendChild(cardImage);
    cardContainer.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(likeDiv);
    likeDiv.appendChild(buttonLike);
    likeDiv.appendChild(likeCounter);


    this.cardElement = cardContainer;

    this.setEventListeners();
    return cardContainer;
  }

  setEventListeners() {
    this.likeHandler = this.like.bind(this);
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.likeHandler);

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

    if (event.target.classList.contains('place-card__image')) {
      this.imagePopup.setLink(this.link);
      this.imagePopup.open();
    }
  }

  like(event) { 
    
      api.likeCard(this.cardId)
        .then((response) => {
          this.cardElement.querySelector('.place-card__like-counter').textContent = response.likes.length += 1;
          event.target.classList.add('place-card__like-icon_liked');
        })
        .catch((err) => {
          console.log(err);
        })
    

  }


  remove(event) {
    if (event.target.closest('.place-card__delete-icon')) {
      const confirmDelete = window.confirm('Do you really want to delete this card?');
      if (confirmDelete) {
        this.handleDelete(this.cardId)
          .then(() => {
            this.cardElement.removeEventListener('click', this.enlargeHandler);
            this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
            this.cardElement.removeEventListener('click', this.removeHandler);
            this.cardElement.parentNode.removeChild(this.cardElement);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }
}