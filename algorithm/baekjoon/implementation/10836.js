// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `4 2
2 3 2
0 6 1`;
const [mn, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(mn, data));

function solution([m, n], data) {
  const arr = Array(m * 2 - 1).fill(1);
  for(const [a, b, c] of data) {
    let j = a;
    for(let i = 0; i < b; i++) {
      arr[j++] += 1;
    }
    for(let i = 0; i < c; i++) {
      arr[j++] += 2;
    }
  }
  const result = Array.from({length: m}, () => Array(m).fill(0));
  for(let y = m - 1; y >= 0; y--) {
    const idx = m - 1 - y;
    result[y][0] = arr[idx];
  }
  for(let x = 0; x < m; x++) {
    const idx = m - 1 + x;
    result[0][x] = arr[idx];
  }
  
  for(let y = 1; y < m; y++) {
    for(let x = 1; x < m; x++) {
      result[y][x] = Math.max(result[y - 1][x], result[y - 1][x - 1], result[y][x - 1]);
    }
  }
  return result.map(e => e.join` `).join`\n`;
}