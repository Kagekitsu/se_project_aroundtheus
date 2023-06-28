export default class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          console.log("Done with initial card");
        });
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          console.log("Done with user info");
        });
    }

    editProfileInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      })
      .then((response) => {
        return response;
      })
      .finally(() => {
        console.log("Finish sending info to server");
      });
    }

    addNewCard({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          link
        })
      })
      .then((response) => {
        return response;
      })
      .finally(() => {
        console.log("Finish adding cards from server");
      });
    }

    deleteCardRequest(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).finally(() => {
        console.log("Done deleting card");
      });
    }

    likesCountAdd(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      })
        .then((result) => {
          return result;
        })
        .finally(() => {
          console.log("Done adding like");
        });
    }
  
    likesCountRemove(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
        .then((result) => {
          return result;
        })
        .finally(() => {
          console.log("Done deleting like");
        });
    }
  }
  