// https://www.acmicpc.net/problem/1946
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `2
5
3 2
1 4
4 1
2 3
5 5
7
3 6
7 3
4 2
1 4
5 7
2 5
6 1`;
const [t, ...data] = input.split`\n`
const result = [];
let j = 0;
for(let i = 0; i < +t; i++) {
  const n = +data[j++];
  const grades = data.slice(j, j += n).map(e => e.split(' ').map(Number));
  result.push(solution(n, grades));
}

console.log(result.join('\n'));

function solution(n, data) {
  data.sort((a, b) => a[0] - b[0]);
  let prev = Number.MAX_SAFE_INTEGER;
  let cnt = 0;
  for(const [_, num] of data) {
    if(num >= prev) continue;
    prev = num;
    cnt++;
  }

  return cnt;
}