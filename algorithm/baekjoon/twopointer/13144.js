// https://www.acmicpc.net/problem/13144
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `5
1 2 3 4 5`;
const [N, nums] = input.split('\n');
console.log(solution(+N, nums.split(' ').map(Number))); 

function solution (N, num) {
  let result = 0;
  const visited = Array(100_001).fill(false);
  let r = 0;
  let l = 0;

  while(1) {
    if(r >= N) break;
    if(!visited[num[r]]) {
      visited[num[r]] = true;
      r++;
    } else {
      console.log(r, l);
      result += r - l;
      visited[num[l]] = false;
      l++;
    }
  }

  for(let i = 1; i <= r - l; i++) {
    result += i;
  }

  return result;
}