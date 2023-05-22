// https://www.acmicpc.net/problem/17609
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const [T, ...str] = input.split('\n');
console.log(solution(Number(T), str));

function solution(T, str) {
  const result = [];
  for(const s of str) {
    let left = 0;
    let right = s.length - 1;
    let res = 0;
    while(left < right) {
      if(s[left] === s[right]) {
        left++;
        right--;
        continue;
      }

      res = 2;

      if(s[left + 1] === s[right]) {
        let l = left + 1;
        let r = right;
        let canPalindrome = true;
        while(l < r) {
          if(s[l++] === s[r--]) {
            continue;
          } 
          canPalindrome = false;
          break;
        }

        if(canPalindrome) {
          res = 1;
        }
      }

      if(s[left] === s[right - 1]) {
        let l = left;
        let r = right - 1;
        let canPalindrome = true;
        while(l < r) {
          if(s[l++] === s[r--]) {
            continue;
          } 
          canPalindrome = false;
          break;
        }

        if(canPalindrome) {
          res = 1;
        }
      }
      break;
    }
    result.push(res);
  }
  return result.join('\n');
}