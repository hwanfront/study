// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `5
3 3 5 4 3
5
1 1
2 1
11 3
1000 4
5 1`;
const [m, f, q, ...nx] = input.split('\n');
console.log(solution(+m, f.split` `.map(Number), +q, nx.map(e => e.split` `.map(Number))));

function solution (m, f, q, nx) {
  const LEN = 20;
  const fn = Array.from({length: m + 1}, () => Array(LEN).fill(0));
  const result = [];

  for(let i = 0; i < m; i++) {
    fn[i + 1][0] = f[i];
  }

  for(let i = 1; i < LEN; i++) {
    for(let j = 0; j <= m; j++) {
      fn[j][i] = fn[fn[j][i - 1]][i - 1];
    }
  }

  for(let [n, x] of nx) {
      for(let i = LEN - 1; i >= 0; i--) {
      if(n & (1 << i)) {
        x = fn[x][i];
      }
    }
    result.push(x);
  }
  
  return result.join`\n`;
}