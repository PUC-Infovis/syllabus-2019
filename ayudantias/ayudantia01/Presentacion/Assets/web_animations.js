let canvas, message, mid, qint;
let step = 0;
let dir = 1;
const path = [[3, 5], [2, 5], [1, 5], [1, 4], [1, 3], [2, 3], [2, 2], [3, 2]];
const dots = [];

function setup(){
  mid = windowHeight*0.5/2;
  qint = mid/5;
  canvas = createCanvas(windowHeight*0.5, windowHeight*0.5);
  canvas.parent('canvas-container');
  background(255);
  path.forEach(pair => {
    let x = mid + (qint*pair[0])*cos(TWO_PI/6*pair[1]);
    let y = mid + (qint*pair[0])*sin(TWO_PI/6*pair[1]);
    dots.push(new Dot(x, y));
  })
  dots[0].on = true;
  message = new Message(dots[0], dots[1]);
}

function windowResized() {
  resizeCanvas(windowHeight*0.5, windowHeight*0.5);
}

function draw(){
  background(255);
  stroke(0);
  fill(0);
  strokeWeight(0);
  text('google.com', dots[0].x, dots[0].y - 10);
  text('computador', dots[7].x - 35, dots[7].y + 15);
  strokeWeight(1);
  for (let level = 1; level < 4; level++){
    for (let step = 0; step < 6; step++){
      let x1 = (qint*level)*cos(TWO_PI/6*step);
      let y1 = (qint*level)*sin(TWO_PI/6*step);
      let x2 = (qint*level)*cos(TWO_PI/6*(step-1));
      let y2 = (qint*level)*sin(TWO_PI/6*(step-1));
      line(mid + x1, mid + y1, mid + x2, mid + y2);
    }
  }
  for (let step = 0; step < 6; step++){
    let x1 = (qint*3)*cos(TWO_PI/6*step);
    let y1 = (qint*3)*sin(TWO_PI/6*step);
    let x2 = (qint)*cos(TWO_PI/6*(step));
    let y2 = (qint)*sin(TWO_PI/6*(step));
    line(mid + x1, mid + y1, mid + x2, mid + y2);
  }
  fill(255);
  for (let level = 1; level < 4; level++){
    for (let step = 0; step < 6; step++){
      let x = (qint*level)*cos(TWO_PI/6*step);
      let y = (qint*level)*sin(TWO_PI/6*step);
      ellipse(mid + x, mid + y, 10, 10)
    }
  }
  dots.forEach(d => {
    d.render();
  })
  message.render();
}

class Dot{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.on = true;
    this.step = 0;
  }

  render(){
    if (this.on){
      fill(232, 53, 172);
      ellipse(this.x, this.y, 10 + 5*(sin(TWO_PI/25*this.step) + 1), 10 + 5*(sin(TWO_PI/25*this.step) + 1));
      this.step++;
      if (this.step > 23){
        this.step = 0;
        this.on = false;
        step = step + dir;
        if (step > 7){
          dir = -1;
          step = 6;
        }
        else if (step < 0){
          dir = 1;
          step = 1;
        }
        message.start = this;
        message.end = dots[step];
        message.on = true;
      }
    }
    else {
      // noFill();
      fill(255);
      ellipse(this.x, this.y, 10, 10);
    }
  }
  
}

class Message{
  constructor(start, end){
    this.start = start;
    this.end = end;
    this.on = false;
    this.step = 3;
  }

  render(){
    if (this.on){
      let x = this.start.x + (this.end.x - this.start.x)/25*this.step;
      let y = this.start.y + (this.end.y - this.start.y)/25*this.step;
      fill(232, 53, 172);
      ellipse(x, y, 10, 10);
      this.step++;

      if (this.step > 25){
        this.step = 3;
        this.on = false;
        this.end.on = true;
      }
    }
  }
}