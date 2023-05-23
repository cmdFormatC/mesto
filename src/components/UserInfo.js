export default class Userinfo {
    constructor (data) {
        this._userInfoElement = document.querySelector(data.userInfo);
        this._userNameElement = document.querySelector(data.userName);
    }
    getUserInfo() {
        const userData = {
            userName: this._userNameElement.textContent,
            userInfo: this._userInfoElement.textContent
        }
        return userData
    }
    setUserInfo(name, description) {
        this._userNameElement.textContent = name;
        this._userInfoElement.textContent = description;
    }
}