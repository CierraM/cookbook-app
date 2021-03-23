import SuperCategories from '../services/SuperCategories.js';
//TODO: add search bar functionality

//Create nav:
const superCategories = new SuperCategories();
await superCategories.getData()
const menuItems = superCategories.getItems();

const navList = document.querySelector('#recipe-list');
//TODO: add a link at the top to access favorites
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

document.getElementById('nav-button').addEventListener('click', (e) => {
    let menu = document.getElementById('menu')
    let menuBtn = document.getElementById('nav-button')
    menu.classList.toggle('hidden');
    if (menu.classList.contains('hidden')) {
        menuBtn.textContent = "Browse Recipes"
    }
    else {
        menuBtn.textContent = "X Close"
    }
    
    
})


