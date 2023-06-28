// https://www.acmicpc.net/problem/2143
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5
4
1 3 1 2
3
1 3 2`;
const [t, n, a, m, b] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(t, a, b));

function solution (t, a, b) {
  let answer = 0;
  const aMap = new Map();

  for(let i = 0 ; i < a.length; i++) {
    let sum = 0;
    for(let j = i; j < a.length; j++) {
      sum += a[j];
      if(aMap.has(sum)) {
        aMap.set(sum, aMap.get(sum) + 1)
      } else {
        aMap.set(sum, 1);
      }
    }
  }

  for(let i = 0 ; i < b.length; i++) {
    let sum = 0
    for(let j = i; j < b.length; j++) {
      sum += b[j];
      if(aMap.has(t - sum)) {
        answer += aMap.get(t - sum);
      }
    }
  }
  return answer
}