// https://www.acmicpc.net/problem/2042
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 2 2
1
2
3
4
5
1 3 6
2 2 5
1 5 2
2 3 5`;
const [NMK, ...data] = input.split('\n');
console.log(solution(NMK.split(' ').map(Number)[0], data));

function solution (N, data) {
  let result = [];
  const arr = Array(N).fill(null);
  const tree = Array(N * 4).fill(null);

  const init = (start, end, node) => {
    if(start === end) return tree[node] = arr[start];
    const mid = Math.floor((start + end) / 2);
    return tree[node] = init(start, mid, node * 2) + init(mid + 1, end, node * 2 + 1);
  }

  const sum = (start, end, node, left, right) => {
    if(end < left) return 0n;
    if(right < start) return 0n;
    if(left <= start && end <= right) return tree[node];
    const mid = Math.floor((start + end) / 2);
    return sum(start, mid, node * 2, left, right) + sum(mid + 1, end, node * 2 + 1, left, right);
  }

  const update = (start, end, node, index, diff) => {
    if(index < start) return;
    if(index > end) return;
    
    tree[node] += diff;
    if(start === end) return;
    const mid = Math.floor((start + end) / 2);
    update(start, mid, node * 2, index, diff);
    update(mid + 1, end, node * 2 + 1, index, diff);
  }

  let i = 0;

  for(; i < N; i++) {
    arr[i] = BigInt(data[i]);
  }

  init(0, N - 1, 1);

  while(i < data.length) {
    const [a, b, c] = data[i++].split(' ');
    if(a === '1') {
      const diff = BigInt(c) - arr[+b - 1];
      arr[+b - 1] = BigInt(c);
      update(0, N - 1, 1, +b - 1, diff);
    } else {
      result.push(sum(0, N - 1, 1, +b - 1, +c - 1));
    }
  }

  return result.join('\n');
}