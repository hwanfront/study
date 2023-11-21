// https://www.acmicpc.net/problem/15657
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `4 4
1231 1232 1233 1234`;
const [NM, data] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(NM, data));

function solution([N, M], nums) {
  const result = [];
  const n = [];
  nums.sort((a, b) => a - b);
  
  const dfs = (cnt) => {
    if(cnt === M) {
      result.push(n.join(' '));
      return;
    }
    for(let i = 0; i < nums.length; i++) {
      if(n.length > 0 && nums[i] < n.at(-1)) continue;
      n.push(nums[i]);
      dfs(cnt + 1);
      n.pop();
    }
  }
  dfs(0);
  return result.join('\n');
}