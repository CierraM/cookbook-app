
export default class Categories {
    constructor(){
        this.getData();
    }

    async getData(){
        fetch('https://recipe-book-d760c-default-rtdb.firebaseio.com/supercategories.json').then(response => response.json()).then(response => {
            this.data = response;
        })
    }

    getCategoryNames(){

        let subCategories = []
        
        Object.values(this.data).forEach(superCategory => {
            if (!superCategory.subcategories) return
            Object.keys(superCategory.subcategories).forEach(category => {
                subCategories.push(category)
            })
        })


        return subCategories
    }

    
}