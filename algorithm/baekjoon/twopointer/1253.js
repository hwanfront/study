// https://www.acmicpc.net/problem/2230
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `10
1 2 3 4 5 6 7 8 9 10`;

const [N, nums] = input.split('\n');
const numbers = nums.split(' ').map(Number);

console.log(solution(numbers, Number(N)));

function solution(numbers, N) {
  let result = 0;
  numbers.sort((a, b) => a - b);
  
  for(let i = 0; i < numbers.length; i++) {
    let start = 0;
    let end = numbers.length - 1;

    while(start < end) {
      if(start === i) {
        start++;
        continue;
      }
      if(end === i) {
        end--;
        continue;
      }

      const sum = numbers[start] + numbers[end];
      if(sum === numbers[i]) {
        result++;
        break;
      }

      if(numbers[i] < sum) {
        end--;
      } else {
        start++;
      }
    }
  }

  return result;
}