import SuperCategories from '../services/SuperCategories.js'
import Categories from '../services/Categories.js'
import Recipes from '../services/Recipes.js'

const superCategories = new SuperCategories();
await superCategories.getData()

///////////////////////////////////////////////////////
//Decode supercategory from the url and put it in the header
const queryString = window.location.search;
const thisCategory = decodeURIComponent(queryString).split('?category=')[1]
document.getElementById('category').innerHTML = thisCategory

//Find out what supercategory we are on, and get the list of subcategories that goes with it
const allData = superCategories.getAll()
if (allData[thisCategory].subcategories === undefined){
    document.getElementById('recipeList').innerHTML = "<h4 class='error-msg'>Recipes Not Found</h4>"
} else {
//put comment in its field if there is one
let comment 
if (allData[thisCategory].comment) {
    comment = allData[thisCategory].comment
    document.getElementById('quote').innerHTML = comment
}


//list subcategories and recipes
const subCategories = Object.keys(allData[thisCategory].subcategories)
const recipeList = document.getElementById('recipeList')
subCategories.forEach(subcategory => {
    let recipes = allData[thisCategory].subcategories[subcategory].recipes
    
    let h4 = document.createElement('h4')
    h4.textContent = subcategory

    let aside = document.createElement('aside');
    let quote = allData[thisCategory].subcategories[subcategory].comment
    if (quote) {
        aside.textContent = quote
        aside.classList.add("quote")
    }

    let ul = document.createElement('ul')
    ul.classList.add("recipeList")
    for (let recipe in recipes) {
        let encodedRecipe = encodeURIComponent(recipe)
        let encodedCategory = encodeURIComponent(thisCategory)
        let li = document.createElement('li');
        let link = document.createElement('a');
        link.setAttribute('href', `./recipe.html?recipe=${encodedRecipe}&/category=${encodedCategory}`)
        link.textContent = recipe;
        li.appendChild(link);
        ul.appendChild(li);

    }

    recipeList.appendChild(h4)
    if (aside.textContent){
        recipeList.appendChild(aside)
    }
    recipeList.appendChild(ul)

})
}

/////////////////////////////////////////////////////////////////////
//Create nav:

const menuItems = superCategories.getItems();

const navList = document.querySelector('#recipe-list');
//TODO: add a link at the top to access favorites
menuItems.forEach(menuItem => {
    let encoded = encodeURIComponent(menuItem)
    let li = document.createElement('li');
    let link = document.createElement('a')
    link.setAttribute('href', `./category.html?category=${encoded}`)
    link.setAttribute('target', '_self')
    link.setAttribute('data-category', menuItem)
    li.classList.add('menu-item');
    link.textContent = menuItem
    li.appendChild(link)
    navList.appendChild(li);
})

document.getElementById('nav-button').addEventListener('click', () => {
    let menu = document.getElementById('menu')
    let menuBtn = document.getElementById('nav-button')
    menu.classList.toggle('hidden');
    if (menu.classList.contains('hidden')) {
        menuBtn.textContent = "Browse Recipes"
    }
    else {
        menuBtn.textContent = "X Close"
    }
})