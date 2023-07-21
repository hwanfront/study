// https://www.acmicpc.net/problem/20055
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 8
100 99 60 80 30 20 10 89 99 100`;
const [NK, Ai] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NK, Ai));

function solution ([N, K], Ai) {
  const belt = Array(N).fill(null);
  let result = 0;
  let start = 0;

  const getPos = (index) => (start + index) % (N * 2)

  const spin = () => {
    start = start - 1 === -1 ? N * 2 - 1 : start - 1;
    for(let i = N - 2; i >= 0; i--) {
      if(belt[i] === null) continue;
      belt[i + 1] = belt[i];
      belt[i] = null;
    }
    belt[N - 1] = null;
  }

  const move = () => {
    for(let i = N - 2; i >= 0; i--) {
      if(Ai[getPos(i + 1)] === 0) continue;
      if(belt[i + 1] !== null) continue;
      if(belt[i] === null) continue;
      Ai[getPos(i + 1)] -= 1;
      belt[i + 1] = belt[i];
      belt[i] = null;
    }
    belt[N - 1] = null;
  }

  const put = () => {
    if(belt[0] === null && Ai[getPos(0)] > 0) {
      belt[0] = 'r';
      Ai[getPos(0)] -= 1;
    } 
  }
  const check = () => {
    let cnt = 0;
    Ai.forEach(e => {
      if(e === 0) cnt++;
    });
    return cnt;
  }

  while(1) {
    result++;
    spin();
    move();
    put();
    if(check() >= K) {
      break;
    }
  }
  return result;
}