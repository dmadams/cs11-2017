var AJAX = (function(window, undefined) {
    var req = function() {
        try {
            return new ActiveXObject('Msxml2.XMLHTTP');
        } catch(e) {
            try {
                return new ActiveXObject('Microsoft.XMLHTTP');
            } catch(e) {
                return new XMLHttpRequest();
            }
        }
    };
  
    var send = function(url, callback, method, data) {
        var x = req();
        x.open(method, url, true);
        x.onreadystatechange = function() {
            if(x.readyState === 4) {
                if(x.status === 404) {
                    callback(x.statusText);
                } else {
                    callback(null, x.responseText);
                }
            }
        };
        if(method === 'POST') {
            x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        x.send(data);
    };
  
    var getJSON = function(url, callback) {
        send(url, function(err, data) {
            if(!err) {
                callback(err, JSON.parse(data));
            } else {
                callback(err);
            }
        }, 'GET');
    };
  
    var get = function(url, callback) {
        send(url, callback, 'GET');
    };
  
    var post = function(url, callback, data) {
        send(url, callback, 'POST', data);
    };
  
    return {
        get: get,
        getJSON: getJSON,
        post: post
    };
})(this);