/**
 * 1. 단순히 DP로 풀 경우 O(n**2)로 시간초과
 * 2. 이분탐색을 이용한 시간복잡도 o(nlogn)의 LIS
 * 3. 최종적으로 구할 수 있는 결과값은 LIS가 아닌 LIS와 같은 길은 길이를 구할 수 있음
 */

// https://www.acmicpc.net/problem/12015
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `10
10 20 30 15 20 30 50 40 45 70`;
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
    return start;
  }

  const LIS = (n) => {
    const result = [];
    result.push(numbers[0]);
    for(let i = 1; i < n; i++) {
      if(numbers[i] > result[result.length - 1]) {
        result.push(numbers[i]);
        continue;
      }
      const idx = bianrySearch(result, numbers[i], 0, result.length - 1);
      result[idx] = numbers[i];
    }
    return result;
  }

  return LIS(n).length;
}
