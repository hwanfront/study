// https://www.acmicpc.net/problem/16637
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `1
1`;
const [N, form] = input.split('\n');
console.log(solution(+N, form.split('')));
function solution (N, form) {
  if(N === 1) return +form[0];
  const ops = [];
  const nums = [];
  const visited = Array(Math.floor(N / 2)).fill(false);
  let result = Number.MIN_SAFE_INTEGER;

  const op = {
    '+'(x, y) {return x + y},
    '-'(x, y) {return x - y},
    '*'(x, y) {return x * y},
  }

  form.forEach((e, i) => {
    if(i % 2) ops.push(e);
    else nums.push(+e);
  })

  const dfs = (value, from, cnt) => {
    if(cnt === nums.length) {
      result = Math.max(result, value);
      return;
    }

    for(let i = from; i < ops.length; i++) {
      dfs(op[ops[i]](value, nums[i + 1]), i + 1, cnt + 1);
    }
    for(let i = from; i < ops.length - 1; i++) {
      if(visited[i - 1]) continue;
      visited[i] = true;
      dfs(op[ops[i]](value, op[ops[i + 1]](nums[i + 1], nums[i + 2])), i + 2, cnt + 2);
      visited[i] = false;
    }
  }

  dfs(nums[0], 0, 1);
  visited[0] = true;
  dfs(op[ops[0]](nums[0], nums[1]), 1, 2);

  return result;
}