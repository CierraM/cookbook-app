
export default class Recipes{
    constructor(){
        this.data = ""
        
    }

    async getData(){
        const response = await fetch('https://recipe-book-d760c-default-rtdb.firebaseio.com/supercategories.json')
        this.data = await response.json();
        
        
    }

    getComment(recipeName) {
        //Inputs: recipeName (string) the name of the recipe
        //Returns: comment (string) the comment, or an empty string
        for (let supercategory in this.data){
            for (let subcategory in this.data[supercategory].subcategories){
                for (let recipe in this.data[supercategory].subcategories[subcategory].recipes){
                    if (recipe == recipeName) {
                        if (this.data[supercategory].subcategories[subcategory].recipes[recipe].comment) {
                            return this.data[supercategory].subcategories[subcategory].recipes[recipe].comment
                        } else {
                            return ""
                        }
                    }
                }
            }
            
        }
    }
    
    getSubRecipes(recipeName){
        //Inputs: recipeName (string) the name of the recipe
        //Returns: subRecipes (object) a list of subrecipe objects
        for (let supercategory in this.data){
            for (let subcategory in this.data[supercategory].subcategories){
                for (let recipe in this.data[supercategory].subcategories[subcategory].recipes){
                    if (recipe == recipeName) {
                        if (this.data[supercategory].subcategories[subcategory].recipes[recipe].subRecipes){
                            return this.data[supercategory].subcategories[subcategory].recipes[recipe].subRecipes
                        } else if (this.data[supercategory].subcategories[subcategory].recipes[recipe].subrecipes) {
                            return this.data[supercategory].subcategories[subcategory].recipes[recipe].subrecipes
                        }else {
                            return null
                        }
                    }
                }
            }
            
        }
    }

    getRecipes(category) {
        //gets a list of recipe objects from the subcategory provided
        for (let supercategory in this.data){
            for (let subcategory in this.data[supercategory].subcategories){
                
                if (subcategory == category){
                    return (this.data[supercategory].subcategories[subcategory].recipes)
                }
            }
            
        }
    }

    parseIngredients(ingredients) {
        //input: a string with a list of ingredients, separated by ;
        //return: an array of ingredients
        return ingredients.split(';').map(item => {
            return item.trim();
        })
    }

    upLoadRecipe(recipe) {
        // New recipe should come in an object format.Return successful/unsuccesful Example:
        // {
        //     "category": "Name of subcategory",
        //     "name": "name",
        //     "comment": "my fav",
        //     "subRecipes": {
        //         "main": {
        //             "ingredients": "egg, beaten;chocolate;strawberrires",
        //             "instructions": "mix it"
        //         },
        //         "sauce": {
        //             "ingredients": "gravy mix;water",
        //             "instructions": "eat it"
        //         }
        //     }
        // }

        let info = {};

        info[recipe.name] = {}
        info[recipe.name].comment = recipe.comment;
        info[recipe.name].subRecipes = recipe.subRecipes
        
        
        let category = encodeURI(recipe.category)
        let supercategory
        for (let item in this.data) {
            // item == name of supercategory

            if (this.data[item].subcategories){

            if ((Object.keys(this.data[item].subcategories).includes(recipe.category))) {
                supercategory = item
                
            } else{
                // console.log(`nope, ${item} is not in ${this.data.subcategories}`)
            }

        }else {
            // console.log(`${this.data[item]} does not have a subcategories in it.`)
        }
        }
        
        let response;

        let url = `https://recipe-book-d760c-default-rtdb.firebaseio.com/supercategories/${supercategory}/subcategories/${category}/recipes.json`
        
        
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })


    }
}