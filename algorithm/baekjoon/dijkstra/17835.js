/**
 * js 시간초과로 python 코드로 수정함
 */

// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("queue.in").toString().trim();
class PQ {
  constructor(comp) {
    this.comp = comp;
    this.heap = [];
  }
  isEmpty() { return this.heap.length === 0; }
  top() { return this.heap[0]; }
  push(data) {
    this.heap.push(data);
    this.hu()
  }
  hu() {
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
      this.hd();
    }
  }
  hd() {
    let ci = 0;
    const cd = this.heap[ci];
    while(cd < this.heap.length) {
      const li = ci * 2 + 1;
      const ri = ci * 2 + 2;
      const ld = li < this.heap.length ? null : this.heap[li];
      if(!ld) break;
      const rd = ri < this.heap.length ? null : this.heap[ri];
      const bi = rd !== null && this.comp(rd, ld) ? ri : li;
      const bd = this.heap[bi];
      if(this.comp(cd, bd)) break;
      this.heap[ci] = bd;
      ci = bi;
    }
    this.heap[ci] = cd;
  }
}

const input = `10 20 5
4 1 18
6 1 7
2 4 1
5 6 18
7 6 10
10 6 9
3 2 4
8 3 10
9 8 15
7 1 12
10 7 1
8 1 3
6 5 19
2 9 10
7 2 4
10 3 20
7 10 14
5 7 12
8 4 10
2 5 8
1 8 4 6 7`;
const [nmk, ...data] = input.split`\n`.map(e => e.split(' ').map(Number));
const ic = data.pop();
console.log(solution(nmk, data, ic));

function solution([n, m, k], uvc, ic) {
  const graph = Array.from({length: n + 1}, () => []);
  for(const [u, v, c] of uvc) {
    graph[v].push([u, c]);
  }

  const dijkstra = () => {
    const dist = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    const pq = new PQ((a, b) => a[1] < b[1]);

    for(const idx of ic) {
      pq.push([idx, 0]);
      dist[idx] = 0;
    }

    while(!pq.isEmpty()) {
      const [node, dist1] = pq.top();
      pq.pop();
      if(dist[node] < dist1) continue;
      for(const [nextNode, dist2] of graph[node]) {
        const nextDist = dist1 + dist2;
        if(nextDist < dist[nextNode]) {
          dist[nextNode] = nextDist;
          pq.push([nextNode, nextDist]);
        }
      }
    }

    return dist;
  }
  
  const dist = dijkstra();

  let result1 = 0;
  let result2 = 0;

  for(let i = 1; i <= n; i++) {
    if(result2 < dist[i]){
      result1 = i;
      result2 = dist[i];
    }
  }

  return `${result1}\n${result2}`
}