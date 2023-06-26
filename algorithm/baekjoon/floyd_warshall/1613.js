// https://www.acmicpc.net/problem/1613
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 5
1 2
1 3
2 3
3 4
2 4
3
1 5
2 4
3 1`;
const [NK, ...data] = input.split('\n');
const [N, K] = NK.split(' ').map(Number);
const nums = data.slice(0, K).map(e => e.split(' ').map(Number));
const s = Number(data[K]);
const q = data.slice(K + 1).map(e => e.split(' ').map(Number));

console.log(solution(N, K, nums, s, q));

function solution (n, k, nums, s, q) {
  let result = '';
  const floyd = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Number.MAX_SAFE_INTEGER));
  nums.forEach(([a, b]) => {
    floyd[a][b] = 1;
  })

  for(let k = 1; k <= n; k++) {
    for(let i = 1; i <= n; i++) {
      for(let j = 1; j <= n; j++) {
        if(floyd[i][j] > floyd[i][k] + floyd[k][j]) {
          floyd[i][j] = floyd[i][k] + floyd[k][j];
        }
      }
    }
  }
  
  q.forEach(([a, b]) => {
    if(floyd[a][b] === Number.MAX_SAFE_INTEGER && floyd[b][a] === Number.MAX_SAFE_INTEGER) {
      result += '0\n';
      return;
    } 
    if(floyd[a][b] !== Number.MAX_SAFE_INTEGER) {
      result += '-1\n';
      return;
    }
    if(floyd[b][a] !== Number.MAX_SAFE_INTEGER) {
      result += '1\n';
      return;
    }
  })

  return result.trim();
}