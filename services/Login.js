import constants from '../assets/constants.js'
import Airtable, {Base} from "../assets/airtable.js"


export default class Login {
        constructor() {
            //gets info from database
            this.username = ''
            this.password = ''
            this.base = new Airtable({apiKey: constants.API_KEY}).base('app7gKPCl56Z87kgA');
            base('security').select({
                // Selecting the first 3 records in Grid view:
                maxRecords: 3,
                view: "Grid view"
            }).eachPage((records, fetchNextPage) => {
                // This function (`page`) will get called for each page of records.
            
                records.forEach((record) => {
                    this.password = record.fields.password;
                    this.username = record.fields.username;
                });
            
                // To fetch the next page of records, call `fetchNextPage`.
                // If there are more records, `page` will get called again.
                // If there are no more records, `done` will get called.
                fetchNextPage();
            
            }, function done(err) {
                if (err) { console.error(err); return; }
            });
        }

        validCredentials(username, password) {
            //compares given username and password with that stored in the database
            if (this.username === username && this.password === password) {
                return true
            }

        }

    
}