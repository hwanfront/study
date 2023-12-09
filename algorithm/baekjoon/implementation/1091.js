// https://www.acmicpc.net/problem/1091
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `12
1 1 2 0 2 0 1 0 2 2 1 0
5 0 9 7 1 8 3 10 4 11 6 2`;
const [n, p, s] = input.split`\n`;
console.log(solution(+n, p.split` `.map(Number), s.split` `.map(Number)));

function solution(n, p, s) {
  const set = new Set();
  let result = 0;
  const check = () => {
    for(let i = 0; i < n; i++) {
      if(p[i] === i % 3) continue; 
      return false;
    }
    return true;
  }
  while(1) {
    if(set.has(p.join` `)) return -1;
    if(check()) return result;
    result++;
    set.add(p.join` `);
    const next = Array(n).fill(0);
    for(let i = 0; i < n; i++) {
      next[s[i]] = p[i];
    }
    p = next;
  }
}

// 2 0 1
// 1 2 0
// 0 1 2

// 1 0 2
// 1 2 0
// 1 0 2