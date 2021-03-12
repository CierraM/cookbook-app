export default class EditForm {
    constructor(){
        
    }

    init() {
        //Clear password form and set up add/edit buttons
        //Clear password form
        document.getElementById('login').style.display = 'none';
        //render add/edit options
        let content = `
        <button id="addBtn">Add New Recipe</button>
        <button id="editBtn">Edit Existing Recipe</button>
        `;
        this.render('add-edit', content);
    }

    render(id, content) {
        // renders content to the element with the id
        //element: an element, content: a string of text/html
        let element = document.getElementById(id)
        element.innerHTML = content;
    }

    createAddForm() {
        //Creates a form that allows the user to add a new recipe
        
    }

    createEditForm(){
        //Creates a form that allows the user to edit existing recipe
    }
}