// https://www.acmicpc.net/problem/1781
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
class PQ {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }
  top() { return this.heap[0] }
  isEmpty() { return this.heap.length === 0 }
  size() { return this.heap.length }
  push(data) {
    this.heap.push(data);
    this.heapifyUp();
  }
  heapifyUp() {
    let ci = this.heap.length - 1;
    const cd = this.heap[ci];
    while(ci > 0) {
      const pi = Math.floor((ci - 1) / 2);
      const pd = this.heap[pi];
      if(this.compare(pd, cd)) break;
      this.heap[ci] = pd;
      ci = pi;
    }
    this.heap[ci] = cd;
  }
  pop() {
    this.heap[0] = this.heap.at(-1);
    this.heap.pop();
    if(this.heap.length === 0) return;
    this.heapifyDown();
  }
  heapifyDown() {
    let ci = 0;
    const cd = this.heap[ci];
    while(ci < this.heap.length) {
      const li = ci * 2 + 1;
      const ri = ci * 2 + 2;
      if(li > this.heap.length - 1) break;
      const ld = this.heap[li];
      const rd = ri < this.heap.length ? this.heap[ri] : null;
      const bi = rd !== null && this.compare(rd, ld) ? ri: li;
      const bd = this.heap[bi];
      if(this.compare(cd, bd)) break;
      this.heap[ci] = bd;
      ci = bi;
    }
    this.heap[ci] = cd;
  }
}
const input = `3
1 25
2 50
2 100`;
const [n, ...data] = input.split('\n');
console.log(solution(+n, data.map(e => e.split(' ').map(Number))));

function solution(n, data) {
  data.sort((a, b) => {
    if(b[0] === a[0]) return b[1] - a[1];
    return a[0] - b[0];
  })

  const pq = new PQ((a, b) => a < b)

  for(const [d, c] of data) {
    if(pq.size() < d) {
      pq.push(c);
      continue;
    }

    if(pq.top() >= c) continue;
    pq.pop();
    pq.push(c);
  }

  return pq.heap.reduce((pre, cur) => pre + cur, 0);
}