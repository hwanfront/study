// https://www.acmicpc.net/problem/1445
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
    let ci = this.heap.length - 1;
    let cd = this.heap[ci];
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
    let ci = 0;
    let cd = this.heap[ci];
    while(ci < this.heap.length) {
      const li = ci * 2 + 1;
      const ri = ci * 2 + 2;
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

const input = `6 6
......
g..Fg.
......
gggggg
......
...S.g`;
const [nm, ...data] = input.split('\n');
console.log(solution(nm.split(' ').map(Number), data));

function solution ([n, m], data) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < m;
  const map = Array.from({length: n}, () => Array(m).fill(0));
  const visited = Array.from({length: n}, () => Array(m).fill(false));
  let f;
  let s;
  for(let y = 0; y < n; y++) {
    for(let x = 0; x < m; x++) {
      if(data[y][x] === 'g') {
        map[y][x] = 2;
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(map[ny][nx] === 2) continue; 
          map[ny][nx] = 1;
        }
      }
      if(data[y][x] === 'F') {
        f = [y, x];
      }
      if(data[y][x] === 'S') {
        s = [y, x];
      }
    }
  }
  const dijkstra = () => {
    const pq = new PQ((a, b) => {
      if(a[1] === b[1]) return a[2] < b[2];
      return a[1] < b[1];
    });
    pq.push([[s[0], s[1]], 0, 0]);
    visited[s[0]][s[1]] = true;

    while(!pq.isEmpty()) {
      const [[y, x], tr, sm] = pq.top();
      if(y === f[0] && x === f[1]) {
        if(map[y][x] === 1) return [tr, sm - 1];
        return [tr, sm];
      };
      pq.pop();
      for(const [dy, dx] of direction) {
        const [ny, nx] = [dy + y, dx + x];
        if(!check(ny, nx)) continue;
        if(visited[ny][nx]) continue;
        visited[ny][nx] = true;
        if(map[ny][nx] === 2) {
          pq.push([[ny, nx], tr + 1, sm])
          continue;
        }
        if(map[ny][nx] === 1) {
          pq.push([[ny, nx], tr, sm + 1])
          continue;
        }
        pq.push([[ny, nx], tr, sm])
      }
    }
  }

  return dijkstra().join(' ');
}