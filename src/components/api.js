const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
      authorization: '36c8d5bf-5129-4f58-81ea-48641e8f9a0a',
      'Content-Type': 'application/json'
    }
  }

const chekResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

/**
 * Получение данных о пользователе
 */
export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(chekResponse);
};

/**
 * Сохранение данных пользователя
 * 
 * @param {object} userData 
 * @param {string} userData.name - имя пользователя 
 * @param {string} userData.about - дополнительная информация о пользователе
 */
export const saveUserInfo = (userData) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(userData)
    })
    .then(chekResponse);
};

/**
 * Сохранение аватара пользователя
 * 
 * @param {string} url - ссылка на аватарку пользователя 
 */
 export const saveUserAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({avatar: url})
    })
    .then(chekResponse);
};

/**
 * Получение добавленных карточек
 */
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(chekResponse);
};

/**
 * Сохранение новой карточки
 * 
 * @param {object} card
 * @param {string} card.name - название карточки
 * @param {string} card.link - url нового изображения
 */
export const saveCard = (card) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(card)
    })
    .then(chekResponse);
};

/**
 * Удаление карточки. Удалять можно только свои карточки
 * 
 * @param {string} cardId - id карточки
 */
export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(chekResponse);
};

/**
 * Удаление карточки. Удалять можно только свои карточки
 * 
 * @param {string} cardId - id карточки
 * @param {string} action - тип действия. Удаляет лайк при 'delete' и ставит в других случаях
 */
export const toggleLike = (cardId, action) => {
    const method = action === 'delete' ? 'DELETE' : 'PUT';
    
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: method,
        headers: config.headers
    })
    .then(chekResponse); 
};
