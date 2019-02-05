var asc = true;
var sortCol;
function sortColumn(column) {
    "use strict";
    if (!sortCol) {
        sortCol = column;
        column.style.color = "blue";
        asc = true;
    }
    else if(column.innerHTML !== sortCol.innerHTML) {
        column.style.color = "blue";
        sortCol.style.color = "";
        sortCol = column;
        asc = true;
    }
    else if(column.style.color === "blue") {
        column.style.color = "red";
        asc = false;
    }
    else {
        column.style.color = "blue";
        asc = true;
    }

    var table = document.getElementById("ourtable");
    var rows, sorting, i, x, y, shouldSwitch;
    
    if(column.innerHTML === "a") {
        if(asc) {
            sorting = true;
            while (sorting) {
                sorting = false;
                rows = table.getElementsByTagName("TR");
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[0];
                    y = rows[i + 1].getElementsByTagName("TD")[0];
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch= true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    sorting = true;
                }
            } 
        }
        else {
            sorting = true;
            while (sorting) {
                sorting = false;
                rows = table.getElementsByTagName("TR");
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[0];
                    y = rows[i + 1].getElementsByTagName("TD")[0];
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch= true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    sorting = true;
                }
            } 
        }
    }
    else if(column.innerHTML === "b") {
        if(asc) {
            sorting = true;
            while (sorting) {
                sorting = false;
                rows = table.getElementsByTagName("TR");
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[1];
                    y = rows[i + 1].getElementsByTagName("TD")[1];
                    if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                        shouldSwitch= true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    sorting = true;
                }
            } 
        }
        else {
            sorting = true;
            while (sorting) {
                sorting = false;
                rows = table.getElementsByTagName("TR");
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[1];
                    y = rows[i + 1].getElementsByTagName("TD")[1];
                    if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                        shouldSwitch= true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    sorting = true;
                }
            } 
        }
    }
    else if(column.innerHTML === "c") {
        if(asc) {
            sorting = true;
            while (sorting) {
                sorting = false;
                rows = table.getElementsByTagName("TR");
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[2];
                    y = rows[i + 1].getElementsByTagName("TD")[2];
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch= true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    sorting = true;
                }
            } 
        }
        else {
            sorting = true;
            while (sorting) {
                sorting = false;
                rows = table.getElementsByTagName("TR");
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[2];
                    y = rows[i + 1].getElementsByTagName("TD")[2];
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch= true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    sorting = true;
                }
            } 
        }
    }
}

window.addEventListener("load", function(e) {
    "use strict";
    var elements = document.getElementById("header").children;
    for(var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", (function(i) {
            return function(e) {
                sortColumn(elements[i]);
            };
        })(i));
    }
});
