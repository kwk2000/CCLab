let number = 50;
let number2 = 50;
let particle = [];
let c;
// let gamst = "Game Start!"
let fontG;

// function preload() {
//   fontG = loadFont("BrunoAce-Regular.ttf");
// }

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");

  c = color(255, 255, 0);

  for (let i = 0; i < number; i++) {
    for (let j = 0; j < number2; j++) {
      particle[i] = new Particle(0, random(0, height), 10, random(2, 5));
      particle[j] = new Particle(width, random(height), 10, random(-5, -2));
    }
  }
}

function draw() {
  background(220);

  for (let i = 0; i < number; i++) {
    for (let j = 0; j < number2; j++) {
      particle[i].display();
      particle[i].move();
      particle[i].reappear();
      particle[j].display();
      particle[j].move();
      particle[j].reappear();
    }
  }
  push();
  translate(width / 2-5, height / 2 + 180);
  // fill(255, 255, 0);
  fill(c);
  stroke(random(255), random(255), random(255));
  strokeWeight(3);
  beginShape();
  vertex(0 - 150, 0 - 50);
  vertex(0 - 160, 0 + 50);
  vertex(0 + 160, 0 + 50);
  vertex(0 + 150, 0 - 50);
  endShape(CLOSE);

  // textFont(fontG);
  // textSize(21);
  // text("Game Start!", -78, 8);

  pop();

  // if (width/2 - 95 < mouseX < width/2 + 95 && height/2 - 30 < mouseY < height/2 + 30) {
  if (
    mouseX > width / 2 - 95 &&
    mouseX < width / 2 + 95 &&
    height / 2 + 140 < mouseY &&
    mouseY < height / 2 + 210
  ) {
    c = color(255);
  } else {
    c = color(255, 255, 0);
  }
}

class Particle {
  constructor(x, y, s, spd) {
    this.x = x;
    this.y = y;
    this.s = s / 2;
    this.speedx = spd;
  }

  display() {
    push();
    noStroke();
    fill(random(255), random(255), random(255));
    translate(this.x, this.y);
    rectMode(CENTER);
    rect(this.x, this.y, this.s, this.s);
    pop();
  }

  move() {
    this.x += this.speedx;
  }

  reappear() {
    if (this.x > width) {
      this.x = 0;
      this.y = random(0, height);
    } else if (this.x < 0) {
      this.x = width;
      this.y = random(0, height - 20);
    }
  }
}
