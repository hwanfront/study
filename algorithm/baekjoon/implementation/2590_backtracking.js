// https://www.acmicpc.net/problem/2590
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `0 3 5 4 6 9 2 7 8
7 8 2 1 0 5 6 0 9
0 6 0 2 7 8 1 3 5
3 2 1 0 4 6 8 9 7
8 0 4 9 1 3 5 0 6
5 9 6 8 2 0 4 1 3
9 1 7 6 5 2 0 8 0
6 0 3 7 0 1 9 5 2
2 5 8 3 9 4 7 6 0`;

console.log(solution(input.split`\n`.map(e => e.split` `.map(Number))));

function solution(data) {
  const r = Array.from({length: 9}, () => Array(10).fill(false));
  const c = Array.from({length: 9}, () => Array(10).fill(false));
  const s = Array.from({length: 3}, () => Array.from({length: 3}, () => Array(10).fill(false)));

  for(let i = 0; i < 9; i++) {
    for(let j = 0; j < 9; j++) {
      const n = data[i][j];
      if(n === 0) continue;
      r[i][n] = true;
      c[j][n] = true;
      s[Math.floor(i / 3)][Math.floor(j / 3)][n] = true;
    }
  }

  const go = (cnt) => {
    if(cnt === 81) return true;
    const y = Math.floor(cnt / 9);
    const x = Math.floor(cnt % 9);
    if(data[y][x] !== 0) return go(cnt + 1);
    else {
      for(let i = 1; i <= 9; i++) {
        const [sy, sx] = [Math.floor(y / 3), Math.floor(x / 3)];
        if(r[y][i]) continue;
        if(c[x][i]) continue;
        if(s[sy][sx][i]) continue;
        data[y][x] = i;
        r[y][i] = c[x][i] = s[sy][sx][i] = true;
        if(go(cnt + 1)) return true;
        data[y][x] = 0;
        r[y][i] = c[x][i] = s[sy][sx][i] = false;
      }
    }
    return false;
  }

  go(0);
  
  return data.map(e => e.join(' ')).join('\n');
}
