// https://www.acmicpc.net/problem/18808
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `1 3 3
2 3
1 0 0
1 1 1
1 1
1
3 1
1
1
1`;
const [NMK, ...etc] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NMK, etc));
function solution ([N, M, K], etc) {
  let result = 0;
  const notebook = Array.from({length: N}, () => Array(M).fill(0));

  const spin = (sticker) => {
    const newR = sticker[0].length;
    const newC = sticker.length;
    const newSticker = Array.from({length: newR}, () => Array(newC).fill(0));
    for(let i = 0; i < newR; i++) {
      for(let j = 0; j < newC; j++) {
        newSticker[i][j] = sticker[newC - j - 1][i];
      }
    }
    return newSticker;
  }

  const find = (notebook, sticker) => {
    const sr = sticker.length;
    const sc = sticker[0].length;
    const nr = notebook.length;
    const nc = notebook[0].length;
    for(let i = 0; i <= nr - sr; i++) {
      for(let j = 0; j <= nc - sc; j++) {
        let is = true;
        for(let r = 0; r < sr; r++) {
          for(let c = 0; c < sc; c++) {
            if(sticker[r][c] === 1 && notebook[i + r][j + c] !== 0) {
              is = false;
              break;
            }
          }
          if(!is) break;
        }
        if(is) return [i, j];
      }
    }
    return [-1, -1];
  }

  let i = 0;
  for(; i < etc.length; i++) {
    const [r, c] = etc[i];
    let sticker = etc.slice(i + 1, i + 1 + r);
    let spinCnt = 0;
    while(spinCnt !== 4) {
      const [y, x] = find(notebook, sticker);
      if(y === -1) {
        sticker = spin(sticker);
        spinCnt++;
      } else {
        for(let i = 0; i < sticker.length; i++) {
          for(let j = 0; j < sticker[0].length; j++) {
            if(sticker[i][j] === 0) continue;
            notebook[y + i][x + j] = sticker[i][j];
            result++; 
          }
        }
        break;
      }
    }

    i += r;
  }

  return result;
}