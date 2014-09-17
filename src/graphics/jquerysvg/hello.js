$('#canvas').svg({ onLoad: setup });

function HSVtoRGB(h) {
    h *= 6;

    var i = Math.floor(h);
    var x = 1 - Math.abs((h % 2) - 1);

    var r = Math.floor([1, x, 0, 0, x, 1][i] * 255);
    var g = Math.floor([x, 1, 1, x, 0, 0][i] * 255);
    var b = Math.floor([0, 0, x, 1, 1, x][i] * 255);

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function setup(svg) {
    var n = 12;
    var rd = Math.PI * 2 / n;

    texts = []
    texts.push(svg.text(148, 194, 'Hello'));
    texts.push(svg.text(135, 242, 'World!'));

    for (var i in texts) {
        $(texts[i]).attr({
            'fill': 'black',
            'font-family': 'Arial',
            'font-size': 48
        });
    }

    var spin = function(element) {
        return function() {
            $(element).attr('transform', 'rotate(0, 200, 200)');
            $(element).animate({ 'svgTransform': 'rotate(360, 200, 200)' }, 21000, 'linear', spin(element));
        };
    };

    for (var i = 0; i < n; i++) {
        var r = i * rd;
        var x = 200 + Math.cos(r) * 150;
        var y = 200 + Math.sin(r) * 150;

        var circle = svg.circle(x, y, 20, {
            fill: HSVtoRGB(1.0 * i / n),
            stroke: '#000000',
            strokeWidth: 4
        });
        spin(circle)();
    }
}
