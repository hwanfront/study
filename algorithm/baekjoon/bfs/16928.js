// https://www.acmicpc.net/problem/16928
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `1 1
2 88
94 3`;
const [NM, ...arr] = input.split('\n');
const ls = arr.map((e) => e.split(' ').map(Number));
console.log(solution(ls));

function solution(ls) {
  const arr = Array(101).fill(0);
  ls.forEach(([from, to]) => arr[from] = to);

  const discovered = Array(101).fill(false);
  discovered[1] = true;
  let queue = [[1, 0]];
  while(queue.length !== 0) {
    const size = queue.length;
    const nextQueue = [];
    for(let i = 0; i < size; i++) {
      const [node, cnt] = queue.shift();
      if(node === 100) {
        return cnt;
      }

      for(let i = 1; i <= 6; i++) {
        if(discovered[node + i]) {
          continue;
        }

        let lastNode = node + i;
        discovered[lastNode] = true;

        while(arr[lastNode] > 0) {
          discovered[arr[lastNode]] = true;
          lastNode = arr[lastNode];
        }

        nextQueue.push([lastNode, cnt + 1]);
      }
    }
    queue = nextQueue;
  }
}