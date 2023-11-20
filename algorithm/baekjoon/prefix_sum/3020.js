// https://www.acmicpc.net/problem/3020
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `14 5
1
3
4
2
2
4
3
4
3
3
3
2
3
3`;
const [NH, ...data] = input.split`\n`;
console.log(solution(NH.split` `.map(Number), data.map(Number)));

function solution([N, H], data) {
  const d = Array(H + 1).fill(0);
  const u = Array(H + 1).fill(0);
  let min = Number.MAX_SAFE_INTEGER;
  let cnt = 0;
  for(let i = 0; i < N; i++) {
    if(i % 2 === 0) d[data[i]]++
    else u[data[i]]++;
  }

  for(let i = 1; i <= H; i++) {
    u[H - i] += u[H - i + 1];
    d[H - i] += d[H - i + 1];
  }

  for(let i = 1; i <= H; i++) {
    const sum = d[i] + u[H - i + 1]
    if(sum < min) {
      min = sum;
      cnt = 1;
      continue;
    }
    if(sum === min) {
      cnt++;
    }
  }

  return `${min} ${cnt}`;
}