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
K)L
K)YOU
I)SAN`;
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

const transfers = getTransfersBetween(nodes['YOU'], nodes['SAN']);
console.log({transfers});

function getTransfersBetween(a: Node, b: Node): number {
  const aParents = getParentsRecursively(a);
  const bParents = getParentsRecursively(b);

  for (let aDistance = 0; aDistance < aParents.length; aDistance++) {
    const id = aParents[aDistance];
    const bDistance = bParents.indexOf(id);
    if (bDistance >= 0) {
      const totalTransfers = aDistance + bDistance;
      console.log(`found common ancestor at ${id}, total transfers: ${totalTransfers}`);
      return totalTransfers;
    }
  }
  return -1;
}

function getParentsRecursively(node: Node): string[] {
  const parents: string[] = []
  while (node.parent != undefined) {
    parents.push(node.parent.id);
    node = node.parent;
  }
  return parents;
}

