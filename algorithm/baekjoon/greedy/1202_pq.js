const MaxHeap = require('../util/MaxHeap');
// https://www.acmicpc.net/problem/1202
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `2 1
5 10
100 100
11`;
const [first, ...arr] = input.split('\n');
const [N] = first.split(' ').map(Number);

console.log(solution(N, arr));

function solution(N, arr) {
  const infos = arr.slice(0, N).map((e) => e.split(' ').map(Number)).sort((a, b) => a[0] - b[0]);
  const bags = arr.slice(N).map(Number).sort((a, b) => a - b);
  const maxheap = new MaxHeap();
  let index = 0;
  let result = 0;

  for(const bag of bags) {
    while(index < infos.length && bag >= infos[index][0]) {
      maxheap.enqueue(infos[index][1], infos[index][0]);
      index++;
    }
    if(maxheap.size() > 0) {
      result += maxheap.dequeue().key;
    }
  }

  return result;
}
