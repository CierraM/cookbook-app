import SuperCategories from '../services/SuperCategories.js';
import Search from '../services/search.js'
//TODO: add search bar functionality

//Create nav:
const superCategories = new SuperCategories();
await superCategories.getData()
const menuItems = superCategories.getItems();

const navList = document.querySelector('#recipe-list');
let encoded = encodeURIComponent('favorites')
let li = document.createElement('li');
let link = document.createElement('a')
link.setAttribute('href', `./category.html?category=${encoded}`)
li.classList.add('menu-item');
link.textContent = 'Favorites'
li.appendChild(link)
navList.appendChild(li);

menuItems.forEach(menuItem => {
    let encoded = encodeURIComponent(menuItem)
    let li = document.createElement('li');
    let link = document.createElement('a')
    link.setAttribute('href', `./category.html?category=${encoded}`)
    link.setAttribute('target', '_self')
    li.classList.add('menu-item');
    link.textContent = menuItem
    li.appendChild(link)
    navList.appendChild(li);
})

// document.getElementById('nav-button').addEventListener('click', toggleNav, true)
document.querySelector('nav button').addEventListener('touchend', toggleNav, true)

function toggleNav(e) {
    try {
    console.log('clicked')
    
    e.preventDefault()
    
    let menu = document.getElementById('menu')
    let menuBtn = document.getElementById('nav-button')
    menu.classList.toggle('hidden');
    menu.classList.toggle('expanded')
    if (menu.classList.contains('hidden')) {
        menuBtn.textContent = "Browse Recipes"
    }
    else {
        menuBtn.textContent = "X Close"
    }
    document.body.innerHTML += '<p>You clicked the button successfully</p>'
}
catch{
    alert(error.message)
}
}



const search = new Search()