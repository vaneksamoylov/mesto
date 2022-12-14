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

  editUserProfile(name, about) {
    // console.log(name, about)
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        'name': name,
        'about': about
      })
    })
      .then((res) => {
        // console.log(res)
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(res.status);
        }
      })
      .catch(console.log)
  }


  getCardsFromServer() {
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
}
