// https://www.acmicpc.net/problem/17780
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4 4
0 0 2 0
0 0 1 0
0 0 1 2
0 2 0 0
2 1 1
3 2 3
2 2 1
4 1 2`;
const direction = [, [0, 1], [0, -1], [-1, 0], [1, 0]]; // 우 좌 상 하
const [NK, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
const [N, K] = NK;
console.log(solution(N, K, data));

function solution (N, K, data) {
  let result = 0;
  const board = []; // 흰색 0 빨간색 1 파란색 2
  const info = Array.from({length: N + 1}, () => Array.from({length: N + 1}, () => []));
  const pieces = [null]; // [row, column, direction]

  board.push(Array(N + 1).fill(null));
  for(let i = 0; i < N; i++) {
    board.push([null].concat(data[i]));
  }

  for(let i = 0; i < K; i++) {
    const [row, column, direction] = data[i + N];
    info[row][column].push(i + 1);
    pieces.push(data[i + N]);
  }

  const check = (y, x) => 0 < y && y <= N && 0 < x && x <= N;

  const move = (index) => {
    const [r, c, d] = pieces[index];
    let [dy, dx] = direction[d];
    let ny = dy + r;
    let nx = dx + c;

    const pos = info[r][c].findIndex(e => e === index);
    if(pos !== 0) return;

    if(!check(ny, nx) || board[ny][nx] === 2) {
      if(d < 3) {
        pieces[index][2] = d === 1 ? 2 : 1;
      } else {
        pieces[index][2] = d === 3 ? 4 : 3;
      }

      [dy, dx] = direction[pieces[index][2]];
      ny = dy + r;
      nx = dx + c;

      if(!check(ny, nx) || board[ny][nx] === 2) return;
    } 

    const movedPieces = info[r][c].slice(pos);
    if(board[ny][nx] === 1) movedPieces.reverse();
    for(const i of movedPieces) {
      pieces[i][0] = ny;
      pieces[i][1] = nx;
    }
    info[r][c] = info[r][c].slice(0, pos);
    info[ny][nx] = info[ny][nx].concat(movedPieces);

    if(info[ny][nx].length >= 4) return true;
    return false;
  }

  const turn = () => {
    for(let i = 1; i <= K; i++) {
      if(move(i)) {
        return true;
      }
    }
    return false;
  }

  while(1) {
    result++;

    if(turn()) return result;

    if(result === 1000) {
      break;
    }
  }

  return -1;
}