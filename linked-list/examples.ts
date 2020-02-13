import { LinkedList } from ".";

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
