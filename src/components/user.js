import {saveUserAvatar, saveUserInfo} from "./api.js";
import * as Popup from "./modal.js";

const profile = document.querySelector('.profile');
const userAvatar = profile.querySelector('.profile__avatar');
const editProfileBtn = profile.querySelector('.profile__edit-button');
const userName = profile.querySelector('.profile__title');
const userInfo = profile.querySelector('.profile__subtitle');
const addPictureBtn = profile.querySelector('.profile__add-button');




let userId;

const init = (user) => {
    userName.textContent = user.name;
    userInfo.textContent = user.about;
    userAvatar.src = user.avatar;

    userId = user._id;
}

const getUserId = () => {
    return userId;
}

const saveUser = (userData) => {
    saveUserInfo(userData)
    .then((user)=> {
        userName.textContent = user.name;
        userInfo.textContent = user.about;
    })
    .catch(err => console.log(err));
}

export {init, saveUser, getUserId};