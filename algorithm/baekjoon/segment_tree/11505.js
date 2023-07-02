// https://www.acmicpc.net/problem/11505
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 2 2
1
2
3
4
5
1 3 0
2 2 5
1 3 6
2 2 5`;
const MOD = 1_000_000_007n;
const [NMK, ...data] = input.split('\n');
const [N, M, K] = NMK.split(' ').map(Number);
console.log(solution(N, data));

function solution (N, data) {
  const result = [];
  const arr = Array(N).fill(0);
  const tree = Array(1 << Math.ceil(Math.log2(N)) + 1).fill(null);

  const getMid = (s, e) => Math.floor((s + e) / 2)

  const init = (start, end, node) => {
    if(start === end) return tree[node] = arr[start];
    const mid = getMid(start, end);
    return tree[node] = init(start, mid, node * 2) * init(mid + 1, end, node * 2 + 1) % MOD;
  }

  const multiply = (start, end, node, left, right) => {
    if(end < left) return 1n;
    if(right < start) return 1n;
    if(left <= start && end <= right) return tree[node];
    const mid = getMid(start, end);
    return multiply(start, mid, node * 2, left, right) * multiply(mid + 1, end, node * 2 + 1, left, right) % MOD;
  }

  const update = (start, end, node, index, diff) => {
    if(index < start) return tree[node];
    if(index > end) return tree[node];
    if(start === end) return tree[node] = diff;
    const mid = getMid(start, end);
    return tree[node] = update(start, mid, node * 2, index, diff) * update(mid + 1, end, node * 2 + 1, index, diff) % MOD;
  }

  let i = 0;
  for(; i < N; i++) {
    arr[i] = BigInt(data[i]);
  }

  init(0, N - 1, 1);

  while(i < data.length) {
    const [a, b, c] = data[i++].split(' ');
    if(a === '1') {
      arr[+b - 1] = BigInt(c);
      update(0, N - 1, 1, +b - 1, BigInt(c));
    } else {
      result.push(multiply(0, N - 1, 1, +b - 1, +c - 1));
    }
  }
  
  return result.join('\n');
}