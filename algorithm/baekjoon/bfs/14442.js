// https://www.acmicpc.net/problem/14442
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `6 4 1
0100
1110
1000
0000
0111
0000`;

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class Queue {
 constructor() {
  this.head = null;
  this.tail = null;
  this.length = 0;
 }
 size() {
  return this.length;
 }

 isEmpty() {
  return this.length === 0;
 }

 push(data) {
  const node = new Node(data);
  if(!this.head) {
    this.head = node;
  } else {
    this.tail.next = node;
  }
  this.tail = node;
  this.length += 1;
 }

 pop() {
  if(!this.head) return null;
  const data = this.head.data;
  this.head = this.head.next;
  this.length -= 1;
  return data;
 }
}

const [NMK, ...grid] = input.split('\n');
console.log(solution(NMK.split(' ').map(Number), grid.map(e => e.split('').map(Number))));

function solution ([N, M, K], grid) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const visited = Array.from({length: N}, () => Array.from({length: M}, () => Array(K + 1).fill(false)));
  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < M;
  const bfs = () => {
    let queue = new Queue();
    queue.push([0, 0, 0, 0]);
    visited[0][0][0] = true;
    while(!queue.isEmpty()) {
      const [y, x, cnt, k] = queue.pop();
      if(y === N - 1 && x === M - 1) return cnt + 1;
      for(const [dy, dx] of direction) {
        const [ny, nx] = [dy + y, dx + x];
        if(!check(ny, nx)) continue;
        if(visited[ny][nx][k]) continue;
        if(grid[ny][nx] === 0) {
          visited[ny][nx][k] = true;
          queue.push([ny, nx, cnt + 1, k]);
        } else {
          if(!visited[ny][nx][k + 1] && k < K) {
            visited[ny][nx][k + 1] = true;
            queue.push([ny, nx, cnt + 1, k + 1]);
          }
        }
      }
    }
    return -1;
  }
  return bfs();
}