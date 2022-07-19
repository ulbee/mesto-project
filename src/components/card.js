import * as Popup from "./modal.js";
import {api} from "./api.js";

export class Card {
    constructor(data, selector) {
        this._id = data._id;
        this._image = data.link;
        this._title = data.name;
        this._likes = data.likes;
        this._imageOwner = data.owner._id;
        this._selector = selector;
        this._isLiked = false;
    }

    _getElement() {
        const cardElement = document.querySelector(this._selector)
          .content
          .querySelector('.card')
          .cloneNode(true);

        return cardElement;
    }

    _setDeleteEventListener() {
      this._element.querySelector('.card__delete').addEventListener('click', (e) => {

        api.deleteCard(this._id)
          .then(() => {
              this._element.remove();
          })
          .catch((error) => {
              console.log(error);
          });
        
      });
    }

    _setLikeEventListener() {
      this._element.querySelector('.card__like').addEventListener('click', (e) => {
        
        api.toggleLike(this._id, this._isLiked)
            .then((res) => {
              this._isLiked = !this._isLiked;
              this._element.querySelector('.card__like').classList.toggle('card__like_active');                
              this._element.querySelector('.card__likes-number').textContent = res.likes.length;
            })
            .catch((error) => {
                console.log(error);
            });        
        
      });
    }

    generate(userId) {
      this._element = this._getElement();

      this._element.querySelector('.card__image').src = this._image;
      this._element.querySelector('.card__image').alt = this._title;
      this._element.querySelector('.card__title').textContent = this._title;
      this._element.querySelector('.card__likes-number').textContent = this._likes.length;

      if (this._likes.find((el) => el._id === userId)) {
        this._element.querySelector('.card__like').classList.add('card__like_active');
        this._isLiked = true;
      }
      this._setLikeEventListener();

      if (this._imageOwner !== userId) {
        this._element.querySelector('.card__delete').remove();
      } else {
        this._setDeleteEventListener();
      }

      return this._element;
    }
}

// /**
//  * Селекторы показа увеличенной картинки
//  */
// const showPicturePopup = document.querySelector('#showPicture');
// const popupImage = showPicturePopup.querySelector('.popup__image');
// const popupImageTitle = showPicturePopup.querySelector('.popup__image-title');
// /**
//  * Функция открытия картинки большего размера
//  */
// const openPicture = (el) => {
//     const src = el.target.src;
//     const title = el.target.alt;

//     popupImage.src = src;
//     popupImage.alt = title;
//     popupImageTitle.textContent = title;

//     Popup.openPopup(showPicturePopup);
// }
