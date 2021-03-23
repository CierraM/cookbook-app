
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
}