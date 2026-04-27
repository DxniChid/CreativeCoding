let axiom;
let rules = {};
let sentence;

let angle;
let len;

let systemIndex = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
  setupSystem(systemIndex);
  generate(5);
  turtle();
}

// L-System

function generate(iterations) {
  sentence = axiom;

  for (let i = 0; i < iterations; i++) {
    let next = "";

    for (let j = 0; j < sentence.length; j++) {
      let c = sentence[j];

      if (typeof rules[c] === "function") {
        next += rules[c]();
      } else {
        next += rules[c] || c;
      }
    }

    sentence = next;
  }
}

// Turtle

function turtle() {
  background(0);
  resetMatrix();

  translate(width / 2, height);

  for (let i = 0; i < sentence.length; i++) {
    let c = sentence[i];

    stroke(map(i, 0, sentence.length, 0, 255), 200, 255);

    if (c === "F" || c === "A" || c === "B") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } 
    else if (c === "f") {
      translate(0, -len);
    } 
    else if (c === "+") {
      rotate(angle);
    } 
    else if (c === "-") {
      rotate(-angle);
    } 
    else if (c === "[") {
      push();   
    } 
    else if (c === "]") {
      pop();   
    }
  }
}

// Systeme

function setupSystem(index) {

  if (index === 0) {
    axiom = "F";
    rules = {
      "F": "FF+[+F-F-F]-[-F+F+F]"
    };
    angle = radians(25);
    len = 5;
  }

  else if (index === 1) {
    // Sierpinski
    axiom = "A";
    rules = {
      "A": "B-A-B",
      "B": "A+B+A"
    };
    angle = radians(60);
    len = 5;
  }

  else if (index === 2) {
    // Koch
    axiom = "F";
    rules = {
      "F": "F+F--F+F"
    };
    angle = radians(60);
    len = 4;
  }

  else if (index === 3) {
    // Crystal
    axiom = "F++F++F";
    rules = {
      "F": "F-F++F-F"
    };
    angle = radians(60);
    len = 4;
  }

  else if (index === 4) {
    // Random Tree
    axiom = "F";
    rules = {
      "F": () => random() < 0.5
        ? "F[+F]F[-F]F"
        : "FF"
    };
    angle = radians(20);
    len = 5;
  }
}

// Interaktion

function mousePressed() {
  generate(1);
  turtle();
}

function keyPressed() {
  systemIndex = (systemIndex + 1) % 5;
  setupSystem(systemIndex);
  generate(5);
  turtle();
}