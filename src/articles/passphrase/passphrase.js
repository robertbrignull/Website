var words = [];
var wordCount = 4;

var rand = window.crypto || window.msCrypto;

function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn);
    }
    else if (obj.attachEvent) {
        obj.attachEvent('on' + type, function() {
            return fn.apply(obj, [window.event]);
        });
    }
}

addEvent(window, 'load', function() {
    addEvent(document.getElementById('generate'), 'click', generate);
    loadWords(generate);
});

function loadWords(callback) {
    get("/articles/passphrase/words.txt", function(status, response) {
        if (status == 200) {
            words = response.split('\n');
            callback();
        }
        else {
            alert('Error loading word list');
        }
    });
}

function get(url, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 ) {
           callback(xmlhttp.status, xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function generate() {
    rand_ints = new Int32Array(wordCount);
    rand.getRandomValues(rand_ints);

    passphrase = [];
    for (var i = 0; i < wordCount; i++) {
        passphrase.push(words[mod(rand_ints[i], words.length)]);
    }

    document.getElementById('passphrase').innerHTML = passphrase.join('-');
}

function mod(n, m) {
    return ((n % m) + m) % m;
}
