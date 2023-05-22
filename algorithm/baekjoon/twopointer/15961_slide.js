// https://www.acmicpc.net/problem/15961
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `8 50 4 7
2
7
9
25
7
9
7
30`;

const [Ndkc, ...nums] = input.split('\n');
const [N, d, k, c] = Ndkc.split(' ').map(Number);
const numbers = nums.map(Number);

console.log(solution(numbers, d, k, c));

function solution(numbers, d, k, c) {
  const check = Array(d + 1).fill(0);
  let result = 0;
  let cnt = 0;

  for(let i = 0; i < k; i++) {
    if(check[numbers[i]] < 1) {
      cnt++;
    }
    check[numbers[i]]++;
  }

  if(check[c]) {
    result = cnt;
  } else {
    result = cnt + 1;
  }

  for(let i = 0; i < numbers.length; i++) {
    if(--check[numbers[i]] === 0) {
      cnt--;
    }

    const number = numbers[(i + k) % numbers.length];
    if(check[number]++ === 0) {
      cnt++;
    }

    if(check[c]) {
      result = Math.max(result, cnt);
    } else {
      result = Math.max(result, cnt + 1);
    }
  }

  return result;
}