let number = 1;
let item = [];

function setup() {
  let canvas = createCanvas(200, 200);
  canvas.id("p5-canvas");
  canvas.parent("container4");
  for (let i = 0; i < number; i++) {
    item[i] = new Item(width / 2, height / 2, 8);
  }
}

function draw() {
  background(220);
  for (let i = 0; i < number; i++) {
    item[i].display();
    item[i].shake();
  }
}

class Item {
  constructor(x, y, s) {
    this.initPosx = x;
    this.initPosy = y;
    this.x = x;
    this.y = y;
    this.s = s;
    this.speedX = 5;
    this.speedY = 8;
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    circle(0, 0, this.s);

    //left wing
    push();
    translate(-20, 15);
    stroke(0);
    strokeWeight(1);
    noFill();
    arc(0, 0, 40, 40, PI + PI / 3, PI + (2 * PI) / 3);

    pop();

    //right wing

    push();
    translate(20, 15);
    stroke(0);
    strokeWeight(1);
    noFill();
    arc(0, 0, 40, 40, PI + PI / 3, PI + (2 * PI) / 3);
    pop();

    pop();
    // console.log(this.y)
  }

  shake() {
    if (this.x < this.initPosx - 5 || this.x > this.initPosx + 5) {
      this.speedX = -this.speedX;
    }
    if (this.y < this.initPosy - 5 || this.y > this.initPosy + 5) {
      this.speedY = -this.speedY;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    console.log(this.y);
  }
}
