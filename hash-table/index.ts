import { LinkedList } from "../linked-list";

export class HashTable<T> {
  private entries: LinkedList<Entry<T>>[];

  constructor(size: number) {
    this.entries = new Array(size);
  }

  public put(key: number, value: T): void {
    const index = this.hash(key);
    const entry = new Entry<T>(key, value);

    const bucket = this.entries[index];

    if (!bucket) {
      const list = new LinkedList<Entry<T>>();
      list.addLast(entry);
      this.entries[index] = list;
    } else {
      let setupNewNode = true;

      bucket.forEach((el) => {
        if (el.key === key) {
          el.value = value;
          setupNewNode = false;
        }
      });

      if (setupNewNode) {
        bucket.addLast(entry);
      }
    }
  }

  public get(key: number): T | null {
    const index = this.hash(key);

    const bucket = this.entries[index];

    if (!bucket) {
      return null;
    }

    let el: Entry<T> | undefined;

    bucket.forEach((node) => {
      if (node.key === key) {
        el = node;
      }
    });
    
    if (el) {
      return el.value;
    }

    return null;
  }

  public remove(key: number): T | null {
    const index = this.hash(key);

    const bucket = this.entries[index];

    if (!bucket) {
      return null;
    }

    let el: Entry<T> | undefined;

    bucket.forEach((node, i) => {
      if (node.key === key) {
        el = node;
        bucket.remove(i);
      }
    });
    
    if (el) {
      return el.value;
    }

    return null;
  }

  private hash(key: number): number {
    return key % this.entries.length;
  }

  public print(): void {
    console.log(this.entries.map(e => e.toArray()));
  }
}

class Entry<T> {
  constructor(private _key: number, private _value: T) {}

  get value(): T {
    return this._value;
  }

  set value(val: T) {
    this._value = val;
  }

  get key(): number {
    return this._key;
  }

  set key(k: number) {
    this._key = k;
  }
}
