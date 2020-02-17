
export default class AVLTree {
  private root: Node | null = null;

  public insert(value: number) {
    this.root = this._insert(this.root, value)
  }

  private _insert(root: Node | null, value: number): Node {
    if (root === null) {
      return new Node(value);
    }

    if (root.value > value) {
      root.left = this._insert(root.left, value);
    } else {
      root.right = this._insert(root.right, value)
    }

    this.setHeight(root);

    return this.balance(root);
  }

  private balance(node: Node): Node {
    if (this.isLeftHeavy(node)) {
      console.log('left heavy')

      if (this.balanceFactor(node.left) < 0 && node.left) {
        node.left = this.leftRotate(node.left);
      }
      return this.rightRotate(node);
    } else if (this.isRightHeavy(node)) {
      console.log('right heavy')
      if (this.balanceFactor(node.right) > 0 && node.right) {
        node.right = this.rightRotate(node.right);
      }
      return this.leftRotate(node);
    }

    return node;
  }

  private leftRotate(root: Node): Node {
    const newRoot = root.right;

    if (!newRoot) return root;

    root.right = newRoot.left;
    newRoot.left = root;

    this.setHeight(root);
    this.setHeight(newRoot);

    return newRoot;
  }

  private rightRotate(root: Node): Node {
    const newRoot = root.left;

    if (!newRoot) return root;

    root.left = newRoot.right;
    newRoot.right = root;

    this.setHeight(root);
    this.setHeight(newRoot);

    return newRoot;
  }

  private height(node: Node | null): number {
    return node === null ? -1 : node.height;
  }

  private setHeight(node: Node): void {
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  private balanceFactor(node: Node | null) {
    return node === null ? 0 : this.height(node.left) - this.height(node.right);
  }

  private isLeftHeavy(node: Node | null) {
    return this.balanceFactor(node) > 1;
  }

  private isRightHeavy(node: Node | null) {
    return this.balanceFactor(node) < -1;
  }

  public print(): void {
    console.log(JSON.stringify(this.root, null, 2));
  }
}

class Node {
  public left: Node | null = null;
  public right: Node | null = null;
  public height: number = 0;

  constructor(private _value: number) {}

  get value() {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
}
