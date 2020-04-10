class Card {

  constructor(name, link) {
    this.name = name;
    this.link = link;
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
    return cardContainer;
  }
  like() {
    event.target.classList.toggle('place-card__like-icon_liked');
    
  }
}


