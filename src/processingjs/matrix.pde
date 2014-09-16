PFont font;

ArrayList<FallingLine> lines = new ArrayList<FallingLine>();

int maxLife = 14;
float heightMod = 1.3;

void setup() {
    size(800, 600);
    frameRate(30);

    font = createFont("Arial", 48, true);
    textAlign(CENTER, CENTER);
}

void draw() {
    background(0);

    for (int i = lines.size() - 1; i >= 0; i--) {
        FallingLine l = lines.get(i);

        if (l._y < height) {
            if (millis() > l._next) {
                l._next += l._delay;
                l._chars.remove(0);
                l._chars.add(char(random(33, 127)));
                l._y += l._size * heightMod;
            }

            textFont(font, l._size);

            for (int j = 0; j < maxLife; j++) {
                int y = l._y + j * l._size * heightMod;

                fill(0, 255, 0, 255 - 255 * (l._chars.size() - j) / maxLife);
                text(l._chars.get(j), l._x, y);
            }
        }
        else {
            lines.remove(i);
        }
    }

    if (random(100) < 30) {
        lines.add(new FallingLine());
    }
}

class FallingLine {
    ArrayList<char> _chars;
    int _size, _x, _y, _delay, _next;

    FallingLine () {
        _chars = new ArrayList<char>();
        for (int i = 0; i < maxLife; i++) {
            _chars.add(char(random(33, 127)));
        }

        _x = random(width);
        _next = millis();

        d = random(100)
        _size = 8 + d * 0.12;
        _delay = 120 - d * 0.9;
        _y = -maxLife * _size * heightMod;
    }
};
