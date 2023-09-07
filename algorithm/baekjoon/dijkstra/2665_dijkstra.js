// https://www.acmicpc.net/problem/2665
// bfs 가능
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
  push(data) {
    this.heap.push(data);
    this.heapifyUp();
  }
  heapifyDown() {
    let ci = 0;
    const cd = this.heap[ci];
    while(ci < this.heap.length) {
      const li = ci * 2 + 1
      const ri = ci * 2 + 2
      if(li >= this.heap.length) break;
      const ld = this.heap[li];
      const rd = ri < this.heap.length ? this.heap[ri] : null;
      const bi = rd !== null && this.compare(rd, ld) ? ri : li;
      const bd = this.heap[bi];
      if(this.compare(cd, bd)) break;
      this.heap[ci] = bd;
      ci = bi;
    }
    this.heap[ci] = cd;
  }
  pop() {
    this.heap[0] = this.heap.at(-1);
    this.heap.pop();
    if(this.heap.length > 0) {
      this.heapifyDown();
    }
  }
}

function solution (n, data) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const visited = Array.from({length: n}, () => Array(n).fill(false));
  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < n;
  const dijkstra = () => {
    const pq = new PriorityQueue((a, b) => a[0] < b[0]);
    visited[0][0] = true;
    pq.push([0, [0, 0]]);
    while(!pq.empty()) {
      console.log(pq.heap);
      const [cost, [y, x]] = pq.top();
      pq.pop();
      if(y === n - 1 && x === n - 1) return cost;
      for(const [dy, dx] of direction) {
        const [ny, nx] = [dy + y, dx + x];
        if(!check(ny, nx)) continue;
        if(visited[ny][nx]) continue;
        visited[ny][nx] = true;
        if(data[ny][nx] === '0') {
          pq.push([cost + 1, [ny, nx]]);
        } else {
          pq.push([cost, [ny, nx]]);
        }
      }
    }
    return 0;
  }
  return dijkstra();
}

let input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [n, ...data] = input;
  console.log(solution(+n, data.map(e => e.split(''))));
})
