
class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length: number = 0;

  public isEmpty(): boolean {
    return this.head === null;
  }

  public size(): number {
    return this.length;
  }

  public get(position: number): ListNode<T> {
    if (position >= this.length) {
      throw new Error('Out of range');
    }

    if (this.head === null) {
      throw new Error('Out of range');
    }

    let current = this.head;
    let i = 0;

    while (current.next && i < position) {
      current = current.next;
      ++i;
    }

    return current;
  }

  public add(value: T, position: number): ListNode<T> {
    if (position > this.size()) {
      throw new Error('Out of range');
    }

    const node = new ListNode<T>(value);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
      ++this.length;

      return this.head;
    }

    if (position === 0) {
      node.next = this.head;
      this.head = node;
      ++this.length;

      return this.head;
    }

    if (this.tail && position === this.size()) {
      this.tail.next = node;
      this.tail = node;
      ++this.length;

      return this.head;
    }

    let current = this.head;
    let i = 0;

    while (current.next && i < position - 1) {
      current = current.next;
      ++i;
    }

    node.next = current.next;
    current.next = node;

    ++this.length;

    return this.head;
  }
  
  public addLast(value: T): ListNode<T> {
    return this.add(value, this.size());
  }

  public addFirst(value: T): ListNode<T> {
    return this.add(value, 0);
  }

  public remove(position: number): T {
    if (!this.head || position >= this.size()) {
      throw new Error('Range error');
    }

    if (position === 0) {
      const value = this.head.value;

      this.head = this.head.next;

      return value;
    }

    let current = this.head;
    let i = 0;

    while (current.next && i < position - 1) {
      current = current.next;
      ++i;
    }

    if (position === this.size() - 1) {
      current.next = null;
      this.tail = current;
    } else if (current.next) {
      const value = current.next.value;

      current.next = current.next.next;

      return value;
    }

    return current.value;
  }

  public removeFirst(): T {
    return this.remove(0);
  }

  public removeLast(): T {
    return this.remove(this.size() - 1);
  }

  public toArray(): Array<T> {
    const arr = new Array<T>();

    if (this.head === null) {
      return arr;
    }

    let current: ListNode<T> | null = this.head;

    while (current) {
      arr.push(current.value);
      current = current.next;
    }

    return arr;
  }
}

class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {};
}

const list = new LinkedList<string>();

list.addLast('1');
list.addLast('2');
list.addLast('3');
list.addFirst('0');

list.add('1m2', 2);

console.log(list.toArray());

list.remove(4);

list.addLast('3');

console.log(list.toArray());

list.removeFirst();

console.log(list.toArray());

list.addFirst('0')

console.log(list.toArray());
