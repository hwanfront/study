// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `3 3
1 0 2
0 0 0
3 0 0
1 2 2`;
const [nk, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
const sxy = data.pop();
console.log(solution(nk, data, sxy));

function solution([n, k], data, [s, Y, X]) {
  const queues = Array.from({length: k + 1}, () => []);
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < n;
  for(let y = 0; y < n; y++) {
    for(let x = 0; x < n; x++) {
      if(data[y][x] === 0) continue;
      queues[data[y][x]].push([y, x]);
    }
  }
  const go = (num) => {
    const nextQueue = [];
    for(const [y, x] of queues[num]) {
      for(const [dy, dx] of direction) {
        const [ny, nx] = [dy + y, dx + x];
        if(!check(ny, nx)) continue;
        if(data[ny][nx] > 0) continue;
        data[ny][nx] = num;
        nextQueue.push([ny, nx]);
      }
    }
    queues[num] = nextQueue;
  }

  for(let i = 0; i < s; i++) {
    for(let j = 1; j <= k; j++) {
      if(queues[j].length === 0) continue;
      go(j);
    }
  }
  return data[Y - 1][X - 1];
}