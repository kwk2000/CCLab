let raindrop = [];
let formalrain = [];
let number = 10;
let numberf = 5;
let xoffset = 0;
let inc = 0.01;
let s = 10;
let counter = [];
let o;
let graphics;
let colorR;
let colorhand;
let globaldelay=50

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasContainer");
  // createCanvas(600, 600);
  colorR = 220;
  background(colorR);
  for (let i = 0; i < height; i++) {
    let colorback = map(i, 0 + 30, height - 100, 240, 10);
    stroke(colorback);
    strokeWeight(1);
    line(0, i, width, i);
  }
  //    graphics=createGraphics(600,600)

  //    graphics.background(255,15)
  colorMode(HSB, 100);

  // background(255, 40);
  //background(255)
  // pixelDensity(1);
  for (let i = 0; i < number; i++) {
    for (let j = -1; j < number - 1; j++) {
      raindrop[i] = new Raindrop(random(width), 10 + 30, 5);
    }
  }

  for (let i = 0; i < numberf; i++) {
    formalrain[i] = new Formalrain(random(width), random(height));
  }
}

function draw() {
  // background(255, 10);
  // background(100,15);
  //counter = millis();

  //draw blurred background

  //     let yoff = 0;
  //     loadPixels();
  //     for (let y = 0; y < height; y++) {
  //       let xoff = 0;
  //       for (let x = 0; x < width; x++) {
  //         let index = (x + y * width) * 4;
  //         // let r = random(255);
  //         let r = noise(xoff, yoff) * 255;
  //         pixels[index + 0] = r;
  //         pixels[index + 1] = r;
  //         pixels[index + 2] = r;
  //         pixels[index + 3] = 255;

  //         xoff += inc;
  //       }
  //       yoff += inc;
  //     }
  //     updatePixels();

  //   //inc += 0.000005;
  //   //noLoop();
  // colorR=220
  // background(colorR,10)
  // let counter=0
  //   counter++
  //   if(counter>globaldelay){
      
    
  for (let i = 0; i < number; i++) {
    // raindrop[i]=new Raindrop(random(width), 5, s);
    // o = map(i, 0, raindrop.length, 255, 0);
    raindrop[i].display();

    //raindrop[i].initialmove()
    if (raindrop[i].countercheck()) {
      raindrop[i].move();
      raindrop[i].reappear();
      // raindrop[i].bounce()
      // graphics.fill(14, 100, 100)
      // graphics.ellipse(raindrop[i].x,raindrop[i].y,60)
    } else {
      raindrop[i].expand();
      // raindrop[i].initialmove()
    }
    //console.log(i);
    if (raindrop[i].fallcheck()) {
      raindrop[i].y = 0;
      raindrop[i].x = random(width);
      raindrop[i].xo = raindrop[i].x;
      raindrop[i].xoff = 0;
      raindrop[i].speedY = random(3, 5);
      raindrop[i].speedY2 = raindrop[i].speedY;
    }
    for (let i = 0; i < numberf; i++) {
      let f = formalrain[i];
      f.display();
      f.move();
      f.reappearAndSpeedChange();
    }
  }

    //r.move();
    // if (r.countercheck()) {
    // //   raindrop.push(new Raindrop(mouseX, 5, 5, 0));
    //   r.move();
    // }
    // console.log(o)
    // }
    
  
  if (mouseIsPressed) {
    for (let i = -50; i < 51; i++) {
      let handy = mouseY + i;
      let colorhand = map(handy, 0 + 30, height - 100, 235, 30);
      colorMode(RGB, 255);
      stroke(colorhand);
      strokeWeight(1);
      line(pmouseX, pmouseY + i, mouseX, mouseY + i);
    }
    // colorhand = map(mouseY,0+30,height-100, 245, 60);
    // colorMode(RGB, 255);
    // stroke(colorhand);
    // strokeWeight(50)
    // line(pmouseX, pmouseY, mouseX, mouseY);

    

    // raindrop.splice(random(number),1)
    // let colorhand2=map(mouseY-50,-50,height-50,240,110)
    // stroke(colorhand2)
    // line(pmouseX, pmouseY-50, mouseX, mouseY-50);
    // let colorhand3=map(mouseY+50,50,height+50,240,110)
    // line(pmouseX, pmouseY+50, mouseX, mouseY+50);

    //     for (let i = -50; i < 51; i++) {
    //       let handy = mouseY + i;
    //       // let cody=map(mouseY+i,mouseY-50,mouseY+50,0,height)
    //       colorhand =map(mouseY+i,mouseY-50,mouseY+50, 230, 130);
    //       // colorhand = map(cody, 0,height, 230, 130);
    //       noStroke();
    //       colorMode(RGB, 255);
    //       fill(colorhand, colorhand, colorhand);
    //       rectMode(CENTER)
    //       rect(mouseX, handy, 40, 10);
    // }
  }

  //   raindrop.push(new Raindrop(mouseX, 5, 5));

  rectMode(CENTER);
  noStroke();
  fill(0);
  rect(width / 2, height - 50, width, 100);
  rect(width / 2, 15, width, 30);
  triangle(60, 20, 0, 30, 0, height - 45);
  triangle(width - 60, 20, width, 30, width, height - 45);
}

// function mousePressed() {
//   for (let i = 0; i < raindrop.length; i++) {
//     let o = map(i, 0, raindrop.length, 255, 0);
//   }
//   raindrop.push(new Raindrop(mouseX, 5, s, o));
//   // raindrop.push( new Raindrop(random(width), 0, 10));
// }

// function mousePressed() {
//   raindrop.push(new Raindrop(mouseX, 5, s));
//   raindrop.push(new Raindrop(mouseX-random(-100,100), 5, s));
//   raindrop.push(new Raindrop(mouseX+random(-100,100), 5, s));
//   raindrop.push(new Raindrop(mouseX+random(-100,100), 5, s));

// //   // for(let i = 0; i < raindrop.length; i++){
// //   //   o = map(i, 0, raindrop.length, 255, 0);
// //   // }
//   for(let i = 0; i < 10; i++){
//   raindrop.push(new Raindrop(mouseX, 5, 5));
//   }
// // noStroke()
// // colorhand=map(mouseY,width,0,130,220)
// // fill(colorhand)
// // circle(mouseX,mouseY,50)
// }

class Raindrop {
  constructor(x, y, s) {
    // constructor(x, y, s, c, o) {
    this.x = x;
    this.xo = x;
    this.xo2 = x;
    this.y = y;
    this.outerdia = s;
    this.counter = 0;
    this.time_now = 0;
    this.delay = random(80, 150);
    this.xoff = 0;
    this.speedX = random(-5, 5);
    this.speedY = 2;
    this.speedY2 = 2;
    this.initianspeedY = 2;
    this.x2 = x;
    this.y2 = y;
    this.colorr = 255;
    this.colorg = 255;
    this.colorb = 255;

    // this.opa=0
    //this.o=o
    this.innerdia = 6;
  }
  display() {
    let yoff = 0;
    //fill(255,255,0,this.o)
    // circle(this.x,this.y,this.outerdia)

    //draw outer raindrop
    push();
    colorMode(RGB, 255);

    strokeWeight(0.01);
    translate(this.x, this.y - 6);
    let color = map(this.y, 0 + 30, height - 100, 220, 130);
    stroke(color - 10);
    fill(color);
    // if(this.y>width/2){
    //   fill(100)
    // }else{
    //   fill(230, 235, 255);
    // }

    //fill(14,0)
    // noStroke();
    beginShape();

    let xoff = 0;

    for (let i = 0; i < 2 * PI; i += 0.01) {
      //let offset=map(sin(i*5+frameCount*0.1),-1,1,-35,35)
      let offset = map(noise(xoff, yoff), 0, 1, -35, 35);
      let r = this.outerdia + random(-2, 2);
      let raindropx = r * cos(i);
      let raindropy = r * sin(i);
      vertex(raindropx, raindropy);
      //ellipse(dropx,dropy,4,4)

      xoff += 0.001;
    }
    endShape();
    pop();
    yoff += 0.001;

    //draw inner raindrop
    push();
    translate(this.x2 + 1, this.y2 - 8);
    noStroke();
    colorMode(RGB, 255);

    // if (this.speedY2 < 0) {
    //   this.colorr = map(this.y2, width, 0, 10, 250);
    // }
    // fill(this.colorr);

    let colorr = map(this.y, 20, height - 100, 250, 40);
    fill(colorr);
    // fill(255,this.opa)
    //fill("Gainsboro");
    rotate(PI / 6);
    arc(0, 0, (this.innerdia * 2) / 3, this.innerdia / 2, PI, 2 * PI);

    pop();
  }

  move() {
    //
    push();
    let target = map(
      noise(this.xoff),
      0,
      1,
      this.xo - random(-100, 100),
      this.xo + random(-100, 100)
    );
    let dx = target - this.x;
    this.x += dx * 0.1;
    this.y += this.speedY;
    this.xoff += 0.001;
    //     pop();

    //     push();
    //     if(this.x>this.x2){
    //       this.x2=this.x2-1/2*(this.x-this.x2)
    //     }else if(this.x<this.x2){
    //       this.x2=this.x2+1/2*(this.x2-this.x)
    //     }

    // this.y2 += this.speedY;
    this.x2 = this.x;
    this.y2 += this.speedY2;
    pop();

    //     if(counterCheck==true){
    //     this.y += 5;

    //     let noiseVal = map(noise(xoffset), 0, 1, 0, width);
    //     this.x = noiseVal;
    //     xoffset += 0.005;
    //   }
    //     this.y += 5;

    //     let noiseVal = map(noise(xoffset), 0, 1, 0, width);
    //     this.x = noiseVal;
    //     xoffset += 0.005;
  }
  move2() {}

  countercheck() {
    //let counter = this.counter;
    //counter = millis();
    // if(mouseIsPressed){
    //   this.counter = 0;
    // }
    // console.log(this.counter)
    // this.counter++;
    // if (this.counter > this.delay) {
    //   return true;
    // } else {
    //   return false;
    // }
    this.counter++;
    if (this.counter > this.delay) {
      return true;
    } else {
      return false;
    }
  }

  expand() {
    this.outerdia += 0.1;
    this.innerdia += 0.1;
  }

  initialmove() {
    this.y += this.initialspeedY;
  }

  bounce() {
    if (this.y2 > height) {
      this.speedY2 = -this.speedY2;
      let acc = random(0.1, 0.4);
      this.speedY2 += acc;
      acc = acc - 0.02;
      if (acc == 0) {
        this.speedY2 = 0;
      }
    }
  }

  bouncecheck() {
    if (this.y2 > height) {
      return true;
    } else {
      return false;
    }
  }
  reappear() {
    if (this.y > height + 20) this.y2 = 0;
  }
  fallcheck() {
    if (this.y > height + 20) {
      return true;
    } else {
      return false;
    }
  }
}

class Formalrain {
  constructor(a, b) {
    this.x3 = a;
    this.y3 = b;
    this.widthh = 15;
    this.heightt = 15;
    this.base = 13;
    this.high = 10;
    this.colorg = 150;
    this.xSpd = 0;
    this.ySpd = random(2,4);
  }

  display() {
    // particle's appearance
    push();
    translate(this.x3, this.y3);
    noStroke();
    colorMode(RGB, 255);
    fill(215, 245, 243,3);
    // arc(0,0,15,28,PI,PI+PI/2)
    // arc(0,0,15,28,PI+PI/2,2*PI)
    triangle(0 - 7, 0, 0, 0 - 15, 0 + 7, 0);
    arc(0, 0, this.widthh, this.heightt, 0, PI);

    pop();
  }
  move() {
    this.x3 += this.xSpd;
    this.y3 += this.ySpd;
  }
  reappearAndSpeedChange() {
    if (this.y3 > height + 13) {
      this.x3 = random(0, width);
      this.y3 = 0;
      this.ySpd = random(2,4);
    }
  }
}
