var ctx = document.getElementById("canvas").getContext("2d");

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;

var width = 800;
var height = 600;

var maxLife = 14;
var heightMod = 1.3;

var lines = [];

function FallingLine() {
    this.chars = [];
    for (var i = 0; i < maxLife; i++) {
        this.chars.push(String.fromCharCode(Math.floor(Math.random() * 94 + 33)));
    }

    this.x = Math.random() * width;
    this.next = new Date().getTime();

    d = Math.random() * 100;
    this.size = 8 + d * 0.12;
    this.delay = 240 - d * 1.8;
    this.y = -maxLife * this.size * heightMod;
};

function draw(timestamp) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    for (var i = lines.length - 1; i >= 0; i--) {
        var l = lines[i];

        if (l.y < height) {
            if (new Date().getTime() > l.next) {
                l.next += l.delay;
                l.chars.shift();
                l.chars.push(String.fromCharCode(Math.floor(Math.random() * 94 + 33)));
                l.y += l.size * heightMod;
            }

            ctx.font = '' + l.size + 'px Arial';

            for (var j = 0; j < maxLife; j++) {
                var y = l.y + j * l.size * heightMod;

                ctx.fillStyle = 'rgb(0, ' + Math.floor(255 * j / maxLife) + ', 0)';
                ctx.fillText(l.chars[j], l.x, y);
            }
        }
        else {
            lines.splice(i, 1);
        }
    }

    if (Math.random() < 0.3) {
        lines.push(new FallingLine());
    }

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
