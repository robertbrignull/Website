var width = 800;
var height = 600;

var lines = [];
var chars = [];

function createLine(now) {
    var d = Math.random() * 100.0;
    return {
        delay: (240.0 - d * 1.8) / 1000,
        next: now,
        last: createChar(now, Math.random() * width, 0, 8.0 + d * 0.12)
    };
}

function createChar(now, x, y, size) {
    var c = new PointText({
        point: [x, y],
        content: String.fromCharCode(Math.floor(Math.random() * 94 + 33)),
        fontFamily: 'Arial',
        fillColor: '#00FF00',
        fontSize: size
    });
    c.birth = now;
    c.life = 30.0 / size;
    return c;
}

function onFrame(event) {
    for (var i = lines.length - 1; i >= 0; i--) {
        var l = lines[i];
        if (l.last.point.y < height) {
            if (event.time > l.next) {
                l.next += l.delay;
                l.last = createChar(event.time, l.last.point.x, l.last.point.y + l.last.handleBounds.height, l.last.fontSize);
                chars.push(l.last);
            }
        }
        else {
            lines.splice(i, 1);
        }
    }

    for (var i = chars.length - 1; i >= 0; i--) {
        var c = chars[i];
        if (event.time - c.birth < c.life) {
            c.fillColor = 'rgb(0, ' + (255 - Math.floor(255 * (event.time - c.birth) / c.life)) + ', 0)';
        }
        else {
            chars[i].remove();
            chars.splice(i, 1);
        }
    }

    if (Math.random() < 0.3) {
        lines.push(createLine(event.time));
    }
}
