// https://www.acmicpc.net/problem/16719
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 
const input = `HABCDEFG`;

console.log(solution(input))

function solution (input) {
  const visited = Array(input.length).fill(false);
  let result = '';
  const go = (from, to) => {
    if(from > to) return;
    let idx = from;
    for(let i = from; i <= to; i++) {
      if(input[idx] > input[i]) {
        idx = i;
      }
    }
    visited[idx] = true;
    result += visited.map((e, i) => e ? input[i] : null).filter((e => e)).join('') + '\n';
    go(idx + 1, to);
    go(from, idx - 1);
  }

  go(0, input.length - 1);

  return result.trim();
}