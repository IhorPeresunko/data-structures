import { HashTable } from ".";

const table = new HashTable<string>(5);

table.put(1, '1');
table.put(2, '2');
table.put(3, '3');
table.put(2, '12');
table.put(7, '7');

console.log(table.get(1));
console.log(table.get(2));
console.log(table.get(13));

console.log(table.remove(2));

table.print();