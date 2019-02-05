var fs = require("fs");
var functions = require("./functions");

var employees = null;
var bonuses = null;

fs.readFile("./employees.json", function(err, data) {
    if (err) { throw err; }
    employees = JSON.parse(data);

    if(employees && bonuses) {
        functions.getBonusedEmployees(employees, bonuses);
    }
});
  
fs.readFile("./bonuses.json", function(err, data) {
    if (err) { throw err; }
    
    bonuses = JSON.parse(data);

    if(employees && bonuses) {
        functions.getBonusedEmployees(employees, bonuses);
    }
});