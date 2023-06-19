import Popup from "./Popup.js";

class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this.popupImage = this.popup.querySelector('.modal__image');
        this.popupCaption = this.popup.querySelector('.modal__caption');
    }

    open(imageSrc, caption) {
        this.popupImage.src = imageSrc;
        this.popupImage.alt = caption;
        this.popupCaption.textContent = caption;
        super.open();
    }
}