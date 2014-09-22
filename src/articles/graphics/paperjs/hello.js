var n = 12;
var rd = Math.PI * 2 / n;

function HSVtoRGB(h) {
    h *= 6;

    var i = Math.floor(h);
    var x = 1 - Math.abs((h % 2) - 1);

    var r = Math.floor([1, x, 0, 0, x, 1][i] * 255);
    var g = Math.floor([x, 1, 1, x, 0, 0][i] * 255);
    var b = Math.floor([0, 0, x, 1, 1, x][i] * 255);

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

var text = new PointText({
    point: [200, 194],
    content: 'Hello\nWorld!',
    fillColor: 'black',
    fontFamily: 'Arial',
    fontSize: 48,
    justification: 'center'
});

var circles = [];
for (var i = 0; i < n; i++) {
    var r = i * rd;
    var x = 200 + Math.cos(r) * 150;
    var y = 200 + Math.sin(r) * 150;

    var circle = new Path.Circle(new Point(x, y), 20);
    circle.fillColor = HSVtoRGB(1.0 * i / n);
    circle.strokeColor = '#000000';
    circle.strokeWidth = 4;

    circles.push(circle);
}

function onFrame(event) {
    for (var i = 0; i < n; i++) {
        circles[i].rotate(event.delta * 17.2, new Point(200, 200));
    }
}
