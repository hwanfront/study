// * 메모리 초과를 피할 수 없어 파이썬으로 작성함
// https://www.acmicpc.net/problem/2293

// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3 10
2
3
5`
const [nk, ...data] = input.split('\n');
const [n, k] = nk.split(' ').map(Number);
console.log(solution(n, k, data.map(Number)));

function solution (n, k, data) {
  const total = Array(k + 1).fill(0);
  total[0] = 1;
  for(const coin of data) {
    for(let j = coin; j < k + 1; j++) {
      total[j] += total[j - coin];
    }
  }
  return total[k];
}