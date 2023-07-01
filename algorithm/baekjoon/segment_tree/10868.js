// https://www.acmicpc.net/problem/10868
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
  const tree = Array(N * 4).fill(null);

  const getMid = (start, end) => Math.floor((start + end) / 2);
  
  const init = (start, end, node) => {
    if(start === end)  {
      return tree[node] = arr[start];
    }
    const mid = getMid(start, end);
    return tree[node] = Math.min(init(start, mid, node * 2), init(mid + 1, end, node * 2 + 1));
  }

  const find = (start, end, node, left, right) => {
    if(end < left) return Number.MAX_SAFE_INTEGER;
    if(right < start) return Number.MAX_SAFE_INTEGER;
    if(left <= start && end <= right) return tree[node];
    const mid = getMid(start, end);
    return Math.min(find(start, mid, node * 2, left, right), find(mid + 1, end, node * 2 + 1, left, right));
  }

  for(let i = 0; i < N; i++) {
    arr[i] = +data[i];
  }

  init(0, N - 1, 1);

  for(let i = N; i < data.length; i++) {
    const [s, e] = data[i].split(' ').map(Number);
    const min = find(0, N - 1, 1, s - 1, e - 1);
    result.push(min);
  }

  return result.join('\n');
}