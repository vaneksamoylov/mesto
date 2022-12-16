export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(res.status);
        }
      })
      .catch(console.log)
  }

  editUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        'avatar': avatar
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(res.status);
        }
      })
      .catch(console.log)
  }

  editUserProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        'name': name,
        'about': about
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(res.status);
        }
      })
      .catch(console.log)
  }

  // getCardsFromServer
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(res.status);
        }
      })
      .catch(console.log);
  }

  addCardToServer(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        'name': name,
        'link': link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(res.status);
        }
      })
      .catch(console.log)
  }

  deleteCardFromServer(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        'name': name,
        'link': link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(res.status);
        }
      })
      .catch(console.log)
  }

  addLikeToCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(res.status);
        }
      })
      .catch(console.log)
  }

  deleteLikeFromCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(res.status);
        }
      })
      .catch(console.log)
  }
}
