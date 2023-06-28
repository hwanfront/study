// https://www.acmicpc.net/problem/1655
const PriorityQueue = require('./util/PriorityQueue');
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5
1
2
3
4
5`;
const [t, ...nums] = input.split('\n').map(Number);
console.log(solution(nums));

function solution (nums) {
  const result = [];
  const maxheap = new PriorityQueue((a, b) => a > b);
  const minheap = new PriorityQueue((a, b) => a < b);

  const compare = (maxheap, minheap) => {
    return maxheap.top() > minheap.top();
  }

  const swap = (maxheap, minheap) => {
    const maxtop = maxheap.top();
    const mintop = minheap.top();
    maxheap.pop();
    minheap.pop();
    maxheap.push(mintop);
    minheap.push(maxtop);
  }

  for(let i = 0; i < nums.length; i++) {
    if(maxheap.size() > minheap.size()) {
      minheap.push(nums[i]);
    } else {
      maxheap.push(nums[i]);
    }

    if(!maxheap.empty() && !minheap.empty() && compare(maxheap, minheap)) {
      swap(maxheap, minheap);
    }

    result.push(maxheap.top());
  }
  return result.join('\n');
}