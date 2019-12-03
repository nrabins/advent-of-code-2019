const fs = require('fs');
const text = fs.readFileSync('3/input.txt').toString('utf-8');

// const text = `R8,U5,L5,D3\nU7,R6,D4,L4`

const wireInstructionLists = text.split('\n').map(wireText => {
  return wireText.split(',').map(text => {
    return {
      direction: text[0],
      distance: parseInt(text.slice(1), 10)
    }
  });
});


// list of wires, each of which is a list of pairs of points (the start [non-inclusive] and end [inclusive] of a wire length)
wireSegmentsByWire = [];

wireInstructionLists.forEach(wireInstructionList => {
  let point = { x: 0, y: 0 };

  const wireSegments = [];
  wireInstructionList.forEach(instruction => {
    let start = Object.assign({}, point);
    let end = {};

    switch (instruction.direction) {
      case "U":
        start = { x: point.x, y: point.y + 1 };
        end = { x: point.x, y: point.y + instruction.distance };
        break;
      case "D":
        start = { x: point.x, y: point.y - 1 };
        end = { x: point.x, y: point.y - instruction.distance };
        break;
      case "L":
        start = { x: point.x - 1, y: point.y };
        end = { x: point.x - instruction.distance, y: point.y };
        break;
      case "R":
        start = { x: point.x + 1, y: point.y };
        end = { x: point.x + instruction.distance, y: point.y };
        break;
    }
    wireSegments.push({
      start,
      end,
      length: getDistance(start, end)
    });
    point = end;
  });
  wireSegmentsByWire.push(wireSegments);
});

// find intersections
const intersections = [];

let wireLength1 = 0;
wireSegmentsByWire[0].forEach(wire1 => {
  let wireLength2 = 0;
  wireSegmentsByWire[1].forEach(wire2 => {

    const intersectionPoint = getIntersectionPoint(wire1, wire2);
    if (intersectionPoint != null) {
      const partialSegment1 = getDistance(wire1.start, intersectionPoint);
      const partialSegment2 = getDistance(wire2.start, intersectionPoint);
      intersections.push({
        point: intersectionPoint,
        wireTotal: wireLength1 + wireLength2 + partialSegment1 + partialSegment2 + 2 // +2 because we start each wire one step in
      })
    }
    wireLength2 += wire2.length + 1; // +1 because we start each wire one step in
  })
  wireLength1 += wire1.length + 1; // +1 because we start each wire one step in
});

const minManhattanDistance = intersections.reduce((min, intersection) => {
  const distance = Math.abs(intersection.point.x) + Math.abs(intersection.point.y);
  return distance < min ? distance : min;
}, Number.MAX_SAFE_INTEGER);

console.log({ minManhattanDistance });

const minWireUsage = intersections.reduce((min, intersection) => {
  return intersection.wireTotal < min ? intersection.wireTotal : min;
}, Number.MAX_SAFE_INTEGER);

console.log({ minWireUsage });

function getIntersectionPoint(a, b) {
  let hLine = a.start.y == a.end.y ? a : b;
  let vLine = a.start.x == a.end.x ? a : b;

  hLine.left = Math.min(hLine.start.x, hLine.end.x);
  hLine.right = Math.max(hLine.start.x, hLine.end.x);
  hLine.y = hLine.start.y;

  vLine.bottom = Math.min(vLine.start.y, vLine.end.y);
  vLine.top = Math.max(vLine.start.y, vLine.end.y);
  vLine.x = vLine.start.x;

  const intersects = isWithinInclusive(vLine.x, hLine.left, hLine.right) &&
    isWithinInclusive(hLine.y, vLine.bottom, vLine.top);
  if (intersects) {
    var intersection = { x: vLine.x, y: hLine.y }
    console.log(`intersection found at (${intersection.x},${intersection.y}) between [(${a.start.x},${a.start.y}),(${a.end.x},${a.end.y})] and [(${b.start.x},${b.start.y}),(${b.end.x},${b.end.y})]`)
    return intersection;
  } else {
    return null;
  }
}

function isWithinInclusive(test, left, right) {
  return left <= test && test <= right;
}

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
