var words = [];

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
    get("../data/passphrase/words.txt", function(status, response) {
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
    var numwords = document.getElementById('numwordsinput').value;
    var usecaps = document.getElementById('usecapsinput').checked;
    var numnums = document.getElementById('numnumsinput').value;

    rand_ints = new Int32Array(parseInt(numwords));
    rand.getRandomValues(rand_ints);

    passphrase = [];
    for (var i = 0; i < numwords; i++) {
        var word = words[mod(rand_ints[i], words.length)];
        if (usecaps) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        passphrase.push(word);
    }

    if (numnums > 0) {
        nums = [];
        for (var i = 0; i < numnums; i++) {
            nums.push(Math.floor(Math.random() * 10));
        }
        passphrase.push(nums.join(''));
    }

    document.getElementById('passphrase').innerHTML = passphrase.join('-');
}

function mod(n, m) {
    return ((n % m) + m) % m;
}
