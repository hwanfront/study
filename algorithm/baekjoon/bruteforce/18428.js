// https://www.acmicpc.net/problem/18428
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `5
X S X X T
T X S X X
X X X X X
X T X X X
X X T X X`;
const [n, ...data] = input.split`\n`;
console.log(solution(+n, data.map(e => e.split` `)));

function solution(n, data) {
  const w = new Set();
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]]
  const t = [];
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n; j++) {
      if(data[i][j] === 'T') t.push([i, j]);
    }
  }

  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < n;

  for(const [y, x] of t) {
    for(const [dy, dx] of direction) {
      const arr = []
      let c = 0;
      let f = false;
      while(1) {
        c++;
        const [ny, nx] = [dy * c + y, dx * c + x];
        if(!check(ny, nx)) break;
        if(data[ny][nx] === 'T') continue;
        if(data[ny][nx] === 'S') {
          f = true;
          break;
        }
        arr.push(`${ny}${nx}`);
      }
      if(f) {
        for(const nn of arr) {
          w.add(nn);
        }
      }
    }
  }

  const ww = [...w];
  if(!ww.length) return 'YES';
  if(ww.length >= 3) {
    for(let i = 0; i < ww.length - 2; i++) {
      data[+ww[i][0]][+ww[i][1]] = 'O';
      for(let j = i + 1; j < ww.length - 1; j++) {
        data[+ww[j][0]][+ww[j][1]] = 'O';
        for(let k = j + 1; k < ww.length; k++) {
          data[+ww[k][0]][+ww[k][1]] = 'O';
          let f = false;
          for(const [y, x] of t) {
            for(const [dy, dx] of direction) {
              let c = 0;
              while(1) {
                c++;
                const [ny, nx] = [dy * c + y, dx * c + x];
                if(!check(ny, nx)) break;
                if(data[ny][nx] === 'T') continue;
                if(data[ny][nx] === 'O') break;
                if(data[ny][nx] === 'S') {
                  f = true;
                  break;
                }
              }
              if(f) {
                break;
              }
            }
            if(f) {
              break;
            }
          }
          if(!f) return "YES"
          data[+ww[k][0]][+ww[k][1]] = 'X';
        }
        data[+ww[j][0]][+ww[j][1]] = 'X';
      }
      data[+ww[i][0]][+ww[i][1]] = 'X';
    }
  } else {
    for(let i = 0; i < ww.length; i++) {
      data[+ww[i][0]][+ww[i][1]] = 'O';
    }

    let f = false;
    for(const [y, x] of t) {
      for(const [dy, dx] of direction) {
        let c = 0;
        while(1) {
          c++;
          const [ny, nx] = [dy * c + y, dx * c + x];
          if(!check(ny, nx)) break;
          if(data[ny][nx] === 'T') continue;
          if(data[ny][nx] === 'O') break;
          if(data[ny][nx] === 'S') {
            f = true;
            break;
          }
        }
        if(f) {
          break;
        }
      }
      if(f) {
        break;
      }
    }
    if(!f) return "YES"
  }

  return "NO";
}