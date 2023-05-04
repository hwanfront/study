// https://www.acmicpc.net/problem/2839
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString();
const [S, T] = input.split('\n');
console.log(solution(S, T));

function solution(S, T) {
  const tArr = T.split('');
  while(1) {
    if(tArr.length === S.length) {
      console.log(tArr);
      if(tArr.join('') === S) return 1;
      return 0;
    }
    if(tArr[tArr.length - 1] === 'A') {
      tArr.pop();
    } else {
      tArr.pop();
      tArr.reverse();
    }
  }
}