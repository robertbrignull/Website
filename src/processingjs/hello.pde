PFont f;
float r = 0;
int n = 12;

void setup() {
	size(400, 400);
	frameRate(30);

	f = createFont("Arial", 48, true);

	colorMode(HSB, 1, 1, 1);
}

void draw() {
	background(255);

	textFont(f);
	fill(0);
	textAlign(CENTER, CENTER);
	text("Hello\nWorld!", width/2, height/2);

	stroke(0);
	strokeWeight(4);

	translate(width/2, height/2);
	rotate(r);
	r += 0.01;

	for (int i = 0; i < n; i++) {
		rotate(PI*2/n);
		fill(1.0 * i / n, 1, 1);
		ellipse(0, 150, 40, 40);
	}
}