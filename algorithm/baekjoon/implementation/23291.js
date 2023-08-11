// https://www.acmicpc.net/problem/23291
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `100 5
1 2 3 4 5 6 7 8 1 2 3 4`;
const [NK, fishbowl] = input.split('\n').map(e => e.split(' ').map(Number));

console.log(solution(NK, fishbowl));

function solution ([N, K], fishbowl) {
  let w = 2;
  let h = 2;
  let d = 2;
  let m;
  while(1) {
    if(w * h >= N) {
      if(w * h === N) m = 0;
      else m = N - ((w - 1) * h);
      break;
    }
    if(w === h) w++;
    else h++;
    d = d === 0 ? 3 : d - 1;
  }

  if(m > 0) d++;

  const pw = w % 2 === 0 ? w + 1 : w;
  const check = (y, x, Y, X) => 0 <= y && y < Y && 0 <= x && x < X;
  const pos = Array.from({length: pw}, () => Array(pw).fill(-1));
  let [cy, cx] = [Math.floor(pw / 2), Math.floor(pw / 2)];
  
  let j = 1;
  let cnt = 0;
  const isOdd = d % 2;
  const posDirection = [[0, 1],[-1, 0],[0, -1],[1, 0]]; // 우 상 좌 하
  const checkDirection = [[0, 1], [1, 0]];

  for(let i = 0; i < N - m; i++) {
    if(j === cnt) {
      cnt = 0;
      if(isOdd) {
        if(++d % 2 === 1) {
          j++;
        }
      } else {
        if(++d % 2 === 0) {
          j++;
        }
      }
    }
    pos[cy][cx] = i;
    cy += posDirection[d % 4][0];
    cx += posDirection[d % 4][1];
    cnt++;
  }

  const pos2 = Array.from({length: 4}, () => Array(N / 4).fill(0));
  const width = N / 4;

  for(let i = 0; i < width; i++) {
    pos2[0][width - 1 - i] = width * 2 + i;
    pos2[1][i] = width + i;
    pos2[2][width - 1 - i] = i; 
    pos2[3][i] = width * 3 + i;
  }
  
  const add = (fishbowl) => {
    const newFishbowl = JSON.parse(JSON.stringify(fishbowl));

    let min = Number.MAX_SAFE_INTEGER;
    let fb = [];

    for(let i = 0; i < fishbowl.length; i++) {
      if(fishbowl[i] < min) {
        min = fishbowl[i];
        fb = [];
      }

      if(min === fishbowl[i]) {
        fb.push(i);
      }
    }

    for(const idx of fb) {
      newFishbowl[idx]++;
    }

    return newFishbowl;
  }

  const clean1 = (fishbowl) => {
    const newFishbowl = JSON.parse(JSON.stringify(fishbowl));

    for(let y = 0; y < pw; y++) {
      for(let x = 0; x < pw; x++) {
        if(!check(y, x, pw, pw)) continue;
        if(pos[y][x] === -1) continue; 
        const p1 = pos[y][x];
        const fb1 = fishbowl[p1];
        for(const [dy, dx] of checkDirection) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx, pw, pw)) continue;
          if(pos[ny][nx] === -1) continue;
          const p2 = pos[ny][nx];
          const fb2 = fishbowl[p2];
          const diff = Math.floor(Math.abs(fb1 - fb2) / 5);
          if(diff > 0) {
            if(fb1 > fb2) {
              newFishbowl[p1] -= diff;
              newFishbowl[p2] += diff;
            } else {
              newFishbowl[p1] += diff;
              newFishbowl[p2] -= diff;
            }
          }
        }
      }
    }

    if(m > 0) {
      for(let i = N - m; i < N; i++) {
        const fb1 = fishbowl[i - 1];
        const fb2 = fishbowl[i];
        const diff = Math.floor(Math.abs(fb1 - fb2) / 5);
        if(diff > 0) {
          if(fb1 > fb2) {
            newFishbowl[i - 1] -= diff;
            newFishbowl[i] += diff;
          } else {
            newFishbowl[i - 1] += diff;
            newFishbowl[i] -= diff;
          }
        }
      }
    }
    return newFishbowl;
  }

  const placed1 = (fishbowl) => {
    const newFishbowl = JSON.parse(JSON.stringify(fishbowl));
    let now = 0;
    for(let i = 0; i < pw; i++) {
      for(let j = pw - 1; j >= 0; j--) {
        if(pos[j][i] === -1) continue;
        const idx = pos[j][i];
        newFishbowl[now++] = fishbowl[idx];
      }
    }
    return newFishbowl;
  }

  const clean2 = (fishbowl) => {
    const newFishbowl = JSON.parse(JSON.stringify(fishbowl));

    for(let y = 0; y < 4; y++) {
      for(let x = 0; x < width; x++) {
        const p1 = pos2[y][x];
        const fb1 = fishbowl[p1];
        for(const [dy, dx] of checkDirection) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx, 4, width)) continue;
          const p2 = pos2[ny][nx];
          const fb2 = fishbowl[p2];
          const diff = Math.floor(Math.abs(fb1 - fb2) / 5);
          if(diff > 0) {
            if(fb1 > fb2) {
              newFishbowl[p1] -= diff;
              newFishbowl[p2] += diff;
            } else {
              newFishbowl[p1] += diff;
              newFishbowl[p2] -= diff;
            }
          }
        }
      }
    }
    return newFishbowl;
  }

  const placed2 = (fishbowl) => {
    const newFishbowl = JSON.parse(JSON.stringify(fishbowl));
    let now = 0;
    for(let i = 0; i < width; i++) {
      for(let j = 3; j >= 0; j--) {
        const idx = pos2[j][i];
        newFishbowl[now++] = fishbowl[idx];
      }
    }
    return newFishbowl;
  }

  let result = 0;

  while(1) {
    let min = Number.MAX_SAFE_INTEGER;
    let max = -1;
    for(let i = 0; i < N; i++) {
      min = Math.min(min, fishbowl[i]);
      max = Math.max(max, fishbowl[i]);
    }

    if(max - min <= K) break;
    result++;
    fishbowl = add(fishbowl);
    fishbowl = clean1(fishbowl);
    fishbowl = placed1(fishbowl);
    fishbowl = clean2(fishbowl);
    fishbowl = placed2(fishbowl);
  }

  return result;
}