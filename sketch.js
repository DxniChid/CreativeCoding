function setup() {
  createCanvas(400, 400);
  background(220);
  noLoop();

  let size = 20;

  strokeWeight(2);
  noFill();

  for (let x = 0; x < width; x += size) {
    for (let y = 0; y < height; y += size) {

      if (random() > 0.5) {
        line(x, y, x + size, y + size);
      } else {
        line(x + size, y, x, y + size); 
      }
    }
}


function draw(){
  background(220);

}
}
