// https://www.acmicpc.net/problem/13975
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 

class PQ {
  constructor(comp) {
    this.heap = [];
    this.comp = comp;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  top() {
    return this.heap[0];
  }

  push(data) {
    this.heap.push(data);
    this.heapifyUp();
  }

  heapifyUp() {
    let childIdx = this.heap.length - 1;
    const childData = this.heap[childIdx];

    while(childIdx > 0) {
      const parentIdx = Math.floor((childIdx - 1) / 2);
      const parentData = this.heap[parentIdx];
      if(this.comp(parentData, childData)) break;
      this.heap[childIdx] = parentData;
      childIdx = parentIdx;
    }

    this.heap[childIdx] = childData;
  }

  pop() {
    this.heap[0] = this.heap.at(-1);
    this.heap.pop();
    if(this.heap.length > 0) {
      this.heapifyDown();
    }
  }

  heapifyDown() {
    let childIdx = 0;
    const childData = this.heap[childIdx];

    while(childIdx < this.heap.length) {
      const leftIdx = childIdx * 2 + 1;
      const rightIdx = childIdx * 2 + 2;
      if(leftIdx >= this.heap.length) break;
      const leftData = this.heap[leftIdx];
      const rightData = rightIdx < this.heap.length ? this.heap[rightIdx] : null;
      const bestIdx = rightData !== null && this.comp(rightData, leftData) ? rightIdx : leftIdx;
      const bestData = this.heap[bestIdx];
      if(this.comp(childData, bestData)) break;
      this.heap[childIdx] = bestData;
      childIdx = bestIdx;
    }
    this.heap[childIdx] = childData;
  }
}

const input = `2
4
40 30 30 50
15
1 21 3 4 5 35 5 4 3 5 98 21 14 17 32`;
const [t, ...data] = input.split('\n');
const result = [];

let j = 0;
for(let i = 0; i < +t; i++) {
  const k = data[j++];
  const nums = data[j++].split(' ').map(Number);
  result.push(solution(k, nums));
}

console.log(result.join('\n'));

function solution (k, nums) {
  const pq = new PQ((a, b) => a < b);
  let result = 0;
  for(const num of nums) {
    pq.push(num);
  }

  while(pq.heap.length !== 1) {
    const n1 = pq.top();
    pq.pop();
    const n2 = pq.top();
    pq.pop();
    result += n1 + n2;
    pq.push(n1 + n2);
  }
  return result;
}