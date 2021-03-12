import {API_KEY} from './constants.js';
import EditForm from './EditForm.js';

var Airtable = require('airtable');
var base = new Airtable({apiKey: API_KEY}).base('app7gKPCl56Z87kgA');
const editForm = new EditForm();

let password
let username

base('security').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 3,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        password = record.fields.password;
        username = record.fields.username;
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});

function validate(e){
    let usernameInput = document.getElementById('username').value;
    let passwordInput = document.getElementById('password').value;

    if (usernameInput === username && passwordInput === password) {
        editForm.init()
    }
    else{
        document.querySelector('.error-message').textContent = "Username or password incorrect."
    }
    e.preventDefault()
}

document.getElementById('submit').addEventListener('click', validate);

editForm.init(); //This line is for testing purposes only.