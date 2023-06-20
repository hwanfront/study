/**
 * # 결과값
 *    1  2   3   4    5    6     7     8
 * 1  1  1   1   1    1    1     1     1
 * 2  3  4   5   6    7    8     9     10
 * 3  6  10  15  21   28   36    45    55
 * 4  10 20  35  56   84   120   165   220
 * 5  15 35  70  126  210  330   495   715
 * 6  21 56  126 255  462  792   1287  2002
 * 7  28 84  210 462  924  1716  3003  5005
 * 8  36 120 330 792  1716 3432  6435  11440
 * 9  45 165 495 1287 3003 6435  12870 24310
 * 10 55 220 715 2002 5005 11440 24310 48620
 */
/**
 * 1. 1_000_000_007 은 소수
 * 2. 조합 (K+N)C(N-1) 
 *    = (K+N)! / (N-1)!(K+1)!
 *    = (N * N+1 * ... * K+N) / (K+1)!
 * 3. 페르마의 소정리 A! / B! mod M = A! * pow(B!, M-2)
 * 4. (N * N+1 * ... * K+N) * pow((K+1)!, M-2)
 */

// https://www.acmicpc.net/problem/13430
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4 1000000000`;
const [K, N] = input.split(' ').map(BigInt);
const MODULAR = 1_000_000_007n;
console.log(solution(K, N));

function solution (K, N) {
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

  let a = factorial(N, K + N);
  let b = factorial(1n, K + 1n);

  return Number(a * pow(b, Number(MODULAR - 2n)) % MODULAR);
}