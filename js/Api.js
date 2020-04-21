class Api {
    constructor(baseUrl, token) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    // Надо исправить
    // Done! Токен и базовый URL необходимо передать в класс как параметр
    editUserInfo(updatedName, updatedAbout) {
        return fetch(`${this.baseUrl}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: updatedName,
                    about: updatedAbout
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }) // Done! Этот then лишний, надо убрать
            .catch(errorMessage => {
                throw new Error(errorMessage);
            });
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
                headers: {
                    authorization: this.token
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(errorMessage => {
                throw new Error(errorMessage);
            })
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
                headers: {
                    authorization: this.token
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(errorMessage => {
                throw new Error(errorMessage);
            })
    }

    addCard(name, link) {
        return fetch(`${this.baseUrl}/cards`, {
                method: 'POST',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .catch(errorMessage => {
                throw new Error(errorMessage);
            })
    }
}