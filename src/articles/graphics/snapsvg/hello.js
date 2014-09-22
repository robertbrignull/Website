var snap = Snap('#canvas');

var n = 12;
var rd = Math.PI * 2 / n;


texts = []
texts.push(snap.text(148, 194, 'Hello'));
texts.push(snap.text(135, 242, 'World!'));

for (var i in texts) {
    texts[i].attr({
        'fill': 'black',
        'font-family': 'Arial',
        'font-size': 48
    });
}

var group = snap.group();

for (var i = 0; i < n; i++) {
    var r = i * rd;
    var x = 200 + Math.cos(r) * 150;
    var y = 200 + Math.sin(r) * 150;

    group.add(snap.circle(x, y, 20).attr({
        'fill':  Snap.hsb2rgb(1.0 * i / n, 1, 1),
        'stroke': '#000000',
        'stroke-width': 4
    }));
}

function spin() {
    group.attr({ transform: 'rotate(0 200 200)' });
    group.animate({ transform: "rotate(360 200 200)" }, 21000, mina.linear, spin);
}
spin();
