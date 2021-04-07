
export default class SuperCategories {
    constructor(){
        this.data = ""
        this.baseUrl = "https://recipe-book-d760c-default-rtdb.firebaseio.com/supercategories"
    }

    async getData(){
        const response = await fetch('https://recipe-book-d760c-default-rtdb.firebaseio.com/supercategories.json')
        this.data = await response.json();
        
        
    }
    getItems(){
        //returns an array of the available superCategories
        const items = Object.keys(this.data)
        return items
    }

    getAll(){
        return this.data
    }

    getAllRecipes(){
        //Gets a list of every recipe in the database
        let recipes = []
        for (const cat in this.data){
            for (const subCat in this.data[cat].subcategories){
                for (let recipe in this.data[cat].subcategories[subCat].recipes){
                    recipes.push(recipe)
                }
            }
        }
        return recipes
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
    
}