var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var functions = require("./functions");

var employees = fs.readFileAsync("./employees.json");
var bonuses = fs.readFileAsync("./bonuses.json");

Promise.all([employees, bonuses]).spread(function(employees, bonuses) {
    functions.getBonusedEmployees(JSON.parse(employees), JSON.parse(bonuses));
});