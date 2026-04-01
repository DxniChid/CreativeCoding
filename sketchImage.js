let img;
let img2;
let combined;

function preload() {
  img = loadImage('image.png');   
  img2 = loadImage('image2.jpg'); 
}

function setup() {
  createCanvas(600, 400);
  noSmooth();

  img.resize(600, 400);
  img2.resize(600, 400);

  combined = createImage(img.width, img.height);

  combined.loadPixels();
  img.loadPixels();
  img2.loadPixels();

  for (let i = 0; i < combined.pixels.length; i += 4) {
    if ((i / 4) % 2 === 0) {
      // gerade Pixel von img2
      combined.pixels[i + 0] = img2.pixels[i + 0];
      combined.pixels[i + 1] = img2.pixels[i + 1];
      combined.pixels[i + 2] = img2.pixels[i + 2];
      combined.pixels[i + 3] = img2.pixels[i + 3];
    } else {
      // ungerade Pixel von img
      combined.pixels[i + 0] = img.pixels[i + 0];
      combined.pixels[i + 1] = img.pixels[i + 1];
      combined.pixels[i + 2] = img.pixels[i + 2];
      combined.pixels[i + 3] = img.pixels[i + 3];
    }
  }

  combined.updatePixels();
}

function draw() {
  background(50);
  image(combined, 0, 0, width, height);
}