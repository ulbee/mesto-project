const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
      authorization: '36c8d5bf-5129-4f58-81ea-48641e8f9a0a',
      'Content-Type': 'application/json'
    }
  }

export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const saveCard = (card) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(card)
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const toggleLike = (cardId, action) => {
    const method = action === 'delete' ? 'DELETE' : 'PUT';
    
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: method,
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }); 
};
