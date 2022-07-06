const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
      authorization: '36c8d5bf-5129-4f58-81ea-48641e8f9a0a',
      'Content-Type': 'application/json'
    }
  }

const getUser = () => {
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
 * @param {string} userData.avatar - url аватара пользователя
 */
const saveUserInfo = (userData) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({...userData})
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

const getInitialCards = () => {
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
  
export {getUser, saveUserInfo, getInitialCards};