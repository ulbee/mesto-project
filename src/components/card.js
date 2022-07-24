export class Card {
    constructor({data, deleteHandler, likeHandler}, selector) {
        this._id = data._id;
        this._image = data.link;
        this._title = data.name;
        this._likes = data.likes;
        this._imageOwner = data.owner._id;
        this._isLiked = false;
        this._deleteHandler = deleteHandler;
        this._likeHandler = likeHandler;
        this._selector = selector;
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
        this._deleteHandler();
      });
    }

    _setLikeEventListener() {
      this._element.querySelector('.card__like').addEventListener('click', (e) => {
        this._likeHandler();
      });
    }

    // TODO убрать использование userId
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

    getId() {
      return this._id;
    }

    getIsLiked() {
      return this._isLiked;
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
