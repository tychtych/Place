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
    cardContainer.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    buttonDelete.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    buttonLike.classList.add('place-card__like-icon');

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
    this.cardElement.querySelector('.place-card__image').addEventListener('click', this.enlarge.bind(this));
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove.bind(this.cardElement));
    
  }

  enlarge() {
    this.imagePopup.setLink(this.link);
    //this.imagePopup.updateLink();
    this.imagePopup.open();
    
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');

  }
  remove(event) {
    this.parentNode.removeChild(this);
  }
}


