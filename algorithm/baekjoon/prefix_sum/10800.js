// https://www.acmicpc.net/problem/10800
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4
1 4
2 4
1 4
1 4`;
const [N, ...arr] = input.split('\n');
console.log(solution(Number(N), arr.map(e => e.split(' ').map(Number))));

function solution (N, arr) {
  const map = new Map();
  const sortedArr = arr.map((e, idx) =>([e[0], e[1], idx]))
  sortedArr.sort(((a, b) => {
    if(a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1]
  }));
  const result = Array(N).fill(0);
  const C = Array(2000001).fill(0);
  const S = Array(20001).fill(0);

  let sum = sortedArr[0][1];
  C[sortedArr[0][0]] += sortedArr[0][1];
  S[sortedArr[0][1]] += sortedArr[0][1];

  for(let i = 1; i < sortedArr.length; i++) {
    const [c, s, idx] = sortedArr[i];
    const [curC, curS, curIdx] = sortedArr[i - 1];

    C[c] += s;
    S[s] += s;
    sum += s;

    if(c === curC && s === curS) {
      result[idx] = result[curIdx];
    } else {
      result[idx] = sum - C[c] - S[s] + s;
    }
  }

  return result.join('\n');
}