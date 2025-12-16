
//importing express module
const express = require('express');

//creating router instance
const router = express.Router();


//getting access to info.json file
const fs = require('fs');
const { start } = require('repl');

//reading and parsing json data
let rawdata = fs.readFileSync('./info.json'); 
let employee = JSON.parse(rawdata); //converting json string to javascript object

//defining routes
router.get('/', (req, res) => {
    let outputJSON = {
        employees: employee["data"]
    }
    res.json(outputJSON); 
});

//FILERTING DATA 

//filter by name 
router.get('/by_name/:qname', (req, res) => {
    let query = req.params['qname'] //getting query parameter from url
    filtered_employees = employee["data"].filter(q => q.employee_name.includes(query)) //filtering data by employee names 
    let outputJSON = {
        employees : filtered_employees //creating filtered output json object 
    }
    res.json(outputJSON); //sending response as json
})

//filter by age
router.get('/by_age/:start_age/:end_age', (req, res) => {
   let start_age = req.params['start_age'] //getting start age parameter from url
    let end_age = req.params['end_age'] //getting end age parameter from url
    filtered_employees = employee["data"].filter( //filtering data by age range
        q => {
            if (q.employee_age > parseInt(start_age) && q.employee_age < parseInt(end_age)) { //comparing employee age with start and end age
                return true 
            }
            return false; //else
        }
    );
    let outputJSON = {
        employees : filtered_employees //creating filtered output json object
    }
    res.json(outputJSON); //sending response as json

})


//exporting the router and make it available outside this file
module.exports = router;
