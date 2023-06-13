// https://www.acmicpc.net/problem/2470
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `6
1 -1 90 41 5 -3`;
const [N, m] = input.split('\n');
const M = m.split(' ').map(Number);
console.log(solution(Number(N), M));

function solution(N, M) {
  const liqs = Array.from(M);
  const answer = [-1, -1];
  liqs.sort((a, b) => a - b);
  let min = Number.MAX_SAFE_INTEGER;
  let start = 0;
  let end = liqs.length - 1;

  while(start < end) {
    const sum = Math.abs(liqs[start] + liqs[end]);
    if(min > sum) {
      min = sum;
      answer[0] = liqs[start];
      answer[1] = liqs[end];

      if(sum === 0) {
        return answer.join(' ').trim();
      }
    }

    if(liqs[start] + liqs[end] < 0) {
      start++;
    } else {
      end--;
    }
  }

  return answer.join(' ').trim();
}