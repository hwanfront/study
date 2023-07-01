// https://www.acmicpc.net/problem/2357
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `10 4
75
30
100
38
50
51
52
20
81
5
1 10
3 5
6 9
8 10`;
const [NM, ...data] = input.split('\n');
console.log(solution(NM.split(' ').map(Number)[0], data));

function solution (N, data) {
  const result = [];
  const arr = Array(N).fill(null);
  const maxTree = Array(N * 4).fill(null);
  const minTree = Array(N * 4).fill(null);

  const getMid = (start, end) => Math.floor((start + end) / 2);
  
  const init = (start, end, node) => {
    if(start === end)  {
      maxTree[node] = arr[start];
      minTree[node] = arr[start];
      return;
    }
    const mid = getMid(start, end);
    init(start, mid, node * 2);
    init(mid + 1, end, node * 2 + 1);
    maxTree[node] = Math.max(maxTree[node * 2], maxTree[node * 2 + 1]);
    minTree[node] = Math.min(minTree[node * 2], minTree[node * 2 + 1]);
  }

  const findMax = (start, end, node, left, right) => {
    if(end < left) return 0;
    if(right < start) return 0;
    if(left <= start && end <= right) {
      return maxTree[node];
    };
    const mid = getMid(start, end);
    return Math.max(findMax(start, mid, node * 2, left, right), findMax(mid + 1, end, node * 2 + 1, left, right));
  }

  const findMin = (start, end, node, left, right) => {
    if(end < left) return Number.MAX_SAFE_INTEGER;
    if(right < start) return Number.MAX_SAFE_INTEGER;
    if(left <= start && end <= right) {
      return minTree[node];
    }
    const mid = getMid(start, end);
    return Math.min(findMin(start, mid, node * 2, left, right), findMin(mid + 1, end, node * 2 + 1, left, right));
  }

  for(let i = 0; i < N; i++) {
    arr[i] = +data[i];
  }

  init(0, N - 1, 1);

  for(let i = N; i < data.length; i++) {
    const [s, e] = data[i].split(' ').map(Number);
    const min = findMin(0, N - 1, 1, s - 1, e - 1);
    const max = findMax(0, N - 1, 1, s - 1, e - 1);
    result.push(`${min} ${max}`);
  }

  return result.join('\n');
}