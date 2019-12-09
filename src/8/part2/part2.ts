import * as fs from 'fs';

const WIDTH = 25;
const HEIGHT = 6;
const pixelsPerLayer = WIDTH * HEIGHT;
const input = fs.readFileSync('src/8/input.txt').toString('utf-8');

const renderedPixels: number[] = new Array(pixelsPerLayer).fill(2);

for (let layer = 0; layer * pixelsPerLayer < input.length; layer++) {
  const start = layer * pixelsPerLayer;
  const end = start + pixelsPerLayer;
  const layerPixels = input.slice(start, end).split("").map(char => parseInt(char, 10));

  layerPixels.forEach((pixel, i) => {
    if (pixel != 2) {
      if (renderedPixels[i] == 2) {
        renderedPixels[i] = pixel;
      }
    }
  })
}

for (let row = 0; row < HEIGHT; row++) {
  const start = row * WIDTH;
  const end = start + WIDTH;
  const rowPixels = renderedPixels.slice(start, end);
  const rowText = rowPixels.map(i => i == 0 ? " " : "█").join("");
  console.log(rowText);
}