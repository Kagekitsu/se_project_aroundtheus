class Api {
    constructor(options) {

    }

    getInitialCards() {

    }
}

const api = new Api ({
    baseUrl: 'https://around.nomoreparties.co/v1/group-42', 
    headders : {
    authorization: "d8b9199f-b9d7-4b7f-ad09-c5597d55941e",
    "Content-Type": "application/json"
    }
});