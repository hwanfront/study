// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

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

  push(data) {
    this.heap.push(data);
    this.heapifyUp();
  }

  heapifyUp() {
    let ci = this.heap.length - 1;
    const cd = this.heap[ci];
    
    while (ci > 0) {
      const pi = Math.floor((ci - 1) / 2);
      const pd = this.heap[pi];
      if (this.compare(pd, cd)) break;
      this.heap[ci] = pd;
      ci = pi;
    }

    this.heap[ci] = cd;
  }

  pop() {
    const last = this.heap.length - 1;
    this.heap[0] = this.heap[last];
    const data = this.heap.pop();
    
    if (this.heap.length > 0) {
      this.heapifyDown();
    }
    return data;
  }

  heapifyDown() {
    let pi = 0;
    const pd = this.heap[pi];
    
    while (pi < this.heap.length) {
      const li = pi * 2 + 1;
      const ri = pi * 2 + 2;
      if (li >= this.heap.length) break;
      const ld = this.heap[li];
      const rd = ri < this.heap.length ? this.heap[ri] : null;
      const bi = rd !== null && this.compare(rd, ld) ? ri: li;
      const bd = this.heap[bi];
      if (this.compare(pd, bd)) break;
      this.heap[pi] = bd;
      pi = bi;
    }
    this.heap[pi] = pd;
  }
}

const input = `6 8
4 5 3
2 4 0
4 1 4
2 1 1
5 6 1
3 6 2
3 2 6
3 4 4`;
const [NM, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(NM, data));

function solution([N, M], data) {
  const graph = Array.from({length: N + 1}, () => []);
  for(const [s, e, d] of data) {
    graph[s].push([e, d]);
    graph[e].push([s, d]);
  }

  const dijkstra = () => {
    const pq = new PriorityQueue((p, c) => p[1] < c[1]);
    const dist = Array(N + 1).fill(Number.MAX_SAFE_INTEGER);
    dist[1] = 0;
    pq.push([1, 0]);
    while(!pq.empty()) {
      const [node, d1] = pq.top();
      if(node === N) return d1;
      pq.pop();
      for(const [nextNode, d2] of graph[node]) {
        const nextDist = d1 + d2;
        if(dist[nextNode] > nextDist) {
          dist[nextNode] = nextDist;
          pq.push([nextNode, nextDist]);
        }
      }
    }
  }
  return dijkstra();
}