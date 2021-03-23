import Recipes from '../services/Recipes.js';


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
for (let subRecipe in subRecipeList) {
    let name = subRecipe
    if (name == 'main') {
        name = ''
    }
    let wrapper = document.createElement('div')
    wrapper.classList.add('subrecipe')

    let h3 = document.createElement('h3');
    h3.classList.add('subrecipe-title')
    h3.innerHTML = name
    wrapper.appendChild(h3)

    let ul = document.createElement('ul')
    ul.classList.add('ingredients-list')
    let ingredients = recipes.parseIngredients(subRecipeList[subRecipe].ingredients)
    ingredients.forEach(ingredient => {
        let li = document.createElement('li');
        li.textContent = ingredient
        ul.appendChild(li);
    })
    wrapper.appendChild(ul);

    let instructions = document.createElement('p')
    instructions.innerHTML = subRecipeList[subRecipe].instructions
    wrapper.appendChild(instructions)


    document.getElementById('instructions').appendChild(wrapper)
}
}

