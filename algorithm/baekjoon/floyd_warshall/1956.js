// * 대각선은 사이클 존재 여부와 사이클의 최소 길이
// https://www.acmicpc.net/problem/1956
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4 6
1 2 1
3 2 1
1 3 5
2 3 2
3 4 1
4 1 1`;
const [VE, ...abcs] = input.split('\n').map(e => e.split(' ').map(Number));
const [V, E] = VE;
console.log(solution(V, E, abcs));

function solution (v, e, abcs) {
  let result = Number.MAX_SAFE_INTEGER;
  const floyd = Array.from({ length: v + 1 }, () => Array(v + 1).fill(Number.MAX_SAFE_INTEGER));
  abcs.forEach(([a, b, c]) => {
    floyd[a][b] = c;
  })

  for(let k = 1; k <= v; k++) {
    for(let i = 1; i <= v; i++) {
      for(let j = 1; j <= v; j++) {
        if(floyd[i][j] > floyd[i][k] + floyd[k][j]) {
          floyd[i][j] = floyd[i][k] + floyd[k][j];
        }
      }
    }
  }

  for(let i = 1; i <= v; i++) {
    result = Math.min(result, floyd[i][i])
  }

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
}