/**
 * B의 최댓값이 1000억 인데 
 * Number.MAX_SAFE_INTEGER 범위 내에 포함해도 결과값이 정확하지 않음을 보여줌
 * 흠......
 */
// https://www.acmicpc.net/problem/10830
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3 3
1 2 3
4 5 6
7 8 9`;
const [[N, B], ...matrix] = input.split('\n').map(e => e.split(' ').map(Number));
const MOD = 1000;
console.log(solution(N, BigInt(B), matrix));

function solution (N, B, matrix) {

  const multi = (m1, m2, n) => {
    const result = Array.from({length: n}, () => Array(n).fill(0));
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < n; j++) {
        for(let k = 0; k < n; k++) {
          result[i][j] += m1[i][k] * m2[k][j];
        }
        result[i][j] %= MOD;
      }
    }
    return result;
  }

  const getIdentityMatrix = (n) => {
    const result = Array.from({length: n}, () => Array(n).fill(0));
    for(let i = 0; i < n; i++) {
      result[i][i] = 1;
    }

    return result;
  }

  const pow = (matrix, n, b) => {
    let result = getIdentityMatrix(n);
    let m = matrix;
    while(b) {
      if(b & 1n) {
        result = multi(result, m, n);
      }
      m = multi(m, m, n);
      b = b >> 1n;
    }
    return result;
  }
  return pow(matrix, N, B).map(e => e.join(' ')).join('\n');
}