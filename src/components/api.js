export class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = {
      authorization: options.headers.authorization,
      'Content-Type': 'application/json'
    }
  }
  chekResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  /**
   * Получение данных о пользователе
   */
  getUser(){
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers
    })
      .then(this.chekResponse);
  };

  /**
   * Сохранение данных пользователя
   *
   * @param {object} userData
   * @param {string} userData.name - имя пользователя
   * @param {string} userData.about - дополнительная информация о пользователе
   */
    saveUserInfo (userData) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
      .then(this.chekResponse);
  };

  /**
   * Сохранение аватара пользователя
   *
   * @param {string} url - ссылка на аватарку пользователя
   */
  saveUserAvatar (url) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: url})
    })
      .then(this.chekResponse);
  };

  /**
   * Получение добавленных карточек
   */
  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers
    })
      .then(this.chekResponse);
  };

  /**
   * Сохранение новой карточки
   *
   * @param {object} card
   * @param {string} card.name - название карточки
   * @param {string} card.link - url нового изображения
   */
  saveCard = (card) => {
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    })
      .then(this.chekResponse);
  };

  /**
   * Удаление карточки. Удалять можно только свои карточки
   *
   * @param {string} cardId - id карточки
   */
  deleteCard = (cardId) => {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this.chekResponse);
  };

  /**
   * Удаление карточки. Удалять можно только свои карточки
   *
   * @param {string} cardId - id карточки
   * @param {boolean} isLiked - проверка состояния лайка
   */
  toggleLike (cardId, isLiked) {
    return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    })
      .then(this.chekResponse);
  };
}


// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
//   headers: {
//     authorization: '36c8d5bf-5129-4f58-81ea-48641e8f9a0a',
//     'Content-Type': 'application/json'
//   }
// }






