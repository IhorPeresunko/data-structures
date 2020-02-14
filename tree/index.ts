
export class Tree {
  private root: Node | null = null;

  public insert(value: number): Node {
    const node = new Node(value);

    if (this.root === null) {
      this.root = node;

      return this.root;
    }

    let current = this.root;

    while (true) {
      if (value >= current.value) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = node;
          
          return node;
        }
      } else {
        if (current.left) {
          current = current.left;
        } else {
          current.left = node;

          return node;
        }
      }
    }

    return node;
  }

  public find(value: number): Node | null {
    let current = this.root;

    while (current !== null) {
      if (value > current.value) {
        current = current.right;
      } else if (value < current.value) {
        current = current.left;
      } else {
        return current;
      }
    }

    return null;
  }

  public traversePreOrder() {
    return this._traversePreOrder(this.root);
  }

  private _traversePreOrder(root: Node | null) {
    if (root === null) {
      return;
    }

    console.log(root.value);

    this._traversePreOrder(root.left);
    this._traversePreOrder(root.right);
  }

  public traverseInOrder() {
    return this._traverseInOrder(this.root);
  }

  private _traverseInOrder(root: Node | null) {
    if (root === null) {
      return;
    }

    this._traverseInOrder(root.left);

    console.log(root.value);

    this._traverseInOrder(root.right);
  }

  public traversePostOrder() {
    return this._traversePostOrder(this.root);
  }

  private _traversePostOrder(root: Node | null) {
    if (root === null) {
      return;
    }

    this._traversePostOrder(root.left);

    this._traversePostOrder(root.right);

    console.log(root.value);
  }

  public height(): number {
    if (!this.root) return -1;

    return this._height(this.root);
  }

  private _height(node: Node | null): number {
    if (node === null) {
      return -1;
    }

    const leftHeight = this._height(node.left);
    const rightHeight = this._height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  public min(): number {
    if (this.root === null) {
      throw new Error('Tree is empty');
    }

    return this._min(this.root);
  }

  private _min(node: Node): number {
    if (this.isLeaf(node)) {
      return node.value;
    }

    const minLeft = node.left ? this._min(node.left) : 0;
    const minRight = node.right ? this._min(node.right) : 0;

    return Math.min(minLeft, minRight, node.value);
  }

  public equals(tree: Tree): boolean {
    return this._equals(this.root, tree.root);
  }

  private _equals(node1: Node | null, node2: Node | null): boolean {
    if (node1 === null && node2 === null) {
      return true;
    }

    if (node1 !== null && node2 !== null) {
      return node1.value === node2.value &&
        this._equals(node1.left, node2.left) &&
        this._equals(node1.right, node2.right);
    }

    return false;
  }

  private isLeaf(node: Node): boolean {
    return node.left === null && node.right === null;
  }

  public print(): void {
    console.log(JSON.stringify(this.root, null, 2));
  }
}

class Node {
  public left: Node | null = null;
  public right: Node | null = null;

  constructor(private _value: number) {}

  get value() {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
}
