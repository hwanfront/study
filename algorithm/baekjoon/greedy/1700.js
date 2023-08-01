/**
 * 2 3 2 3 1 2 7 -> 23 12 27
 * 2 3 2 3 1 3 7 -> 23 13 37
 * 2 3 2 3 1 2 3 7 -> 23 12 23 27
 * 2 3 2 3 1 3 2 7 -> 23 13 12 17
 * 2 3 2 3 1 3 2 3 7 -> 23 13 23 17
 */
// https://www.acmicpc.net/problem/1700
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3 5
1 1 1 1 2`;
let [NK, uses] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NK, uses));

function solution ([N, K], uses) {
  let mt = [];
  let result = 0;

  let i = -1;

  while(mt.length !== N && ++i < K) {
    if(mt.includes(uses[i])) continue;
    mt.push(uses[i]);
  }
  
  for(; i < K; i++) {
    if(mt.includes(uses[i])) {
      continue;
    }

    let last = -1;
    let idx = -1;
    for(let j = 0; j < N; j++) {
      let k = i + 1;
      for(; k < K; k++) {
        if(uses[k] === mt[j]) {
          break;
        }
      }
      if(last < k) {
        last = k;
        idx = j;
      }
    }

    mt[idx] = uses[i];
    result++;
  }

  return result;
}