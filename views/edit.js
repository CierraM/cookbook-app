import Login from '../services/Login.js';
import Categories from '../services/Categories.js';
import Recipes from '../services/Recipes.js';
import Search from '../services/Search.js'

const login = new Login();
const categories = new Categories();
const recipes = new Recipes();
await recipes.getData()



/////////////////////////////////////////////////////

const submit = document.querySelector('#submit');
submit.addEventListener('click', e => {
    e.preventDefault()
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    if (login.validCredentials(username, password)) {
        addButtons()

    } else {
        document.querySelector('.error-message').textContent = "invalid username or password. Please try again.";
    }
})

function addButtons() {
    document.querySelector('#login').style.display = 'none';
    // const parent = document.querySelector('#add-edit')
    // parent.innerHTML = `
    // <button id="addBtn">Add new Recipe</button>
    // `
    createAddForm()

    // document.querySelector('#editBtn').addEventListener('click', createEditForm)
}



/////////////////////////////////////////////////


function createAddForm() {

    // an empty form with a dropdown for selecting a category. You use it to add a new recipe
    //options is an array of category names
    const options = categories.getCategoryNames();
    const parent = document.querySelector('#edit-form')

    //Reset the form if there is anything in it
    parent.innerHTML = `
<h2>Add A New Recipe</h2>
    <label for="categorySelect">Select a category: <select id="categorySelect" required>
    <option value="">--Choose a category--</option>
    </select></label>
    <label for="recipeName">Name:<input type="text" id="recipeName" required></label>
    <label for="recipeComment">Comment:<textarea id="recipeComment" cols="30" rows="10"></textarea></label>
    <div class="subrecipe-form">
        <h4>Subrecipe</h4>
        <label for="subRecipeName0">Name:<input type="text" id="subRecipeName0" value="main"></label>
        <label for="ingredients0">Ingredients: Please separate with ";".<textarea id="ingredients0" cols="30" rows="10"></textarea></label>
        <label for="instructions0">Instructions:<textarea id="instructions0" cols="30" rows="10"></textarea></label>
    </div>
    <button id="addNewSubrecipe">Add Another Subrecipe</button>
    <button id="addRecipeSubmit">Add Recipe</button>
`
    //Populate the select element
    let select = document.querySelector('#categorySelect')
    options.forEach(category => {
        let option = document.createElement('option')
        option.value = category;
        option.textContent = category;
        select.appendChild(option)
    })
    let subRecipesCounter = 1;

    //add a new subrecipe
    document.querySelector('#addNewSubrecipe').addEventListener('click', (e) => {
        e.preventDefault()
        let submit = document.querySelector('#addNewSubrecipe')
        let newSubRecipe = document.createElement('div')
        newSubRecipe.classList.add('subrecipe-form')
        newSubRecipe.innerHTML = `
    <h4>Subrecipe</h4>
    <label for="subRecipeName${subRecipesCounter}">Name (main):<input type="text" id="subRecipeName${subRecipesCounter}"></label>
        <label for="ingredients${subRecipesCounter}">Ingredients: Please separate with ";".<textarea id="ingredients${subRecipesCounter}" cols="30" rows="10"></textarea></label>
        <label for="instructions${subRecipesCounter}">Instructions:<textarea id="instructions${subRecipesCounter}" cols="30" rows="10"></textarea></label>
    `
        document.querySelector('#edit-form').insertBefore(newSubRecipe, submit);
        subRecipesCounter ++
    })

    //handle information upon submitting to go to the database
    document.querySelector('#addRecipeSubmit').addEventListener('click', (e) => {
            subRecipesCounter = 1
            e.preventDefault()
            let recipeData = new Object();
            recipeData.category = document.querySelector('#categorySelect').value
            recipeData.name = document.querySelector('#recipeName').value
            recipeData.comment = document.querySelector('#recipeComment').value
            let subRecipes = document.querySelectorAll(".subrecipe-form")
            recipeData.subRecipes = {}
            
            for (let i = 0; i < subRecipes.length; i++) {
                
                let name = document.querySelector(`#subRecipeName${i}`).value
                recipeData.subRecipes[name] = {};

                let ingredients = document.querySelector(`#ingredients${i}`).value.split(';').map(item => item.trim()).join(';')
                

                let instructions = document.querySelector(`#instructions${i}`).value
                
                recipeData.subRecipes[name].ingredients = ingredients
                recipeData.subRecipes[name].instructions = instructions
                
                
            }
            
            document.querySelector('#edit-form').reset()
            document.querySelectorAll('.subrecipe-form').forEach((item, index) => {
                if (index !== 0){
                    item.remove()
                }
            })
            recipes.upLoadRecipe(recipeData)
        })
}

//////////////////////////////////////////////////
//TODO: finish edit form
//TODO: add recipes
// function createEditForm(e) {
//     e.preventDefault()
//     //a form with some dropdowns to select which recipe you want to edit. Also includes a delete button.

//     const categoryOptions = categories.getCategoryNames();

//     const parent = document.querySelector('#add-edit')
//     parent.innerHTML = `
//     <h2>Edit Recipe</h2>
//     <label for="categorySelect">Select a category: <select id="categorySelect" required>
//     <option value="">--Choose a category--</option>
//     </select></label>
//     `
//     //start with category select, then add recipe select, then add prefilled rest of the form.
//     //categorySelect: a select element for categories
//     let categorySelect = document.querySelector('#categorySelect')
//     categoryOptions.forEach(category => {
//         let option = document.createElement('option')
//         option.value = category;
//         option.textContent = category;
//         categorySelect.appendChild(option)
//     })

//     categorySelect.addEventListener('change', renderNameSelect)

//     function renderNameSelect() {
//         if (!document.getElementById('recipeName')){
//             let label = document.createElement('label')
//             label.setAttribute('for', 'recipeName');
//             label.innerHTML = `
//             Name:<select id="recipeName">
//             <option value="">--Choose a recipe--</option>
//             </select>
//             `
//             parent.appendChild(label)
//         } else {
//             document.getElementById('recipeName').innerHTML = '<option value="">--Choose a recipe--</option>'
//         }
//         let value = categorySelect.value;
//         let recipeOptions = recipes.getRecipes(value);


//         for (let item in recipeOptions) {
//             let option = document.createElement('option')
//             option.value = item;
//             option.textContent = item;
//             document.querySelector('#recipeName').appendChild(option)
//         }

//         document.querySelector('#recipeName').addEventListener('change',(e) => {
//             populateForm(e)
//         })
//     }

//     function populateForm(e) {
//     //Take the selected recipe and populate the form with its values.
//         let recipeName = e.target.value;
//         let comment = recipes.getComment(recipeName)
//         let subrecipes = recipes.getSubRecipes(recipeName)
//         console.log(subrecipes)
//         let ingredients = subrecipes.main.ingredients
//         if (ingredients == null) {
//             ingredients = ""
//         }
//         let instructions = subrecipes.main.instructions
//         if (instructions == null) {
//             instructions = ""
//         }
//         console.log(ingredients)
//         parent.innerHTML += `<label for="recipeComment">Comment:<textarea id="recipeComment" cols="30" rows="10">${comment}</textarea></label>
//         <div class="subrecipe-form">
//             <h4>Subrecipe</h4>
//             <label for="subRecipeName0">Name:<input type="text" id="subRecipeName0" value="main"></label>
//         <label for="ingredients0">Ingredients: Please separate with ";".<textarea id="ingredients0" cols="30" rows="10" value=${ingredients}></textarea></label>
//         <label for="instructions0">Instructions:<textarea id="instructions0" cols="30" rows="10" value=${instructions}></textarea></label>
//     </div>
//     <button id="addNewSubrecipe">Add Another Subrecipe</button>
//     <button id="addRecipeSubmit">Add Recipe</button>`

//     }

// }

const search = new Search()