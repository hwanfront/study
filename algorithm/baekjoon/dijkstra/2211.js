// https://www.acmicpc.net/problem/2211
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
class PQ {
  constructor(comp) {
    this.heap = [];
    this.comp = comp;
  }

  empty() {
    return this.heap.length === 0;
  }

  top() {
    return this.heap[0]
  }

  push(data) {
    this.heap.push(data);
    this.heapifyUp();
  }

  pop() {
    this.heap[0] = this.heap.at(-1);
    this.heap.pop();
    if(this.heap.length > 0) this.heapifyDown();
  }

  heapifyUp() {
    let ci = this.heap.length - 1;
    const cd = this.heap[ci];
    while(ci > 0) {
      const pi = Math.floor((ci - 1) / 2);
      const pd = this.heap[pi];
      if(this.comp(pd, cd)) break;
      this.heap[ci] = pd;
      ci = pi;
    }
    this.heap[ci] = cd;
  }

  heapifyDown() {
    let ci = 0;
    const cd = this.heap[ci];
    while(ci < this.heap.length) {
      const [li, ri] = [ci * 2 + 1, ci * 2 + 2];
      if(li >= this.heap.length) break;
      const ld = this.heap[li];
      const rd = ri < this.heap.length ? this.heap[ri] : null;
      const bi = rd !== null && this.comp(rd, ld) ? ri : li;
      const bd = this.heap[bi];
      if(this.comp(cd, bd)) break;
      this.heap[ci] = bd;
      ci = bi;
    }
    this.heap[ci] = cd;
  }
}

const input = `4 5
1 2 1
1 4 4
1 3 2
4 2 2
4 3 3`;
const [nm, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(nm, data));

function solution ([n, m], data) {
  const graph = Array.from({length: n + 1}, () => ([]));

  for(const [a, b, c] of data) {
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }

  const dijkstra = () => {
    const dist = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    const direction = Array(n + 1).fill(-1);
    const pq = new PQ((a, b) => a[1] < b[1]);
    dist[1] = 0;
    pq.push([1, 0]);
    while(!pq.empty()) {
      const [curNode, curDist] = pq.top();
      pq.pop();
      for(let i = 0; i < graph[curNode].length; i++) {
        const [nextNode, newDist] = graph[curNode][i];
        const nextDist = curDist + newDist;
        if(nextDist < dist[nextNode]) {
          dist[nextNode] = nextDist;
          pq.push([nextNode, nextDist]);
          direction[nextNode] = curNode;
        }
      }
    }
    return direction;
  }

  graph[1].sort((a, b) => (a[1] - b[1]));

  const d = dijkstra();
  const result = [];

  for(let i = 2; i <= n; i++) {
    result.push(`${d[i]} ${i}`);
  }
  return `${result.length}\n${result.join('\n')}`
}