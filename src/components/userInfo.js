import * as Popup from "./modal";
import {api} from "./api";
import {showSaveButtonState} from "./validate";
import {Card} from "./card";
import * as User from "./user";

const profile = document.querySelector('.profile');
const userAvatar = profile.querySelector('.profile__avatar');
const userName = profile.querySelector('.profile__title');
const userInfo = profile.querySelector('.profile__subtitle');

let userId;

class UserInfo {
  constructor(data) {
    this._name = data.name;
    this._about = data.about;
    this._avatar = data.avatar;
    this._id = data._id;
  }

  // Функция сохранения информации о пользователе
  _saveProfileInfo(name, about) {
    const userData = {
      name: name,
      about: about
    }

    api.saveUserInfo(userData)
      .then((res)=> {
        this._name = res.name;
        this._about = res.about;
      })
      .catch(err => console.log(err))
  }

// Функция обновления аватара пользователе
  _saveAvatar(avatar) {
    api.saveUserAvatar(avatar)
      .then((res) => {
        this._avatar = res.avatar;
      })
      .catch(err => console.log(err))
  }

  _getUserInfo() {
      const userDataPromise = api.getUser();

      userDataPromise
        .then((res) => {
          const userInfo = {
            name: res.name,
            about: res.about,
            id: res.id,
            avatar: res.avatar
          };
        })
        .catch((error) => {
          console.log('Ошибка: ' + error);
        })
    }
    setUserInfo(userData) {
      saveProfileInfo();
      saveAvatar();
    }
}


const init = (user) => {
  userName.textContent = user.name;
  userInfo.textContent = user.about;
  userAvatar.src = user.avatar;

  userId = user._id;
}

const getUserId = () => {
  return userId;
}



export {init, getUserId};