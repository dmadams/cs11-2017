var fs = require("fs");

var getBonusedEmployees = function(employees, bonuses) {
    var newEmployees = JSON.parse(JSON.stringify(employees));
    var log = "";
    for(var i = 0; i < employees.length; i ++) {
        if(bonuses[employees[i].id]) {
            newEmployees[i].salary += employees[i].yearsWorking * 1000;
            log += makeLog(newEmployees[i]);
        }
    }
    fs.writeFile("bonusedEmployees.json", JSON.stringify(newEmployees), "utf8", function(err, data) {
        if(err) { throw err; }
    });
    fs.writeFile("log.txt", log, "utf8", function(err, data) {
        if(err) { throw err; }
    });
    console.log("Done updating employee salaries.");
};

var makeLog = function(employee) {
    var log = "ID: "+ employee.id + ", ";
    log += "Name: " + employee.name.first + " " + employee.name.last + ", ";
    log += "New Salary: " + employee.salary + "\n";
    return log;
};

module.exports = {
    getBonusedEmployees: getBonusedEmployees,
    makeLog: makeLog
};