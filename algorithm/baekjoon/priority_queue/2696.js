const PriorityQueue = require("../util/PriorityQueue");
// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `3
9
1 2 3 4 5 6 7 8 9
9
9 8 7 6 5 4 3 2 1
23
23 41 13 22 -3 24 -31 -11 -8 -7
3 5 103 211 -311 -45 -67 -73 -81 -99
-33 24 56`;
const [t, ...data] = input.split`\n`;
const result = [];
let j = 0;
for(let i = 0; i < +t; i++) {
  const m = data[j++];
  const k = Math.ceil(m / 10);
  const nums = data.slice(j, j += k).map(e => e.split` `.map(Number));
  result.push(solution(m, nums));
}

console.log(result.join`\n`);

function solution(m, nums) {
  const mxh = new PriorityQueue((a, b) => a > b);
  const mnh = new PriorityQueue((a, b) => a < b);
  let cnt = 1;
  let result = nums[0][0].toString();
  mxh.push(nums[0][0]);
  for(let i = 1; i < m; i++) {
    const y = Math.floor(i / 10);
    const x = i % 10;
    if(i % 20 === 0) result += '\n';
    if(i % 2 === 1) {
      mnh.push(nums[y][x]);
    } else {
      mxh.push(nums[y][x]);
      if(mxh.top() > mnh.top()) {
        const tmp = mxh.top();
        mxh.pop();
        mxh.push(mnh.top());
        mnh.pop();
        mnh.push(tmp);
      }
      cnt++;
      if(i % 20 === 0) result += mxh.top().toString();
      else result += ` ` + mxh.top().toString();
    }
  }
  return cnt + '\n' + result;
}
