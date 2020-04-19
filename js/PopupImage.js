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
        this.popupContainer.querySelector('.popup__content-image').setAttribute('src', this.link);

    }
}