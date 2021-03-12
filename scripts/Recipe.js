//A template for a recipe and a subrecipe

class Recipe {
    constructor(name, comment="", category, subrecipes) {
        //name: a string
        //comment: a string
        //category: a string
        //subrecipes: an array of subrecipe objects
        this.name = name;
        this.comment = comment;
        this.category = category;
        this.subrecipes = subrecipes;
    }   
}

class SubRecipe {
    constructor(name, ingredients, instructions){
        //name: a string
        //ingredients: a string of ingredients separated by ;
        //instructions: a string
        //these match the data as it should be formatted in the database
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }

    ingredientsToList() {
        return this.ingredients.split(';').trim()
    }
}