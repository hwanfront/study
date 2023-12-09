const PriorityQueue = require("../util/PriorityQueue");
// https://www.acmicpc.net/problem/1374
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `8
6 15 21
7 20 25
1 3 8
3 2 14
8 6 27
2 7 13
4 12 18
5 6 20`;
const [n, ...data] = input.split`\n`;
console.log(solution(+n, data.map(e => e.split` `.map(Number))));

function solution(n, data) {
  const pq = new PriorityQueue((a, b) => a < b);
  let s = 0;
  let result = 0;
  data.sort((a, b) => a[1] - b[1]);
  for(const [a, b, c] of data) {
    while(1) {
      if(pq.empty()) break;
      if(pq.top() > b) break;
      pq.pop();
    }
    s = b;
    pq.push(c);
    result = Math.max(result, pq.heap.length);
  }
  return result;
}