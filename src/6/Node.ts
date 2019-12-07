export default class Node {
  public parent: Node | null;
  public children: Node[];

  constructor(public id: string) {
    this.parent = null;
    this.children = [];
  }
}

