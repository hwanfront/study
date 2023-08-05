// https://www.acmicpc.net/problem/2138
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3
000
010`;
const [N, now, end] = input.split('\n');
console.log(solution(+N, now, end.split('')));

function solution (N, now, end) {
  let arr1 = JSON.parse(JSON.stringify(end));
  let arr2 = JSON.parse(JSON.stringify(end));

  const on = (i, arr) => {
    if(i !== 0) {
      arr[i - 1] = arr[i - 1] === '0' ? '1' : '0';
    } 
    if(i !== arr.length - 1) {
      arr[i + 1] = arr[i + 1] === '0' ? '1' : '0';
    }
    arr[i] = arr[i] === '0' ? '1' : '0';
  }
  
  let cnt1 = 0;
  let cnt2 = 1;
  on(0, arr2);

  for(let i = 1; i < N; i++) {
    if(arr1[i - 1] !== now[i - 1]) {
      on(i, arr1);
      cnt1++;
    }
    if(arr2[i - 1] !== now[i - 1]) {
      on(i, arr2);
      cnt2++;
    }
  }

  if(arr1.join('') === now) return cnt1;
  if(arr2.join('') === now) return cnt2;
  return -1;
}