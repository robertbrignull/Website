$('#canvas').svg({ onLoad: setup });

function setup(svg) {
    var width = 800;
    var height = 600;

    var heightMod = 1.2;

    function createChar(x, y, size, delay) {
        var c = $(svg.text(x, y, String.fromCharCode(Math.floor(Math.random() * 94 + 33))));
        c.attr({
            'fill': '#00FF00',
            'font-family': 'Arial',
            'font-size': size
        });
        c.animate({ 'svgFill': '#000000' }, 30000 / size, 'linear', function() { c.remove(); });
        
        if (y < height) {
            setTimeout(function() {
                createChar(x, y + size * heightMod, size, delay);
            }, delay);
        }
    }

    setInterval(function() {
        if (Math.random() < 0.3) {
            var d = Math.random() * 100.0;
            createChar(Math.random() * width, 0, 8 + d * 0.12, 240 - d * 1.8);
        }
    }, 1000 / 60);
}
