// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `2
6 7
1 2 4
1 3 1
1 5 2
2 3 2
3 4 3
4 5 2
6 5 1
2
3 5
4 5
1 2 2
1 3 1
2 3 2
2 4 3
3 4 6
2
3 4`;
const [t, ...data] = input.split`\n`;
const result = [];
let j = 0;
for(let i = 0; i < t; i++) {
  const [n, m] = data[j++].split` `.map(Number);
  const abcs = data.slice(j, j += m).map(e => e.split` `.map(Number));
  const k = +data[j++];
  const rs = data[j++].split` `.map(Number);
  result.push(solution(n, abcs, rs));
}

console.log(result.join`\n`);

function solution(n, abcs, rs) {
  const floyd = Array.from({length: n + 1}, () => Array(n + 1).fill(Number.MAX_SAFE_INTEGER));

  for(const [a, b, c] of abcs) {
    floyd[a][b] = c;
    floyd[b][a] = c;
  }

  for(let i = 1; i <= n; i++) {
    floyd[i][i] = 0;
  }

  for(let k = 1; k <= n; k++) {
    for(let i = 1; i <= n; i++) {
      for(let j = 1; j <= n; j++) {
        if(floyd[i][j] > floyd[i][k] + floyd[k][j]) {
          floyd[i][j] = floyd[i][k] + floyd[k][j];
        }
      }
    }
  }
  
  let where = 0;
  let max = Number.MAX_SAFE_INTEGER;
  for(let i = 1; i <= n; i++) {
    let sum = 0;
    for(const r of rs) {
      sum += floyd[i][r];
    }
    if(max < sum) {
      continue;
    }
    if(max === sum) {
      where = Math.min(where, i);
      continue;
    }
    where = i;
    max = sum;
  }
  return where;
}