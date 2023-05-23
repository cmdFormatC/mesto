export default class Userinfo {
    constructor (data) {
        this._userInfo = data.userInfo;
        this._userName = data.userName;
        this._userInfoElement = document.querySelector(this._userInfo);
        this._userNameElement = document.querySelector(this._userName);
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