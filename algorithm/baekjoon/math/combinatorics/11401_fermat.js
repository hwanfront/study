// https://www.acmicpc.net/problem/11401
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `18 9`;
const [N, K] = input.split(' ').map(BigInt);
const MODULAR = 1_000_000_007n;
console.log(solution(N, K));

function solution (N, K) {
  const pow = (x, y) => {
    let result = 1n;
    let a = x;
    while(y) {
      if(y & 1) { 
        result = (result * a) % MODULAR;
      }
      a = (a * a) % MODULAR;
      y = Number(y) >> 1;
    }
    return result;
  }

  const factorial = (from, to) => {
    let result = 1n;
    for(let i = from; i <= to; i++) {
      result = (result * i) % MODULAR;
    }
    return result;
  }

  let a = factorial(N - K + 1n, N);
  let b = factorial(1n, K);

  return Number(a * pow(b, Number(MODULAR - 2n)) % MODULAR);
}