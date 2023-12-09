// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `5
10010011
01010011
11100011
01010101
01010011
10
1 1
2 1
3 1
4 1
1 -1
2 -1
3 -1
4 -1
5 1
5 -1`;
const [t, ...data] = input.split`\n`;
console.log(solution(+t, data.slice(0, +t), data.slice(+t + 1).map(e => e.split` `.map(Number))));
// 2 6
function solution(t, c, turns) {
  const L = 6;
  const R = 2;
  const u = Array(t).fill(0);
  let result = 0;


  const go = (n, d) => {
    const next = Array(t).fill(0);
    next[n] = d;
    for(let i = n - 1; i >= 0; i--) {
      if(c[i + 1][(u[i + 1] + L) % 8] === c[i][(u[i] + R) % 8]) break;
      next[i] = -next[i + 1];
    }
    for(let i = n + 1; i < t; i++) {
      if(c[i - 1][(u[i - 1] + R) % 8] === c[i][(u[i] + L) % 8]) break;
      next[i] = -next[i - 1];
    }
    return next;
  }

  for(const [n, d] of turns) {
    const next = go(n - 1, -d);
    for(let i = 0; i < t; i++) {
      u[i] = u[i] + next[i] < 0 ? 7 : u[i] + next[i];
    }
  }

  for(let i = 0; i < t; i++) {
    if(c[i][u[i] % 8] === '1') result++;
  }

  return result;
}