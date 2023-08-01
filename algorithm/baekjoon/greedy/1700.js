/**
 * belady's min algorithm
 * 페이지 교체 알고리즘 중 Optimal Replacement(OPT) 와 같음
 * 미래에 어떤 페이지를 사용할지 알고 있는 경우에 사용하는 페이지 교체 방법으로,
 * 가장 먼 미래에 사용될 페이지를 없애는 방식입니다.
 * 
 * 그러나 미래는 알 수 없으므로 현실적으로는 사용이 불가능하며
 * 다른 페이지 교체 알고리즘과 성능 비교하는 비교군으로 사용됩니다.
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