import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super({ popupSelector });
        this._previewImageElement = document.querySelector('.modal__image');
        this._previewImageCaption = document.querySelector('.modal__caption');
    }

    open(data) {
        this._previewImageCaption.textContent = data.name;
        this._previewImageElement.alt = data.name;
        this._previewImageElement.src = data.link;
        super.open();
    }

}