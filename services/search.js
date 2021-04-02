import  Categories from './Categories.js'

// functions to use with the search bar. filter through recipes to find some containing searched characters.
//Make those into an array. Display them in the category.html when enter is pressed

export default class Search {

constructor(){
    //listens for input
    let input = document.querySelector('.search')
    input.addEventListener('keyup', e => {
        if (e.keyCode === 13){
            this.search()
        }
    })
    this.results = []
    this.query = ""
}

search(){
    //searches through recipes
    
    const categories = new Categories();

    this.query = document.querySelector('.search').value

    window.sessionStorage.setItem('recipeSearch', this.query)
    let encoded = encodeURIComponent('search')

    let href = `./category.html?category=${encoded}`
    window.location.href = href
}

redirect(){
    let encoded = encodeURIComponent('search')
    let href = `./category.html?category=${encoded}`
    window.location.href = href
}
}


