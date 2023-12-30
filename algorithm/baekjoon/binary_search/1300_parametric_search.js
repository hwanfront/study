// https://www.acmicpc.net/problem/1300
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `5
22`;
const [n, k] = input.split`\n`.map(Number);
console.log(solution(n, k));

function solution(n, k) {
  let l = 0;
  let r = n**2;
  while(l < r) {
    const m = Math.floor((l + r) / 2);
    let cnt = 0;
    for(let i = 1; i <= n; i++) {
      cnt += Math.min(n, Math.floor(m / i));
      if(cnt > k) break;
    }
    
    if(cnt >= k) {
      r = m;
    } else {
      l = m + 1;
    }
  }

  return l;
}