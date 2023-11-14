// https://www.acmicpc.net/problem/11729
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `3`;

console.log(solution(+input));

function solution(input) {
  const result = [];
  const hanoi = (n, from, mid, to) => {
    if(n === 0) return;
    hanoi(n - 1, from, to, mid);
    result.push(`${from} ${to}`);
    hanoi(n - 1, mid, from, to);
  }

  hanoi(input, 1, 2, 3);

  return result.length + '\n' + result.join('\n')
}