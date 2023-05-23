// https://www.acmicpc.net/problem/17404
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3
1 100 100
100 1 100
100 100 1`;
const [N, ...arr] = input.split('\n');
const rgbs = arr.map(e => e.split(' ').map(Number));
console.log(solution(Number(N), rgbs));

function solution(N, rgbs) {
  let result = Infinity;

  for(let i = 0; i < 3; i++) {
    const sum = [];
    const first = Array(3).fill(Infinity);
    const second = Array(3).fill(Infinity);
    first[i] = rgbs[0][i];
    for(let j = 0; j < 3; j++) {
      if(i === j) continue;
      second[j] = rgbs[0][i] + rgbs[1][j];
    }
    sum.push(first);
    sum.push(second);

    for(let j = 2; j < N; j++) {
      const [b1, b2, b3] = sum[j - 1];
      const [n1, n2, n3] = rgbs[j];
      const data = [];
      data.push(Math.min(b2, b3) + n1);
      data.push(Math.min(b3, b1) + n2);
      data.push(Math.min(b1, b2) + n3);
      if(j === N - 1) {
        data[i] = Infinity;
      }
      sum.push(data);
    }
    result = Math.min(result, ...sum[sum.length - 1]);
  }
  return result;
}