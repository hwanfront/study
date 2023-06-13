// https://www.acmicpc.net/problem/2473
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `7
-2 -3 -24 -6 98 100 61`;
const [N, m] = input.split('\n');
const M = m.split(' ').map(Number);
console.log(solution(Number(N), M));

function solution(N, M) {
  const liqs = Array.from(M);
  const answer = [0, 0, 0];
  let min = Number.MAX_SAFE_INTEGER;
  liqs.sort((a, b) => a - b);

  for(let i = 0; i < liqs.length; i++) {
    let start = i + 1;
    let end = liqs.length - 1;

    while(start < end) {
      const sum = liqs[i] + liqs[start] + liqs[end];
      if(min > Math.abs(sum)) {
        min = Math.abs(sum);
        answer[0] = liqs[i];
        answer[1] = liqs[start];
        answer[2] = liqs[end];

        if(sum === 0) {
          return answer.join(' ').trim();
        }
      }

      if(sum < 0) {
        start++;
      } else {
        end--;
      }
    }
  }

  return answer.join(' ').trim();
}