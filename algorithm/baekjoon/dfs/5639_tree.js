// https://www.acmicpc.net/problem/5639
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 
const input = `50
30
24
5
28
45
98
52
60`;
const data = input.split('\n').map(Number);
console.log(solution(data));

function solution (data) {
  const result = [];
  const go = (from, to) => {
    if(from >= to) return;

    let i = from + 1;

    while(1) {
      if(i > data.length - 1) break;
      if(data[from] < data[i]) break;
      i++;
    }

    go(from + 1, i);
    go(i, to);
    result.push(data[from]);
  }

  go(0, data.length);
  
  return result.join('\n')
}