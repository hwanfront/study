// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 
const input = `1
6 9 2
2 3 1
1 2 1
1 3 3
2 4 4
2 5 5
3 4 3
3 6 2
4 5 4
4 6 3
5 6 7
5
6`;
class PriorityQueue {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
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
    let ci = 0;
    const cd = this.heap[ci];
    
    while (ci < this.heap.length) {
      const li = ci * 2 + 1;
      const ri = ci * 2 + 2;
      if (li >= this.heap.length) break;
      const ld = this.heap[li];
      const rd = ri < this.heap.length ? this.heap[ri] : null;
      const bi = rd !== null && this.compare(rd, ld) ? ri: li;
      const bd = this.heap[bi];
      if (this.compare(cd, bd)) break;
      this.heap[ci] = bd;
      ci = bi;
    }
    this.heap[ci] = cd;
  }
}
const result = [];
const [T, ...data] = input.split('\n');
let j = 0;
for(let i = 0; i < +T; i++) {
  const [n, m, t] = data[j++].split(' ').map(Number);
  const [s, g, h] = data[j++].split(' ').map(Number);
  const edges = data.slice(j, j += m).map(e => e.split(' ').map(Number));
  const dt = data.slice(j, j += t).map(Number);
  result.push(solution(n, s, g, h, edges, dt));
}

console.log(result.join('\n'));

function solution (n, s, g, h, edges, dt) {
  const graph = Array.from({length: n + 1}, () => ([]));

  for(const [a, b, d] of edges) {
    graph[a].push([b, d]);
    graph[b].push([a, d]);
  }

  const dijkstra = (s) => {
    const dist = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    const pq = new PriorityQueue((a, b) => a[1] < b[1]);
    dist[s] = 0;
    pq.push([s, 0]);
    
    while(!pq.isEmpty()) {
      const [curNode, curCost] = pq.top();
      pq.pop();
      for(const [nextNode, nextCost] of graph[curNode]) {
        const cost = curCost + nextCost;
        if(dist[nextNode] > cost) {
          dist[nextNode] = cost;
          pq.push([nextNode, cost]);
        }
      }
    }

    return dist;
  }

  const sd = dijkstra(s);
  const gd = dijkstra(g);
  const hd = dijkstra(h);
  
  const result = [];

  for(const n of dt) {
    if(sd[n] === sd[g] + gd[h] + hd[n] || sd[n] === sd[h] + hd[g] + gd[n]) {
      result.push(n);
    }
  }

  result.sort((a, b) => a - b);

  return result.join(' ');
}