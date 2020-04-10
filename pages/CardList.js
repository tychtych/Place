
class CardList {
    /*
     * Creates keys listContainer, cardArray
     *@param {HTMLElement} listContainer - a place to store
     *@param {array[Card]} cardArray - array pf card 
     */
    constructor(listContainer, cardArray) {
        this.listContainer = listContainer;
        this.cardArray = cardArray;

    }
    /*
     *Adds a card to the cardArray
     *
     *@param {Card} newCard  - a ready card to add
     *@return {array} - updated array of cards
     */
    addNewCard(newCard) {
        this.cardArray.push(newCard);
        
        
    }
    /*
     *Displays cards in list container
     *
     *@return {Void}  
     */
    render() {

        const htmlCardArray = this.cardArray.map(function (card) {
           return card.create(); 
          });
        for (let htmlCard of htmlCardArray) {
            this.listContainer.append(htmlCard);
            

        }
        
    }


}

const container = document.querySelector('.root');
const listContainer = container.querySelector('.places-list');


const popUpWindow = container.querySelector('.popup');
const popUpEditWindow = container.querySelector('.popupEdit');



const cardPopup = new Popup(popUpWindow);
const cardEditPopup = new Popup(popUpEditWindow)

const addButton = container.querySelector('.user-info__button');
const editButton = container.querySelector('.user-info-edit__button');
const closeButton = container.querySelector('.popup__close');
const closeEditButton = container.querySelector('.popup__edit-close');
const imageDiv = container.querySelector('.place-card__image');

//imageDiv.addEventListener('click', imageWindow.setLink.bind(imageDiv));
addButton.addEventListener('click', cardPopup.open.bind(cardPopup));
editButton.addEventListener('click', cardEditPopup.open.bind(cardEditPopup));
closeButton.addEventListener('click', cardPopup.close.bind(cardPopup));
closeEditButton.addEventListener('click', cardEditPopup.close.bind(cardEditPopup));






const popUpImageWindow = container.querySelector('.popupImage');

const popupImageInstance = new PopupImage(popUpImageWindow);
console.log(popupImageInstance);

const inititalCardsArray = initialCards.map(card => new Card(card.name, card.link, popupImageInstance));
//map function - store new aaray in the new const - returns updated array. It helps
//to standatrise the array 

const newCardList = new CardList(listContainer, inititalCardsArray);
newCardList.render();


