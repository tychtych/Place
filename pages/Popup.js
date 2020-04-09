/* Opens and closes popup 
 */
class Popup {

    /*
     *Toggles Add and Edit popup 

     *@param {HTMLElement} popupContainer - container to toggle
     */
    constructor(popupContainer) {
        this.popupContainer = popupContainer;

    }

    /*
     * opens popup
     *
     * @param {}
     */
    open() {
        this.popupContainer.classList.add('popup_is-opened');
    }

    close() {
        this.popupContainer.classList.remove('popup_is-opened');
    }

}
/*
 * 
 *
 */
class PopupImage extends Popup {
    constructor(popupContainer) {
        super(popupContainer);
    }
}



const popUpWindow = container.querySelector('.popup');
const popUpEditWindow = container.querySelector('.popupEdit');
const popUpImageWindow = container.querySelector('.popupImage');


const cardPopup = new Popup(popUpWindow);
const cardEditPopup = new Popup(popUpEditWindow)

const addButton = container.querySelector('.user-info__button');
const editButton = container.querySelector('.user-info-edit__button');
const closeButton = container.querySelector('.popup__close');
const closeEditButton = container.querySelector('.popup__edit-close');

addButton.addEventListener('click', cardPopup.open.bind(cardPopup));
editButton.addEventListener('click', cardEditPopup.open.bind(cardEditPopup));
closeButton.addEventListener('click', cardPopup.close.bind(cardPopup));
closeEditButton.addEventListener('click', cardEditPopup.close.bind(cardEditPopup));