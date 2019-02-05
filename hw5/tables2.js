var SortTable = function(id, types) {
    "use strict";
    this.id = id;
    this.columns = document.getElementById(id).children[0].children[0].children;
    this.types = [];
    for(var i = 0; i < this.columns.length; i ++) {
        if(types[i]) {
            this.types.push(types[i]);
        }
        else {
            this.types.push(String);
        }
    }
    this.asc = true;
    this.sortCol;
    
    for(var i = 0; i < this.columns.length; i++) {
        this.columns[i].addEventListener("click", this.sortColumn(i));
    }
};

SortTable.prototype.sortColumn = function(i) {
    "use strict";
    var column = this.columns[i];
    if (!this.sortCol) {
        this.sortCol = column;
        column.style["color"] = "blue";
        this.asc = true;
    }
    else if(column.innerHTML !== this.sortCol.innerHTML) {
        column.style["color"] = "blue";
        this.sortCol.style["color"] = "";
        this.sortCol = column;
        this.asc = true;
    }
    else if(column.style["color"] === "blue") {
        column.style["color"] = "red";
        this.asc = false;
    }
    else {
        column.style["color"] = "blue";
        this.asc = true;
    }

    var type;
    if(this.types[i] === Number) {
        type = "num";
    }
    else {
        type = "str";
    }
    var table = document.getElementById(this.id);
    var rows, sorting, j, x, y, shouldSwitch;
    if(this.asc) {
        sorting = true;
        while (sorting) {
            sorting = false;
            rows = table.getElementsByTagName("TR");
            for (j = 1; j < (rows.length - 1); j ++) {
                shouldSwitch = false;
                x = rows[j].getElementsByTagName("TD")[i];
                y = rows[j + 1].getElementsByTagName("TD")[i];
                if(type === "num") {
                    if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                        shouldSwitch= true;
                        break;
                    }
                }
                else {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch= true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[j].parentNode.insertBefore(rows[j + 1], rows[i]);
                sorting = true;
            }
        } 
    }
    else {
        sorting = true;
        while (sorting) {
            sorting = false;
            rows = table.getElementsByTagName("TR");
            for (j = 1; j < (rows.length - 1); j ++) {
                shouldSwitch = false;
                x = rows[j].getElementsByTagName("TD")[i];
                y = rows[j + 1].getElementsByTagName("TD")[i];
                if(type === "num") {
                    if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                        shouldSwitch= true;
                        break;
                    }
                }
                else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch= true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[j].parentNode.insertBefore(rows[j + 1], rows[i]);
                sorting = true;
            }
        } 
    }
};
