// A basic template for my other service classes. 
// A class is in charge of reading, updating, and 
//deleting information to and from the database.
import constants from './constants';

export default class Template {
    constructor() {
        var Airtable = require('airtable');
        var base = new Airtable({
            apiKey: constants.API_KEY
        }).base('app7gKPCl56Z87kgA');

        base('supercategories').find('rec0bbY8809HyxTka', function (err, record) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Retrieved', record.id);
        });
    }

    getAll() {
        //a method that gets all the information for this table
    }

    getOne() {
        //A method that gets one item from the category
    }

    addItem() {
        //adds a new item to the category
    }

    editItem() {
        //overWrites an item in the category
    }

    deleteItem() {
        //deletes the item from the category.
    }


}