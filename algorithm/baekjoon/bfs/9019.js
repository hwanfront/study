// https://www.acmicpc.net/problem/9019
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3
5000 8000
1000 1
1 16`;
const [T, ...ABs] = input.split('\n');
const command = {
  D(n) {
    return n * 2 > 9999 ? (n * 2) % 10000 : n * 2;
  },
  S(n) {
    return n === 0 ? 9999 : n - 1;
  },
  L(n) {
    const left = Math.floor(n / 1000);
    const right = (n % 1000) * 10;
    return left + right;
  },
  R(n) {
    const left = (n % 10) * 1000;
    const right = Math.floor(n / 10)
    return left + right;
  }
}
console.log(solution(ABs.map(AB => AB.split(' ').map(Number))));

function solution(registers) {
  const result = [];

  const bfs = (a, b) => {
    const check = Array(10000).fill(false);
    let queue = [[a, '']];
    check[a] = true;
    
    while(queue.length) {
      const nextQueue = [];
      for(let i = 0; i < queue.length; i++) {
        const [na, res] = queue[i];
        const D = command.D(na);
        const S = command.S(na);
        const L = command.L(na);
        const R = command.R(na);
        console.log(D, S, L, R);
        if(D === b) {
          return res + 'D';
        } else {
          if(!check[D]) {
            nextQueue.push([D, res + 'D'])
            check[D] = true;
          }
        }
        if(S === b) {
          return res + 'S';
        } else {
          if(!check[S]) {
            nextQueue.push([S, res + 'S'])
            check[S] = true;
          }
        }
        if(L === b) {
          return res + 'L';
        } else {
          if(!check[L]) {
            nextQueue.push([L, res + 'L'])
            check[L] = true;
          }
        }
        if(R === b) {
          return res + 'R';
        } else {
          if(!check[R]) {
            nextQueue.push([R, res + 'R'])
            check[R] = true;
          }
        }

      }
      queue = nextQueue;
    }
  }

  for(let i = 0; i < registers.length; i++) {
    const [a, b] = registers[i]
    result.push(bfs(a, b));
  }
  return result.join('\n');
}
