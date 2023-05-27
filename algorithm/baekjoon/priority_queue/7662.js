// https://www.acmicpc.net/problem/7662
// # 메모리 초과로 인해 fs 대신 readline 사용함.
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class PriorityQueue {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }

  empty() {
    return this.heap.length === 0;
  }

  top() {
    return this.heap[0];
  }

  push(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    const currentItem = this.heap[currentIndex];
    
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      const parentItem = this.heap[parentIndex];
      
      if (this.compare(parentItem, currentItem)) break;

      this.heap[currentIndex] = parentItem;
      currentIndex = parentIndex;
    }

    this.heap[currentIndex] = currentItem;
  }

  pop() {
    const last = this.heap.length - 1;
    this.heap[0] = this.heap[last];
    this.heap.pop();
    
    if (this.heap.length > 0) {
      this.heapifyDown();
    }
  }

  heapifyDown() {
    let currentIndex = 0;
    const currentItem = this.heap[currentIndex];
    
    while (currentIndex < this.heap.length) {
      const leftChildIndex = currentIndex * 2 + 1;
      const rightChildIndex = currentIndex * 2 + 2;

      if (leftChildIndex >= this.heap.length) break;

      const leftChildItem = this.heap[leftChildIndex];
      const rightChildItem = rightChildIndex < this.heap.length ? this.heap[rightChildIndex] : null;
      const bestIndex = rightChildItem !== null && this.compare(rightChildItem, leftChildItem) ? rightChildIndex: leftChildIndex;
      const bestItem = this.heap[bestIndex];
      
      if (this.compare(currentItem, bestItem)) break;

      this.heap[currentIndex] = bestItem;
      currentIndex = bestIndex;
    }
    this.heap[currentIndex] = currentItem;
  }
}

let t = null;
let k = null;
let cntT = 0;
let cntK = 0;
let maxheap = new PriorityQueue((a, b) => a > b);
let minheap = new PriorityQueue((a, b) => a < b);
let check = {};
const result = [];

rl.on('line', (line) => {
  if(t === null) {
    t = Number(line);
    return;
  }
  if(k === null) {
    k = Number(line);
    return;
  }
  const [c, v] = line.split(' ');
  if(c === 'I') {
    maxheap.push(Number(v));
    minheap.push(Number(v));
    if(check[Number(v)]) {
      check[Number(v)]++;
    } else {
      check[Number(v)] = 1;
    }
  } else {
    if(v === '1') {
      while(!maxheap.empty()) {
        const item = maxheap.top();
        maxheap.pop();

        if(check[item] > 0) {
          check[item]--;
          break;
        }
      }
    } 
    if(v === '-1') {
      while(!minheap.empty()) {
        const item = minheap.top();
        minheap.pop();

        if(check[item] > 0) {
          check[item]--;
          break;
        }
      }
    }
  }

  cntK++;

  if(k === cntK) {
    while(!maxheap.empty() && check[maxheap.top()] === 0) {
      maxheap.pop();
    }
    while(!minheap.empty() && check[minheap.top()] === 0) {
      minheap.pop();
    }
  
    if(minheap.empty() && maxheap.empty()) {
      result.push('EMPTY');
    } else {
      result.push(`${maxheap.top()} ${minheap.top()}`);
    }
    cntT++;
    cntK = 0;
    k = null;
    maxheap = new PriorityQueue((a, b) => a > b);
    minheap = new PriorityQueue((a, b) => a < b);
    check = {};
  }

  if(cntT === t) {
    rl.close();
  }
}).on('close', () => {
  console.log(result.join('\n'));
  process.exit();
})
