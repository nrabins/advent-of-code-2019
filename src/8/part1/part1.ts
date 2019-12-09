import * as fs from 'fs';

const WIDTH = 25;
const HEIGHT = 6;
const pixelsPerLayer = WIDTH * HEIGHT;
const input = fs.readFileSync('src/8/input.txt').toString('utf-8');

const layers: number[][] = [];

for (let layer = 0; layer * pixelsPerLayer < input.length; layer++) {
  const start = layer * pixelsPerLayer;
  const end = start + pixelsPerLayer;
  const layerPixels = input.slice(start, end).split("").map(char => parseInt(char, 10));
  layers.push(layerPixels);
}

// find layer with fewest 0 digits

let minZeroesLayer: number[] = layers[0];
let minZeroCount = Number.MAX_SAFE_INTEGER;

layers.forEach(layer => {
  const zeroCount = layer.filter(digit => digit == 0).length;
  if (zeroCount < minZeroCount) {
    minZeroesLayer = layer;
    minZeroCount = zeroCount;
  }
});

// find number of 1 digits multiplied by number of 2 digits
const onesCount = minZeroesLayer.filter(digit => digit == 1).length;
const twosCount = minZeroesLayer.filter(digit => digit == 2).length;

const result = onesCount * twosCount;
console.log({ result })