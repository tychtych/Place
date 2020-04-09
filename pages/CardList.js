
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


const inititalCardsArray = initialCards.map(card => new Card(card.name, card.link));
//map function - store new aaray in the new const - returns updated array. It helps
//to standatrise the array 

const newCardList = new CardList(listContainer, inititalCardsArray);
newCardList.render();
