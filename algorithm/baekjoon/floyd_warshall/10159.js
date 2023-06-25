// https://www.acmicpc.net/problem/10159
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `9
11
2 1
3 1
2 8
2 9
7 8
4 5
6 7
6 3
1 7
6 2
1 9`;
const [N, M, ...abs] = input.split('\n');
console.log(solution(Number(N), Number(M), abs.map(e => e.split(' ').map(Number))));

function solution (n, m, abs) {
  let result = '';
  const floyd = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
  abs.forEach(([a, b]) => {
    floyd[a][b] = 1;
  })

  for(let k = 1; k <= n; k++) {
    for(let i = 1; i <= n; i++) {
      for(let j = 1; j <= n; j++) {
        if(floyd[i][k] > 0 && floyd[k][j] > 0) {
          floyd[i][j] = 1;
        }
      }
    }
  }

  for(let i = 1; i <= n; i++) {
    let cnt = 0;
    for(let j = 1; j <= n; j++) {
      if(i === j) continue;
      if(floyd[i][j] === 0 && floyd[j][i] === 0) cnt += 1;
    }
    result += `${cnt}\n`
  }

  return result.trim();
}