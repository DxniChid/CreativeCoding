let img;
let glitchAmount = 5; 

function preload() {
  img = loadImage('image3.png');
}

function setup() {
  createCanvas(img.width, img.height);
  img.loadPixels();
  noLoop(); 
}

function draw() {
  background(0);

  let glitchImg = createImage(img.width, img.height);
  glitchImg.loadPixels();
  for (let y = 0; y < img.height; y++) {
    let shift = int(random(-glitchAmount, glitchAmount));
    for (let x = 0; x < img.width; x++) {
      let srcX = constrain(x + shift, 0, img.width - 1);
      let index = (x + y * img.width) * 4;
      let srcIndex = (srcX + y * img.width) * 4;
      glitchImg.pixels[index + 0] = img.pixels[srcIndex + 0];     
      glitchImg.pixels[index + 1] = img.pixels[srcIndex + 1]; 
      glitchImg.pixels[index + 2] = img.pixels[srcIndex + 2]; 
      glitchImg.pixels[index + 3] = img.pixels[srcIndex + 3];
    }
  }
  glitchImg.updatePixels();

  // Dithering
  glitchImg.loadPixels();
  let dithered = createImage(glitchImg.width, glitchImg.height);
  dithered.loadPixels();
  for (let i = 0; i < glitchImg.pixels.length; i += 4) {
   //
    let val = 0.2126 * glitchImg.pixels[i] + 0.7152 * glitchImg.pixels[i + 1] + 0.0722 * glitchImg.pixels[i + 2];
    let rand = random(1, 256);
    if (rand > val) {
      dithered.pixels[i] = 255;
      dithered.pixels[i + 1] = 255;
      dithered.pixels[i + 2] = 255;
      dithered.pixels[i + 3] = 255;
    } else {
      dithered.pixels[i] = 0;
      dithered.pixels[i + 1] = 0;
      dithered.pixels[i + 2] = 0;
      dithered.pixels[i + 3] = 255;
    }
  }
  dithered.updatePixels();

  // Das geditherede Bild
  image(dithered, 0, 0);
}