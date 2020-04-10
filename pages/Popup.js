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

    setLink(link) {
        this.link = link;
        this.updateLink();
    }

    updateLink() {
        //TODO update view (div style)
        this.popupContainer.setAttribute('style',this.link);
        
    }
}
