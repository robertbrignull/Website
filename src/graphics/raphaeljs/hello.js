var paper = new Raphael('canvas', 400, 400);

var n = 12;
var rd = Math.PI * 2 / n;

var spin = Raphael.animation({transform: "r360,200,200"}, 21000, 'linear').repeat(Infinity);

paper.text(200, 200, 'Hello\nWorld!').attr({
    'fill': 'black',
    'font-family': 'Arial',
    'font-size': 48
});

for (var i = 0; i < n; i++) {
    var r = i * rd;
    var x = 200 + Math.cos(r) * 150;
    var y = 200 + Math.sin(r) * 150;

    paper.circle(x, y, 20).attr({
        'fill':  Raphael.hsb2rgb(1.0 * i / n, 1, 1),
        'stroke': '#000000',
        'stroke-width': 4
    }).animate(spin);
}
