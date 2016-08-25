var song, canvas, fft, noiseAmp, circleLoc, bassAmp, snareAmp, driftX, randomRotateAmt, kickboxSensitivity, arcLength;

function preload() {
    song = loadSound('data/playthis.mp3');
}

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    frameRate(60);

    // FFT object with time domain buffer
    fft = new p5.FFT();

    // setup for circlepop
    circleLoc = width/2;

    //setup for squarefield scene
    driftX = 0;
    randomRotateAmt = random(1, 24);
    stroke(255);

    //setup for spiral
    arcLength = 0.0005;

    kickboxSensitivity = 135;

    song.loop();
}

function draw() {
    background(0);
    fft.analyze();

    bassAmp = fft.getEnergy(50, 0)/1.5;
    snareAmp = fft.getEnergy(1760, 50);
    noiseAmp = fft.getEnergy(19000, 1760);
    // console.log(bassAmp);

    // squarefield(20, 20, 1);
    if(bassAmp > kickboxSensitivity) kickbox(50, bassAmp, "cool", 2);
    else {
        circlepop();
        fxRain();
    }
}

// the circle scene with glitching triangles
function circlepop() {
    if(circleLoc == width){
        circleLoc = 0;
    } else {
        circleLoc = circleLoc + 1;
    }
    // add some randomness for the circle sizes
    noiseAmp *= (random(-200,200)/100);
    push();
    background(0);
    translate(circleLoc, height/2);
    fill(255);
    noStroke();
    ellipse(0, 0, noiseAmp, noiseAmp);
    ellipse(-width/2, 0, noiseAmp, noiseAmp);
    ellipse(width/2, 0, noiseAmp, noiseAmp);
    fill(0);
    ellipse(0, 0, noiseAmp/1.1, noiseAmp/1.1);
    ellipse(-width/2, 0, noiseAmp/1.1, noiseAmp/1.1);
    ellipse(width/2, 0, noiseAmp/1.1, noiseAmp/1.1);
    if(noiseAmp > 500) {
        stroke(255);
        strokeWeight(1);
        noFill();
        triangle(random(-800, 800), random(-800, 800), random(-800, 800), random(-800, 800), random(-800, 800), random(-800, 800));
        triangle(random(-800, 800), random(-800, 800), random(-800, 800), random(-800, 800), random(-800, 800), random(-800, 800));
        triangle(random(-800, 800), random(-800, 800), random(-800, 800), random(-800, 800), random(-800, 800), random(-800, 800));
    }
    pop();
}

// spiral --- Added this final scene straight from http://www.openprocessing.org/sketch/207913...
// and manipulated it with my sound analysis
function spiral() {
  background(0);
  noFill();

  arcLength = arcLength + 0.0001;
  if (arcLength == 10) {
    arcLength = 0.0005;
  }

  stroke(255);
  translate(width/2, height/2);
  for (var r=50; r<650; r=r+5) {
    rotate(millis()/2000.0);
    strokeWeight(3);
    arc(0, 0, r*bassAmp/10, r*bassAmp/10, 0, arcLength);
  }
}

// kickbox (graphic on beat)
function kickbox(margin, kickjerk, colorMode, thickness) {

  background(0);

  // top row
  var topLx = margin+int(random(-kickjerk, kickjerk));
  var topLy = margin+int(random(-kickjerk, kickjerk));
  var topCx = width/2+int(random(-kickjerk, kickjerk));
  var topCy = margin+int(random(-kickjerk, kickjerk));
  var topRx = width-margin+int(random(-kickjerk, kickjerk));
  var topRy = margin+int(random(-kickjerk, kickjerk));

  // mid row
  var midLx = margin+int(random(-kickjerk, kickjerk));
  var midLy = height/2+int(random(-kickjerk, kickjerk));
  var midCx = width/2+int(random(-kickjerk, kickjerk));
  var midCy = height/2+int(random(-kickjerk, kickjerk));
  var midRx = width-margin+int(random(-kickjerk, kickjerk));
  var midRy = height/2+int(random(-kickjerk, kickjerk));

  // bot row
  var botLx = margin+int(random(-kickjerk, kickjerk));
  var botLy = height-margin+int(random(-kickjerk, kickjerk));
  var botCx = width/2+int(random(-kickjerk, kickjerk));
  var botCy = height-margin+int(random(-kickjerk, kickjerk));
  var botRx = width-margin+int(random(-kickjerk, kickjerk));
  var botRy = height-margin+int(random(-kickjerk, kickjerk));

  // stroking
  if (colorMode == "cool") {
    if (bassAmp>kickboxSensitivity) {
      stroke(0, random(200, 255), random(150, 255), 230);
    } else {
      noStroke();
    }
  }
  if (colorMode == "warm") {
    if (bassAmp>kickboxSensitivity) {
      stroke(random(180, 255), random(50, 75), random(30, 60), 230);
    } else {
      noStroke();
    }
  }
  strokeWeight(random(thickness, thickness+10));

  // horizontal lines
  line(topLx, topLy, topCx, topCy);
  line(topCx, topCy, topRx, topRy);
  line(midLx, midLy, midCx, midCy);
  line(midCx, midCy, midRx, midRy);
  line(botLx, botLy, botCx, botCy);
  line(botCx, botCy, botRx, botRy);

  // vertical lines
  line(topLx, topLy, midLx, midLy);
  line(topCx, topCy, midCx, midCy);
  line(topRx, topRy, midRx, midRy);
  line(midLx, midLy, botLx, botLy);
  line(midCx, midCy, botCx, botCy);
  line(midRx, midRy, botRx, botRy);
}

// usable rain effect
function fxRain() {
  fill(255);
  textSize(random(noiseAmp));
  text("l", random(width), random(height));
}