var appid = "0213128afcd132fa663b95f5a73be0eb";

function onWeather(err, data) {
    if(err) {
        var responseEl = document.getElementById("response");
        responseEl.style["display"] = "";
        var errorEl = document.getElementById("error");
        errorEl.style["display"] = "";
        errorEl.innerHTML = "Could not find weather information for this ZIP code.";
        var resultEl = document.getElementById("results");
        resultEl.style["display"] = "none";
        return;
    }

    var responseEl = document.getElementById("response");
    var errorEl = document.getElementById("error");
    errorEl.style["display"] = "none";
    errorEl.innerHTML = "";

    var temp = data.main.temp;
    document.getElementById("temp").innerHTML = temp + " &deg;F";

    var windspeed = data.wind.speed;
    document.getElementById("windspeed").innerHTML = windspeed + " mph";

    var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    var iconEl = document.getElementById("icon");
    var iconImg = document.createElement("img");
    iconImg.src = iconUrl;
    while (iconEl.firstChild) {
        iconEl.removeChild(iconEl.firstChild);
    }
    iconEl.appendChild(iconImg);

    var locationEl = document.getElementById("location");
    locationEl.innerHTML = data.name;

    responseEl.style["display"] = "";
    var resultEl = document.getElementById("results");
    resultEl.style["display"] = "";
}

function onZipCode(err, data) {
    if(err) {
        var responseEl = document.getElementById("response");
        responseEl.style["display"] = "";
        var errorEl = document.getElementById("error");
        errorEl.style["display"] = "";
        errorEl.innerHTML = "Requested ZIP code does not exist.";
        var resultEl = document.getElementById("results");
        resultEl.style["display"] = "none";
        return;
    }
    var firstMatch = data.places[0];
    var city = firstMatch["place name"];
    var state = firstMatch["state"];
    var country = data["country"];

    var url = "http://api.openweathermap.org/data/2.5/weather";
    url = url+"?APPID="+appid+"&units=imperial&q="+city+","+state+","+country;
    AJAX.getJSON(url, onWeather);
}

function getWeather(e) {
    e.preventDefault(); // stop submit
    var zipCode = document.getElementById("zipCode").value;
    if(!zipCode) {
        var responseEl = document.getElementById("response");
        responseEl.style["display"] = "";
        var errorEl = document.getElementById("error");
        errorEl.style["display"] = "";
        errorEl.innerHTML = "Please enter a ZIP code.";
        var resultEl = document.getElementById("results");
        resultEl.style["display"] = "none";
        return;
    }
    AJAX.getJSON("http://api.zippopotam.us/us/" + zipCode, onZipCode);
}
