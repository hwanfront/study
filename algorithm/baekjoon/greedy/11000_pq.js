const MinHeap = require('../util/MinHeap');
// https://www.acmicpc.net/problem/11000
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3
1 3
2 4
3 5`;
const [N, ...arr] = input.split('\n');
console.log(solution(Number(N), arr.map((e) => e.split(' ').map(Number))));

function solution(N, numbers) {
  const sortedNumbers = numbers.sort((a, b) => a[0] - b[0]);
  const minheap = new MinHeap();
  let result = 0;

  sortedNumbers.forEach(([a, b], i) => {
    if(i === 0) {
      minheap.enqueue(b, a);
      result = Math.max(result, minheap.size());
      return;
    }
    const { key, value } = minheap.peak();
    if(key <= a) {
      minheap.dequeue();
    }
    minheap.enqueue(b, a);
    result = Math.max(result, minheap.size());
  })

  return result;
}
