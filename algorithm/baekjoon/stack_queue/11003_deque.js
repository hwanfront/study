// https://www.acmicpc.net/problem/11003
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
class Deque {
  static MAX = 5_000_000;
  constructor() {
    this.data = {};
    this.head = 0;
    this.tail = 1;
    this.length = 0;
  }

  peekHead() { 
    if(this.length) return this.data[this.head];
  }

  peekTail() { 
    if(this.length) return this.data[this.tail];
  }

  unshift(value) {
    this.length++;
    this.head = (this.head + 1) % Deque.MAX;
    this.data[this.head] = value;
  }

  shift()   {
    if (!this.length) return undefined;
    let value = this.peekHead();
    this.length--;
    delete this.data[this.head];
    this.head = (this.head || Deque.MAX) - 1;
    return value;
  }
  

  push(value) {
    this.length++;
    this.tail = (this.tail || Deque.MAX) - 1;
    this.data[this.tail] = value;
  }

  pop()   {
    if (!this.length) return undefined;
    let value = this.peekTail();
    this.length--;
    delete this.data[this.tail];
    this.tail = (this.tail + 1) % Deque.MAX;
    return value;
  }
  
}

const input = `12 3
1 5 2 3 6 2 3 7 3 5 2 6`;
const [NL, A] = input.split('\n').map(e => e.split(' ').map(Number));
solution(NL, A);

function solution ([N, L], A) {
  const deque = new Deque();
  let result = A[0] + ' ';

  deque.push([0, A[0]])

  for(let i = 1; i < N; i++) {
    if(deque.peekHead()[0] <= i - L) deque.shift();
    while(1) {
      if(deque.length === 0) break;
      if(deque.peekTail()[1] < A[i]) break;
      deque.pop();
    }
    deque.push([i, A[i]]);
    result += deque.peekHead()[1] + ' ';
    if(i % 10000 === 0) {
      process.stdout.write(result);
      result = '';
    }
  }
  console.log(result.trimEnd());
}