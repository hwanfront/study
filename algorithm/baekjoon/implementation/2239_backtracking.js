// * 참고로 2580 같은문제
// https://www.acmicpc.net/problem/2239
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `003000000
000000000
000000000
000000010
000010000
092000000
000000000
000000000
000000000`
const sudoku = input.split('\n').map(e => e.split('').map(Number));
const LEN = 9;
const SQU_LEN = 3;
console.log(solution(sudoku));

function solution (sudoku) {
  const row = Array.from({ length: LEN }, () => Array(LEN + 1).fill(false));
  const col = Array.from({ length: LEN }, () => Array(LEN + 1).fill(false));
  const square = Array.from({ length: SQU_LEN }, () => Array.from({ length: SQU_LEN }, () => Array(LEN + 1).fill(false)));

  for(let i = 0; i < LEN; i++) {
    for(let j = 0; j < LEN; j++) {
      const num = sudoku[i][j];
      if(num === 0) continue;
      row[i][num] = true;
      col[j][num] = true;
      square[Math.floor(i / 3)][Math.floor(j / 3)][num] = true;
    }
  }

  const go = (cnt) => {
    if(cnt === LEN ** 2) return true;
    const x = Math.floor(cnt / LEN);
    const y = Math.floor(cnt % LEN);
    const num = sudoku[x][y];
    if(num !== 0) return go(cnt + 1);
    for(let i = 1; i < LEN + 1; i++) {
      if(row[x][i]) continue;
      if(col[y][i]) continue;
      if(square[Math.floor(x / 3)][Math.floor(y / 3)][i]) continue;
      sudoku[x][y] = i;
      row[x][i] = col[y][i] = square[Math.floor(x / 3)][Math.floor(y / 3)][i] = true;
      if(go(cnt + 1)) {
        return true;
      }
      sudoku[x][y] = 0;
      row[x][i] = col[y][i] = square[Math.floor(x / 3)][Math.floor(y / 3)][i] = false;
    }
    return false;
  }

  go(0);

  return sudoku.map(e => e.join('')).join('\n');
}