let number1 = 1;
let number2 = 2;
let counting = "0";
let loco = [];
let item = [];
let p = 0;
let target = 3;
let itemCheck;
// let noteChange;
let clearSound;
let clearCheck = false;
let startCheck = false;
let finalCheck = false;

let osc, envelope, fft, env, osc2;
// let p
let scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
let note = 0;
let finalWork = [];

function preload() {
  clearSound = loadSound("mp3/game-clear.mp3");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  let vPos = createVector(width / 2, height / 2);
  let vVel = createVector(0, 0);
  let vAcc = createVector(0, 0);
  
  

  for (let i = 0; i < number1; i++) {
    loco[i] = new Loco(vPos, vVel, 100, 50);
  }

  for (let j = 0; j < number2; j++) {
    item[j] = new Item(random(50, width - 50), random(50, height - 50), 8);
  }

  p = 0;

  //for sound when item is eaten
  push();
  osc = new p5.SinOsc();

  // Instantiate the envelope
  envelope = new p5.Env();

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);

  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);

  osc.start();

  fft = new p5.FFT();
  pop();

  //   push();
  //   osc2 = new p5.SinOsc();

  //   // Instantiate the envelope
  //   env = new p5.Env();

  //   // set attackTime, decayTime, sustainRatio, releaseTime
  //   env.setADSR(0.001, 0.5, 0.1, 0.5);

  //   // set attackLevel, releaseLevel
  //   env.setRange(1, 0);

  //   osc2.start();

  //   fft = new p5.FFT();
  //   pop();

  getAudioContext().suspend();
}

function mousePressed() {
  userStartAudio();
  startCheck = true;
}

function draw() {
  // background(220);
  
  colorR = 220;
  background(colorR);
  for (let i = 0; i < height; i++) {
    let colorback = map(i, 0 + 30, height - 100, 240,10);
    stroke(120,120,colorback);
    strokeWeight(1);
    line(0, i, width, i);
  }

  //start audio
  if (startCheck == true) {
    push();
    noStroke();

    //play music when eating item
    if (itemCheck == true || frameCount === 1) {
      let midiValue = scaleArray[note];
      let freqValue = midiToFreq(midiValue);
      osc.freq(freqValue);

      envelope.play(osc, 0, 0.1);

      finalWork.push(midiValue);
    }

    //for background
    // plot FFT.analyze() frequency analysis on the canvas
    let spectrum = fft.analyze();
    for (let i = 0; i < spectrum.length / 20; i++) {
      fill(spectrum[i], spectrum[i] / 10, 0, 10);
      let x = map(i, 0, spectrum.length / 20, 0, width);
      let h = map(spectrum[i], 0, 255, 0, height);
      rect(x, height, spectrum.length / 20, -h);

      // rect(width-x, height, spectrum.length / 20, -h);
    }

    pop();

    for (let i = 0; i < loco.length; i++) {
      for (let j = 0; j < item.length; j++) {
        // console.log(loco[i].mouthCheck());
        //

        //when mouse is far from character
        if (loco[i].mouthCheck() || loco[i].edgeCheck()) {
          item[j].display();
          item[j].shake();
          loco[i].move();

          loco[i].display();
          loco[i].drawDeadEyes();
          loco[i].mouthBig();
        }
        //game clear condition
        else if (p > 3) {
          loco[i].display();
          loco[i].winEyes();

          item[j].display();

          push();
          translate(width / 2, height / 2);
          rectMode(CENTER);
          fill(random(255), random(255), random(255),80);
          stroke(random(255), random(255), random(255));
          strokeWeight(3);
          rect(0, 0, 400, 200);
          // fill();
          textFont("Nabla");
          textSize(65);
          textAlign(CENTER);
          text("GAME CLEAR!", 0, 30);

          // for (let i = 0; i < finalWork.length; i++) {
          //           osc2 = new p5.SinOsc();
          //           env = new p5.Envelope(0.1, 0.7, 0.3, 0.1);
          //           osc2.start();
          //           let note2 = 0;
          //           let midiValue = finalWork[note2];
          //           let freqValue = midiToFreq(midiValue);
          //           osc2.freq(freqValue);

          //           env.play(osc2, 0, 0.1);
          //           note2 = (note2 + 1) % finalWork.length;
          //           finalCheck=true
          // }

          if (clearSound.isPlaying() == false && clearCheck == false) {
            clearSound.play();
            clearCheck = true;
          }

          pop();
        }

        //normal face
        else {
          item[j].display();
          item[j].shake();

          loco[i].display();
          loco[i].normalMouth();
          loco[i].move();
          // loco[i].bounce()
          loco[i].edge();
          loco[i].drawNormalEyes();
        }

        //mouth big when close to item
        if (dist(loco[i].vPos.x, loco[i].vPos.y, item[j].x, item[j].y) < 80) {
          loco[i].display();
          loco[i].drawNormalEyes();
          loco[i].mouthHuge();
          loco[i].move();
          // loco[i].bounce()
          loco[i].edge();
        }

        //collect item
        if (
          dist(loco[i].vPos.x, loco[i].vPos.y, item[j].x, item[j].y) < 20 &&
          item.length > 0
        ) {
          note = item[j].note;
          // console.log(note)
          // console.log(finalWork);
          item.splice(j, 1);
          p = p + 1;
          loco[i].colorr = loco[i].colorr + random(30, 60);
          loco[i].colorg = loco[i].colorg + random(-60, 50);
          loco[i].colorb = loco[i].colorb + random(-60, 50);

          itemCheck = true;
        } else {
          itemCheck = false;
        }
        // console.log(loco[i].colorr)

        //item reappear
        if (item.length < 1) {
          item.push(
            new Item(random(30, width - 30), random(30, height - 30), 8)
          );
        }
      }
    }

    textAlign(CENTER);
    textSize(20);
    // text()

    push();
    stroke(255)
    textFont("Shadows Into Light");
    textSize(40);
    text("/4", width - 175, 120);
    text(p, width - 210, 120);

    text("Collect as much as you can!", width - 240, 60);
    pop();
  } else {
    push();
    textSize(30);
    // let textColor = random(255);
    textAlign(CENTER);
    stroke(random(255));
    strokeWeight(random(5));
    text("--Click to Start--", width / 2, height / 2 + 110);
    pop();
  }

  // console.log(noteChange);
}

class Loco {
  constructor(vPos, vVel, vAcc, s) {
    // this.x=x
    // this.y=y
    this.vPos = vPos;
    this.vAcc = vAcc;
    // this.mouse=mouse
    this.s = s;
    this.vVel = vVel;
    this.colorr = 0;
    this.colorg = 200;
    this.colorb = 200;

    // this.eyeX1=this.vPos.x-8
    // this.eyeX2=this.vPos.x+8
    // this.eyeY1=this.vPos.x-8
    // this.eyeY2=this.vPos.x-8

    // this.xSpeed=2.5
    // this.ySpeed=-2
  }

  display() {
    push();
    translate(this.vPos.x, this.vPos.y);
    noStroke();
    fill(this.colorr, this.colorg, this.colorb);
    // fill(random(255),random(255),random(255))
    // beginShape()

    //draw face
    ellipse(0, 0, this.s, this.s);

    //eyebrow
    push();
    noFill();
    stroke(0);
    translate(0, -7);
    let eyeBY = map(mouseY, 0, height, 0, 6);
    let eyeBX = map(mouseX, 0, width, 0, 3);
    arc(-9 + eyeBX, eyeBY - 6, 20, 20, PI + PI / 12, PI + (2 * PI) / 4);
    arc(5 + eyeBX, eyeBY - 6, 20, 20, PI + (2 * PI) / 4, PI + (11 * PI) / 12);
    pop();

    pop();
  }

  drawNormalEyes() {
    //draweyes
    push();
    translate(this.vPos.x, this.vPos.y);
    fill(0);
    let eyeCentx = map(mouseX, 0, width, -6, 6);
    let eyeCenty = map(mouseY, 0, height, -6, 6);
    circle(eyeCentx - 8, eyeCenty - 8, 8);
    circle(eyeCentx + 8, eyeCenty - 8, 8);
    pop();
  }

  drawDeadEyes() {
    push();
    translate(this.vPos.x + 5, this.vPos.y - 2);
    // noStroke();
    // fill(0, 255, 255);
    // fill(random(255),random(255),random(255))
    // ellipse(0, 0, 50, 50);
    // fill(0);
    stroke(0);
    strokeWeight(3);
    let eyeCentx = map(mouseX, 0, width, -11, 1);
    let eyeCenty = map(mouseY, 0, height, -12, 0);
    line(eyeCentx - 4, eyeCenty - 6, eyeCentx - 14, eyeCenty + 6);
    line(eyeCentx - 4, eyeCenty + 6, eyeCentx - 14, eyeCenty - 6);
    line(eyeCentx + 4, eyeCenty - 6, eyeCentx + 14, eyeCenty + 6);
    line(eyeCentx + 4, eyeCenty + 6, eyeCentx + 14, eyeCenty - 6);
    pop();
  }

  winEyes() {
    push();
    translate(this.vPos.x, this.vPos.y);
    noFill();
    stroke(0);
    strokeWeight(3);

    //eyes
    arc(0 - 10, 0 - 10, 9, 7, PI, 2 * PI);
    arc(0 + 10, 0 - 10, 9, 7, PI, 2 * PI);

    //mouth
    arc(0, 0 + 3, 20, 15, 0, PI);

    push();
    translate(0 + 7, 0 + 11);
    rotate(-PI / 3);
    fill(255, 10, 10);
    noStroke();
    arc(0, 0, 10, 16, 0 - PI / 6, PI + PI / 3, OPEN);
    pop();

    pop();
    // console.log("yes")
  }

  normalMouth() {
    push();
    translate(this.vPos.x, this.vPos.y + 2);

    //mouth
    push();
    translate(0, 2);
    noFill();
    stroke(0);
    arc(0, 0 + 2, 24, 24, 0 + PI / 4, PI - PI / 4);
    translate(-6, 7);
    arc(0, 0, 8, 8, (2 * PI) / 3 + PI / 12, (5 * PI) / 3 - PI / 8);
    translate(12, 0);
    arc(0, 0, 8, 8, (4 * PI) / 3 + PI / 12, (7 * PI) / 3 - PI / 8);
    translate(-6, -5);
    arc(0, 0, 10, 10, PI / 12, PI - PI / 12);
    pop();

    pop();
  }

  mouthBig() {
    push();
    translate(this.vPos.x, this.vPos.y + 2);
    noStroke();
    // fill(0);
    noFill();
    stroke(0);
    strokeWeight(2);
    ellipse(0, 10, 20, 15);
    pop();
  }

  mouthHuge() {
    push();
    translate(this.vPos.x, this.vPos.y + 2);
    noStroke();
    fill(0);
    circle(0, 10, 25);
    pop();
  }

  move() {
    //move towards mouse
    let mouse = createVector(mouseX, mouseY);
    mouse.sub(this.vPos);
    mouse.setMag(0.5);
    this.vAcc = mouse;
    this.vVel.add(this.vAcc);
    this.vPos.add(this.vVel);
    this.vVel.limit(5);

    //eyes move

    // console.log(mouse)
  }

  // bounce(){
  //   if(this.vPos.x>width||this.vPos.x<0){
  //     this.vVel.x=-this.vVel.x
  //   }
  //   if(this.vPos.y>height||this.vPos.y<0){
  //     this.vVel.y=-this.vVel.y
  //   }
  // }
  edge() {
    if (this.vPos.x > width - 5) {
      this.vPos.x = width - 8;
      return true;
    }
    if (this.vPos.x < 0) {
      this.vPos.x = 5;
      return true;
    }
    // if(this.vPos.x<0){
    //   this.vPos.x=width
    // }
    if (this.vPos.y > height - 5) {
      this.vPos.y = height - 8;
      return true;
    }
    if (this.vPos.y < 0) {
      this.vPos.y = 5;
      return true;
    }
    // if(this.vPos.y<0){
    //   this.vPos.y=height
    // }
  }

  edgeCheck() {
    if (this.vPos.x > width - 5) {
      return true;
    } else if (this.vPos.x < 0) {
      return true;
    } else if (this.vPos.y > height - 5) {
      return true;
    } else if (this.vPos.y < 0) {
      return true;
    } else {
      return false;
    }
  }

  mouthCheck() {
    if (dist(this.vPos.x, this.vPos.y, mouseX, mouseY) > 600) {
      return true;
    } else {
      return false;
    }
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
    this.note = 0;
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

    //update note
    this.note = floor(map(this.y, height, 0, 0, scaleArray.length));
    // console.log(this.note)
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
    // console.log(this.y);
  }
}

