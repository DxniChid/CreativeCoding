let size = 20;

function setup() {
  createCanvas(500, 500);
  noStroke();
  noLoop(); 
}

function drawPattern() {
  background(220);
  for (let x = 0; x < width; x += size) {
    for (let y = 0; y < height; y += size) {
      fill(random(255), map(mouseX, 0, width, 0, 255), map(mouseY, 0, height, 0, 255)); //Map() rechnet einen Zahelnwert vom ursprünglichen Wertebereich (0, width) zum neuen (0, 255) um
      let cx = x + size / 2;
      let cy = y + size / 2;

      let d = random(10, size) + map(mouseX, 0, width, 0, 10);

      circle(cx, cy, d);
    }
  }
}

function mouseMoved() {
  drawPattern(); //Maus bewegt = Muster neu generiert
}

