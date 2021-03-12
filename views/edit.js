import Login from '../services/Login.js';
import SuperCategories from '../services/SuperCategories.js';
import Categories from '../services/Categories.js';
import Recipes from '../services/Recipes.js';
import SubRecipes from '../services/SubRecipes.js';

const login = new Login();

const submit = document.querySelector('#submit');
submit.addEventListener('click', e => {
    e.preventDefault()
    console.log('clicked')
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    if (login.validCredentials(username, password)) {
        addButtons()
        
    }
    else {
        document.querySelector('.error-message').textContent = "invalid username or password. Please try again.";
    }
})

function addButtons () {

}
