const profile = document.querySelector('.profile');
const userAvatar = profile.querySelector('.profile__avatar');
const userName = profile.querySelector('.profile__title');
const userInfo = profile.querySelector('.profile__subtitle');

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

export {init, getUserId};