// https://www.acmicpc.net/problem/7568
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `5
55 185
58 183
88 186
60 175
46 155`;
const [n, ...data] = input.split`\n`;
console.log(solution(+n, data.map(e => e.split` `.map(Number))));

function solution(n, data) {
  const arr = Array(n).fill(0);
  for(let i = 0; i < n; i++) {
    let cnt = 0;
    for(let j = 0; j < n; j++) {
      if(i === j) continue;
      const [x, y] = data[i];
      const [p, q] = data[j];
      if(x < p && y < q) cnt++;
    }
    arr[i] = cnt + 1;
  }
  return arr.join` `;
}