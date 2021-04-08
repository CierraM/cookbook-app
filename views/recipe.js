import Recipes from '../services/Recipes.js';
import Search from '../services/search.js'

async function main() {
const recipes = new Recipes();
await recipes.getData();
////////////////////////////////////////////////////////////////////////
//decode previous category and recipe name from url
const queryString = window.location.search;
const string = decodeURIComponent(queryString);

const previousCategory = string.split('?recipe=')[1].split('&/category=')[1]
const recipeName = string.split('?recipe=')[1].split('&/category=')[0]

//link back to previous category
let encodedCategory = encodeURIComponent(previousCategory);
let backButton = document.getElementById('back');
backButton.setAttribute('href', `./category.html?category=${encodedCategory}`);

////////////////////////////////////////////////////////////////////////
//Fill in the data
document.getElementById('recipeName').innerHTML = recipeName;

let comment = recipes.getComment(recipeName);

if (comment) {
    document.getElementById('quote').innerHTML = comment;
}

let subRecipeList = recipes.getSubRecipes(recipeName);
if (subRecipeList === null) {
    document.getElementById('instructions').innerHTML = '<h4 class="error-msg">This recipe has not been added yet.</h4>'
}
else{
//add ingredients
let arr = []
for (let subRecipe in subRecipeList) {
    arr.push(subRecipe)
}
    //Create an array that has the subrecipes sorted by index
    let sortedNames = arr.sort((val1, val2) => subRecipeList[val1].index - subRecipeList[val2].index)
    

    let sortedRecipes = []
    sortedNames.forEach(name => {
        let newSubRecipe = {}
        newSubRecipe[name] = subRecipeList[name]
        sortedRecipes.push(newSubRecipe)
    })

    sortedRecipes.forEach(subRecipe => {
    let name = Object.keys(subRecipe)[0]
    
    if (name == 'main') {
        name = 'Ingredients: '
    }
    let wrapper = document.createElement('div')
    wrapper.classList.add('subrecipe')

    let h3 = document.createElement('h3');
    h3.classList.add('subrecipe-title')
    h3.innerHTML = name
    wrapper.appendChild(h3)

    let ul = document.createElement('ul')
    ul.classList.add('ingredients-list')
    
    let ingredients = recipes.parseIngredients(subRecipeList[Object.keys(subRecipe)[0]].ingredients)
    ingredients.forEach(ingredient => {
        let li = document.createElement('li');
        li.textContent = ingredient
        ul.appendChild(li);
    })
    wrapper.appendChild(ul);

    let heading = document.createElement('h3')
    heading.classList.add('instructions-heading')
    heading.innerHTML = 'Instructions:'
    let instructions = document.createElement('p')
    instructions.classList.add('instructions')
    instructions.innerHTML = subRecipeList[Object.keys(subRecipe)[0]].instructions
    wrapper.appendChild(heading)
    wrapper.appendChild(instructions)


    document.getElementById('instructions').appendChild(wrapper)

    
})
}

////////////////////////////////////////////////////////////
//Favorites

//check if something is favorited
let myFavorites = localStorage.getItem('favorites')
if (myFavorites){
    JSON.parse(myFavorites).forEach(favorite => {
        if (favorite == recipeName) {
            document.getElementById('favorite').innerHTML = '♥'
        }
    })
}


//set and unset favorites
let favoritesIcon = document.getElementById('favorite')
favoritesIcon.addEventListener('click', ()=>{
    let favorites
    if (!localStorage.getItem('favorites')){
       favorites = []
    } else {
        favorites = JSON.parse(localStorage.getItem('favorites'))
    }
    if (favoritesIcon.innerHTML == '♡'){
        favoritesIcon.innerHTML = '♥'
        favorites.push(recipeName)
        
    }
    else if (favoritesIcon.innerHTML == '♥'){
        favoritesIcon.innerHTML = '♡'
        let index = favorites.indexOf(recipeName)
        if (index > -1) {
            favorites.splice(index, 1);
        }
        
    }
    localStorage.setItem('favorites', JSON.stringify(favorites))
})

const search = new Search()
}
main()