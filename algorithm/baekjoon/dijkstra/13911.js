// https://www.acmicpc.net/problem/13911
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
class PQ {
  constructor(comp) {
    this.heap = [];
    this.comp = comp;
  }
  top() {
    return this.heap[0];
  }
  isEmpty() {
    return this.heap.length === 0;
  }
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
      if(this.comp(pd, cd)) break;
      this.heap[ci] = pd;
      ci = pi;
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
  heapifyDown() {
    let pi = 0;
    const pd = this.heap[pi];
    while(pi < this.heap.length) {
      const li = pi * 2 + 1;
      const ri = pi * 2 + 2;
      if(li >= this.heap.length) break;
      const ld = this.heap[li];
      const rd = ri < this.heap.length ? this.heap[ri] : null;
      const bi = rd !== null && this.comp(rd, ld) ? ri : li;
      const bd = this.heap[bi];
      if(this.comp(pd, bd)) break;
      this.heap[pi] = bd;
      pi = bi;
    }
    this.heap[pi] = pd;
  }
}

const input = `8 11
1 2 2
1 4 1
2 4 2
2 3 1
2 7 8
3 7 3
4 5 2
4 6 1
6 7 6
6 8 4
7 8 2
2 6
1 5
1 4
8`;
const [ve, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
const ss = data.pop();
const sy = data.pop();
const ms = data.pop();
const mx = data.pop();
console.log(solution(ve, data, mx, ms, sy, ss));

function solution([v, e], data, [mc, mx], ms, [sc, sy], ss) {
  const graph = Array.from({length: v + 1}, () => []);
  let result = Number.MAX_SAFE_INTEGER;

  const dijkstra = (from) => {
    const pq = new PQ((a, b) => a[1] < b[1]);
    const dist = Array(v + 1).fill(Number.MAX_SAFE_INTEGER);
    for(const node of from) {
      dist[node] = 0;
      pq.push([node, 0]);
    }
    while(!pq.isEmpty()) {
      const [node, d1] = pq.top();
      pq.pop();
      for(const [next, d2] of graph[node]) {
        const nextDist = d1 + d2;
        if(nextDist < dist[next]) {
          dist[next] = nextDist;
          pq.push([next, nextDist]);
        }
      }
    }
    return dist;
  }

  for(const [a, b, d] of data) {
    graph[a].push([b, d])
    graph[b].push([a, d])
  }

  const md = dijkstra(ms);
  const sd = dijkstra(ss);

  for(let i = 1; i <= v; i++) {
    if(md[i] === 0) continue;
    if(sd[i] === 0) continue;
    if(md[i] > mx) continue;
    if(sd[i] > sy) continue;
    result = Math.min(result, md[i] + sd[i]);
  }
  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
}