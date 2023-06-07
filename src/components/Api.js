export default class Api {
    constructor(options) {
        this._avatarSelector = options.avatarSelector;
        this._setUserInfo = options.setUserInfo;
        this._buttonSelector =  options.buttonSelector;
    }
    getUserInfo () {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me', {
            headers: {
            authorization: '5bdde285-08ff-4c09-bc6a-dd3c3893d978'
        }
        })
        .then(res =>  {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
            headers: {
            authorization: '5bdde285-08ff-4c09-bc6a-dd3c3893d978'
        }
        })
        .then(res =>  {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
        return result.map((item) => {
            return {
                name: item["name"],
                link: item["link"],
                likes: item["likes"],
                ownerId: item["owner"]._id,
                cardId: item["_id"]
            }
        })
      })
    }
    editProfile(inputValues) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me', {
            method: 'PATCH',
            headers: {
              authorization: '5bdde285-08ff-4c09-bc6a-dd3c3893d978',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: `${inputValues.profileName}`,
              about: `${inputValues.profileDescription}`
            })
          }); 
    }
    addCard(inputValues) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards ', {
            method: 'POST',
            headers: {
            authorization: '5bdde285-08ff-4c09-bc6a-dd3c3893d978',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputValues.name,
                link: inputValues.link
              }),
        })
        .then(res =>  {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: '5bdde285-08ff-4c09-bc6a-dd3c3893d978'
        }
        })
        .then(res =>  {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    togglelike(cardId, isLiked) {
        if (isLiked) {
            return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: '5bdde285-08ff-4c09-bc6a-dd3c3893d978'
            }
            })
            .then(res =>  {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
        } else {
            return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: '5bdde285-08ff-4c09-bc6a-dd3c3893d978'
            }
            })
            .then(res =>  {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
        }   
    }
    updateAvatar(url) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me/avatar ', {
            method: 'PATCH',
            headers: {
            authorization: '5bdde285-08ff-4c09-bc6a-dd3c3893d978',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: url
              }),
        })
        .then(res =>  {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}