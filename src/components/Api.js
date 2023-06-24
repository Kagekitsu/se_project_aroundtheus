class Api {
    constructor(options) {

    }

    getInitialCards() {
        return fetch('https://around.nomoreparties.co/v1/cohort-3-en', {
            headers: {
                authorization: 'd8b9199f-b9d7-4b7f-ad09-c5597d55941e'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Error: ${res.status}`);
        })
    }
}

const api = new Api ({
    baseUrl: 'https://around.nomoreparties.co/v1/group-42', 
    headders : {
    authorization: "d8b9199f-b9d7-4b7f-ad09-c5597d55941e",
    "Content-Type": "application/json"
    }
});