var ctx = document.getElementById("canvas").getContext("2d");

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;

var n = 12;
var rd = Math.PI * 2 / n;

function setColourHSV(h) {
    h *= 6;

    var i = Math.floor(h);
    var x = 1 - Math.abs((h % 2) - 1);

    var r = Math.floor([1, x, 0, 0, x, 1][i] * 255);
    var g = Math.floor([x, 1, 1, x, 0, 0][i] * 255);
    var b = Math.floor([0, 0, x, 1, 1, x][i] * 255);

    ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function draw(timestamp) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 400, 400);

    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';
    ctx.fillText('Hello', 200, 194);
    ctx.fillText('World!', 200, 242);

    var ro = timestamp * 0.0003;
    var rd = 2 * Math.PI / n;
    for (var i = 0; i < n; i++) {
        var r = ro + i * rd;
        var x = 200 + Math.cos(r) * 150;
        var y = 200 + Math.sin(r) * 150;

        setColourHSV(1.0 * i / n);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
