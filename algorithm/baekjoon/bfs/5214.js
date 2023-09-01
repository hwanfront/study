// https://www.acmicpc.net/problem/5214
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `15 8 4
11 12 8 14 13 6 10 7
1 5 8 12 13 6 2 4
10 15 4 5 9 8 14 12
11 12 14 3 5 6 1 13`;

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

  push(data) {
    const node = new Node(data);
    if(!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.length++;
  }

  pop() {
    if(!this.head) return null;
    const data = this.head.data;
    this.head = this.head.next;
    this.length--;
    return data;
  }
}

const [nkm, ...info] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(nkm, info)); 
function solution ([N, K, M], info) {
  const edge1 = Array.from({length: M}, () => ([]));
  const edge2 = Array.from({length: N + 1}, () => ([]));
  
  for(let i = 0; i < M; i++) {
    for(let j = 0; j < K; j++) {
      edge1[i].push(info[i][j]);
      edge2[info[i][j]].push(i);
    }
  }

  const queue = new Queue();
  queue.push([1, 1]);
  const visited1 = Array(M).fill(false);
  const visited2 = Array(N + 1).fill(false);
  visited2[1] = true;
  while(queue.length > 0) {
    const [num, cnt] = queue.pop();
    if(num === N) return cnt;
    for(const from of edge2[num]) {
      if(visited1[from]) continue;
      visited1[from] = true;
      for(const to of edge1[from]) {
        if(visited2[to]) continue;
        visited2[to] = true;
        queue.push([to, cnt + 1]);
      }
    }
  }

  return -1;
}
