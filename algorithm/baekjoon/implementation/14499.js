// https://www.acmicpc.net/problem/14499
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3 5 1 2 30
6 7 3 1 4
4 8 0 5 8
1 2 9 6 2
3 4 1 2 2 2 1 4 3 4 1 3 4 3 3 2 4 2 2 4 2 4 2 1 3 1 3 3 4 1`;
const direction = [[], [0, 1], [0, -1], [-1, 0], [1, 0]];
const [NMxyK, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NMxyK, data));

// 아래 - 동 - 서 - 북 - 남 - 위
// 기본 -> 1 3 4 2 5 6
// 동쪽 -> 3 6 1 2 5 4
// 서쪽 -> 4 1 6 2 5 3
// 북쪽 -> 2 3 4 6 1 5
// 남쪽 -> 5 3 4 1 6 2


function solution (NMxyK, data) {
  let [N, M, y, x, ] = NMxyK;
  let dice = [0,0,0,0,0,0];
  const cmds = data.pop();
  const map = [];
  const result = [];

  data.forEach(line => map.push(line));

  const roll = (dice, d) => {
    const [f1, f3, f4, f2, f5, f6] = dice;
    switch (d) {
    case 1:
      return [f3, f6, f1, f2, f5, f4];
    case 2:
      return [f4, f1, f6, f2, f5, f3];
    case 3:
      return [f2, f3, f4, f6, f1, f5];
    case 4:
      return [f5, f3, f4, f1, f6, f2];
    default:
      break;
    }
  }

  const check = (N, M, x, y) => 0 <= y && y < N && 0 <= x && x < M;

  const checkPos0 = (map, x, y) => {
    return map[y][x] === 0;
  }

  const copyDiceToPos = (dice, map, x, y) => {
    map[y][x] = dice[0];
  }

  const copyPosToDice = (dice, map, x, y) => {
    dice[0] = map[y][x];
    map[y][x] = 0;
  }

  cmds.forEach(cmd => {
    const [dy, dx] = direction[cmd];
    if(!check(N, M, x + dx, y + dy)) return;
    x += dx;
    y += dy;
    dice = roll(dice, cmd);
    if(checkPos0(map, x, y)) {
      copyDiceToPos(dice, map, x, y);
    } else {
      copyPosToDice(dice, map, x, y)
    }
    result.push(dice[5]);
  })


  return result.join('\n');
}