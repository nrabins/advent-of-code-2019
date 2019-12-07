import * as fs from 'fs';
import Node from './Node';

const DEBUG = false;
let text;
if (!DEBUG) {
  text = fs.readFileSync('src/6/input.txt').toString('utf-8');
} else {
  text = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;
}

const nodes: { [key: string]: Node } = {};

text.split(DEBUG ? '\n' : '\r\n').forEach(line => {
  const chunks = line.split(')');
  const parentId = chunks[0];
  const childId = chunks[1];

  if (nodes[parentId] == undefined) {
    nodes[parentId] = new Node(parentId);
  }

  if (nodes[childId] == undefined) {
    nodes[childId] = new Node(childId);
  }

  nodes[parentId].children.push(nodes[childId]);
  nodes[childId].parent = nodes[parentId];
});

let orbitCount = 0;

for (const id in nodes) {
  let node = nodes[id];

  while (node.parent != null) {
    orbitCount++;
    node = node.parent;
  }
}

console.log({ orbitCount });

