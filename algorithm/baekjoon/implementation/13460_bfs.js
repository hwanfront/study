// https://www.acmicpc.net/problem/13460
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `10 10
##########
#RB....#.#
#..#.....#
#........#
#.O......#
#...#....#
#........#
#........#
#.......##
##########`;
const [NM, ...board] = input.split('\n');
const direction = [[1, 0],[0, 1],[-1, 0],[0, -1]];

const [N, M] = NM.split(' ').map(Number);

console.log(solution(N, M, board));

function solution (N, M, board) {
  let B;
  let R;
  let O;

  for(let i = 1; i < N - 1; i++) {
    for(let j = 1; j < M - 1; j++) {
      if(board[i][j] === 'B') B = [i, j];
      if(board[i][j] === 'R') R = [i, j];
      if(board[i][j] === 'O') O = [i, j];
    }
  }

  const bfs = () => {
    let queue = [[R, B, 0]];
    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [r, b, cnt] = queue[i];
        if(cnt === 10) return -1;
        for(const [dy, dx] of direction) {
          let isR = false;
          let isB = false;
          let [ry, rx] = JSON.parse(JSON.stringify(r));
          let [by, bx] = JSON.parse(JSON.stringify(b));
          if(board[dy + ry][dx + rx] === '#' && board[dy + by][dx + bx] === '#') continue;
          while(board[dy + ry][dx + rx] !== '#') {
            ry += dy;
            rx += dx;
            if(board[ry][rx] === 'O') {
              isR = true;
              break;
            }
          }
          
          while(board[dy + by][dx + bx] !== '#') {
            by += dy;
            bx += dx;
            if(board[by][bx] === 'O') {
              isB = true;
              break;
            }
          }

          if(isB) continue;
          if(isR && !isB) return cnt + 1;

          if(ry === by && rx === bx) {
            if(dy === 1) {
              if(r[0] > b[0]) by -= 1;
              else ry -= 1;
            }
            if(dy === -1) {
              if(r[0] < b[0]) by += 1;
              else ry += 1;
            }
            if(dx === 1) {
              if(r[1] > b[1]) bx -= 1;
              else rx -= 1;
            } 
            if(dx === -1) {
              if(r[1] < b[1]) bx += 1;
              else rx += 1;
            }
          }
          nextQueue.push([[ry, rx], [by, bx], cnt + 1]);
        }
      }
      queue = nextQueue;
    }
    return -1;
  }

  return bfs();
}