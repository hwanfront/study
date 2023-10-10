// https://www.acmicpc.net/problem/1625
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 

const input = `1 2 3
4 5 0
6 7 8`;
console.log(solution(input.split('\n').reduce((prev, cur) => prev.concat(cur.split(' ').map(Number)), []).join('')));

function solution (puzzle) {
  const set = new Set();
  const direction = [1, -1, 3, -3];

  const bfs = () => {
    let queue = [puzzle];
    let cnt = 0;
    set.add(puzzle);

    while(queue.length > 0) {
      const nextQueue = [];
      for(const pp of queue) {
        if(pp === '123456780') return cnt;
        const ei = pp.indexOf(0);
        for(const d of direction) {
          const ni = ei + d;
          if(ni < 0 || ni >= 9) continue;
          if(ei % 3 === 0 && d === -1) continue;
          if(ei % 3 === 2 && d === 1) continue;
          let min = Math.min(ei, ni);
          let max = Math.max(ei, ni);
          let np = pp.substring(0, min) + pp[max] + pp.substring(min + 1, max) + pp[min] + pp.substring(max + 1);
          if(set.has(np)) continue;
          set.add(np);
          nextQueue.push(np);
        }
      }
      cnt++
      queue = nextQueue;
    }
    return -1;
  }

  return bfs();
}