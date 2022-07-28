import { Popup } from './popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageDescription = this._popup.querySelector('.popup__image-title')
    this._image = this._popup.querySelector('.popup__image')
  }

  open(src, description) {
    super.open();
    this._imageDescription.textContent = description;
    this._image.src = src;
    this._image.alt = description;
  }
}
