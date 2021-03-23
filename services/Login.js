import constants from '../services/constants.js'



export default class Login {
    constructor() {
        //gets info from database
        this.getData()

    }

    async getData() {
        fetch('https://recipe-book-d760c-default-rtdb.firebaseio.com/security.json').then(response => response.json()).then(response => {
            this.username = response.username;
            this.password = response.password;
        })
    }

    validCredentials(username, password) {
        //compares given username and password with that stored in the database
        if (this.username === username && this.password === password) {
            return true
        } else {
            return false
        }

    }


}