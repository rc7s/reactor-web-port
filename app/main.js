var song, canvas, fft, noiseAmp, circleLoc;

function preload() {
    song = loadSound('data/playthis.mp3');
}

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    frameRate(60);
    fft = new p5.FFT();

    circleLoc = width/2;

    song.loop();
}

function draw() {
    background(0);
    noiseAmp = fft.analyze()[0]*3;
    circlepop();
    fxRain();
}

// the circle scene with glitching triangles
function circlepop() {
    if(circleLoc == width){
        circleLoc = 0;
    } else {
        circleLoc = circleLoc + 1;
    }
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

// usable rain effect
function fxRain() {
  fill(255);
  textSize(random(noiseAmp/3));
  text("l", random(width), random(height));
}