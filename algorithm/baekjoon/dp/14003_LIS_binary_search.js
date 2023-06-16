/**
 * 1. 길이만 구할 수 있는 12015 문제를 응용하여 LIS까지 구하는 문제
 * 2. 일반적으로 LIS 문제 풀듯이 DP로 작성하면 시간초과가 나옴 
 * 3. 이분탐색을 이용한 시간복잡도 o(nlogn)의 LIS
 */

// https://www.acmicpc.net/problem/14003
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `1
1`;
const [n, numbers] = input.split('\n');
console.log(solution(Number(n), numbers.split(' ').map(Number)));

function solution (n, numbers) {
  const bianrySearch = (array, target, start, end) => {
    while(start < end) {
      const mid = Math.floor((start + end) / 2);
      if(array[mid] < target) {
        start = mid + 1;
      } else {
        end = mid;
      }
    }
    return end;
  }

  if(n === 1) {
    return `1\n${numbers[0]}`
  }

  let maxLen = 0;
  let idx = -1;
  const arr = Array(n).fill(-1);
  const tmp = [];
  tmp.push(numbers[0]);
  arr[0] = tmp.length;
  for(let i = 1; i < n; i++) {
    if(tmp[tmp.length - 1] < numbers[i]) {
      tmp.push(numbers[i]);
      arr[i] = tmp.length;
    } else {
      const idx = bianrySearch(tmp, numbers[i], 0, tmp.length - 1);
      tmp[idx] = numbers[i];
      arr[i] = idx + 1;
    }
    if(arr[i] > maxLen) {
      idx = i;
      maxLen = arr[i];
    }
  }

  let result = numbers[idx];
  maxLen--;

  for(let i = idx - 1; i >= 0; i--) {
    if(arr[i] === maxLen) {
      maxLen--;
      result = `${numbers[i]} ${result}`;
    }
  }
  return `${tmp.length}\n${result}`;
}