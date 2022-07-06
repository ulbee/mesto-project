import {getUser, saveUserInfo} from "./api.js";

const profile = document.querySelector('.profile');
const userAvatar = profile.querySelector('.profile__avatar');
const editProfileBtn = profile.querySelector('.profile__edit-button');
const userName = profile.querySelector('.profile__title');
const userInfo = profile.querySelector('.profile__subtitle');
const addPictureBtn = profile.querySelector('.profile__add-button');

const init = () => {
    getUser()
    .then((user)=> {
        userName.textContent = user.name;
        userInfo.textContent = user.about;
        userAvatar.src = user.avatar;
    })
    .catch(err => console.log(err));
}

const saveUser = (userData) => {
    saveUserInfo(userData)
    .then((user)=> {
        userName.textContent = user.name;
        userInfo.textContent = user.about;
    })
    .catch(err => console.log(err));
}

export {init, saveUser};