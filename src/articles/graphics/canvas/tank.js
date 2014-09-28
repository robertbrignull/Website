var ctx = document.getElementById("canvas").getContext("2d");

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;

var width = 800;
var height = 600;

var bw = 2; // border width

var numFish = 8;

var fishSizes = [1.0, 1.0, 0.7, 1.2];

var Fish = function(type) {
    var self = this;

    this.image = new Image();

    var size = 80 * (1 + Math.random()) * fishSizes[type];

    this.image.onload = function() {
        self.width = size;
        self.height = size * self.image.height / self.image.width;

        self.x = Math.random() * (width - self.width);
        self.y = Math.random() * (height - self.height);

        self.right = (Math.random() < 0.5);
        self.speed = -0.3 * size + 80;

        self.setDestination();

        self.loaded = true;
    }

    this.image.src = '/img/graphics/tank/fish_' + (type+1) + '.png';

    this.loaded = false;
};

Fish.prototype.setDestination = function() {
    this.dest = {
        x: (this.x < width / 2) ? width - this.width : 0,
        y: Math.random() * (height - this.height)
    };

    var t = Math.abs((this.dest.x - this.x) / this.speed);

    this.vel = {
        x: (this.dest.x - this.x) / t,
        y: (this.dest.y - this.y) / t
    };

    this.right = (this.dest.x  > this.x);
};

Fish.prototype.update = function(delta) {
    this.x += this.vel.x * delta / 1000;
    this.y += this.vel.y * delta / 1000;

    if (this.x < 0 || this.x + this.width > width) {
        this.setDestination();
    }
};

Fish.prototype.draw = function() {
    if (this.right) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    else {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(this.image, -this.x - this.width, this.y, this.width, this.height);
        ctx.restore();
    }
};

CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
};

var fish = [];
for (var i = 0; i < numFish / 2; i++) {
    fish.push(new Fish(i));
    fish.push(new Fish(i));
}

var lastTimestamp;
function draw(timestamp) {
    lastTimestamp = lastTimestamp || timestamp;
    var delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    ctx.fillStyle = "#88CCFF";
    ctx.roundRect(bw, bw, width - bw*2, height - bw*2, 16).fill();

    for (var i = 0; i < fish.length; i++) {
        if (fish[i].loaded) {
            fish[i].update(delta);
            fish[i].draw();
        }
    }

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = bw*2;
    ctx.roundRect(bw, bw, width - bw*2, height - bw*2, 16).stroke();

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
