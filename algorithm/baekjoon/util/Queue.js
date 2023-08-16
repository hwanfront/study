class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
 constructor() {
  this.head = null;
  this.tail = null;
  this.length = 0;
 }
 size() {
  return this.length;
 }

 isEmpty() {
  return this.length === 0;
 }

 push(data) {
  const node = new Node(data);
  if(!this.head) {
    this.head = node;
  } else {
    this.tail.next = node;
  }
  this.tail = node;
  this.length += 1;
 }

 pop() {
  if(!this.head) return null;
  const data = this.head.data;
  this.head = this.head.next;
  this.length -= 1;
  return data;
 }
}

module.exports = Queue;
