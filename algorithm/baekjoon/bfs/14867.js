// https://www.acmicpc.net/problem/14867
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `1 100000 1 49999`;
const [a, b, c, d] = input.split(' ').map(Number);
console.log(solution(a, b, c, d));

function solution (a, b, c, d) {
  const s = { a, b };
  const task = [
    (a, b) => {
      const newAb = [a, b];
      newAb[0] = s.a;
      return newAb;
    },
    (a, b) => {
      const newAb = [a, b];
      newAb[1] = s.b;
      return newAb;
    },
    (a, b) => {
      const newAb = [a, b];
      newAb[0] = 0;
      return newAb;
    },
    (a, b) => {
      const newAb = [a, b];
      newAb[1] = 0;
      return newAb;
    },
    (a, b) => {
      const newAb = [a, b];
      if(s.b < a + b) {
        newAb[1] = s.b;
        newAb[0] -= (s.b - b);
      } else {
        newAb[1] += a;
        newAb[0] = 0;
      }
      return newAb;
    },
    (a, b) => {
      const newAb = [a, b];
      if(s.a < b + a) {
        newAb[0] = s.a;
        newAb[1] -= (s.a - a);
      } else {
        newAb[0] += b;
        newAb[1] = 0;
      }
      return newAb;
    }
  ]

  const bfs = () => {
    const visited = new Map();
    let queue = [[0, 0, -1]];
    let cnt = 0;
    visited.set(0, new Set([0]));
    while(queue.length > 0) {
      const nextQueue = [];
      for(const [a, b, prev] of queue) {
        if(a === c && b === d) return cnt;
        for(let i = 0; i < 6; i++) {
          if(prev === i) continue;
          const [na, nb] = task[i](a, b);
          if(!visited.has(na)) {
            visited.set(na, new Set([]));
          }
          if(visited.get(na).has(nb)) continue;
          visited.get(na).add(nb);
          nextQueue.push([na, nb, i]);
        }
      }
      queue = nextQueue;
      cnt++;
    }
    return -1;
  }

  return bfs();
}
