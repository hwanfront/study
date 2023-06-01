// https://www.acmicpc.net/problem/11657
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `3 2
1 2 4
1 2 3`;
const [NM, ...arr] = input.split('\n');
console.log(solution(NM.split(' ').map(Number), arr.map(e => e.split(' ').map(Number))));

function solution([N, M], edges) {
  const dist = Array(N + 1).fill(Infinity);

  const bellman = (start) => {
    dist[start] = 0;
    for(let i = 1; i <= N; i++) {
      for(const [A, B, C] of edges) {
        if(dist[A] === Infinity) continue;
        if(dist[A] + C < dist[B]) {
          if(i === N) return -1;
          dist[B] = dist[A] + C;
        }
      }
    }
    return dist;
  }
  const res = bellman(1);
  if(res !== -1) return dist.slice(2).map(e => e === Infinity ? -1 : e).join('\n');
  return res;
}