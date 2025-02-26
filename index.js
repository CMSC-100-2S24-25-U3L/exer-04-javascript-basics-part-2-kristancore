import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { appendFileSync } from 'node:fs';

function generateUniqueID(fname, lname) {
    // return a concatenated string of the first name's first letter, the last name, and the generated id; all in lowercase
    return fname[0].toLowerCase() + lname.toLowerCase() + uuidv4().substring(0,7).toLowerCase();
}

function addAccount([fname, lname, email, age]) {
    // check if all fields are present
    if(fname == undefined || lname == undefined || email == undefined || age == undefined) {
        return false;
    }
    // check if the first three indexes are non-empty strings
    if(validator.isEmpty(fname) == true || validator.isEmpty(lname) == true || validator.isEmpty(email) == true){
        return false;
    }

    // check if the email is in valid format using the validator package
    if(validator.isEmail(email) == false) {
        return false;
    }

    // check if the age is at least 18
    if(age < 18){
        return false;
    }

    // concatenate all needed information into one line to be written to file user.txt
    let data = fname+","+lname+","+email+","+age+","+generateUniqueID(fname,lname);
    
    // append data to file 'user.txt'
    appendFileSync('user.txt',data);
    return true;
}

export default {generateUniqueID, addAccount}