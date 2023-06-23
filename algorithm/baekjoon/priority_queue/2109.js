// https://www.acmicpc.net/problem/2109
const PriorityQueue = require('../util/PriorityQueue');
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `7
20 1
2 1
10 3
100 2
8 2
5 20
50 10`;
const [n, ...pds] = input.split('\n');
console.log(solution(+n, pds.map(e => e.split(' ').map(Number))));

function solution (n, pds) {
  const sortedPds = pds.sort((a, b) => a[1] - b[1]);
  const pq = new PriorityQueue((a, b) => a[0] < b[0]);
  
  for(const [p, d] of sortedPds) {
    pq.push([p, d]);
    if(pq.heap.length > d) {
      pq.pop();
    }
  }

  return pq.heap.reduce((p, c) => p + c[0], 0);
}
