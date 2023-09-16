// https://www.acmicpc.net/problem/2931
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `3 3
14.
M.Z
.23`;
const [RC, ...data] = input.split('\n');
console.log(solution(RC.split(' ').map(Number), data.map(e => e.split(''))));

function solution ([R, C], data) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  let s, e;
  for(let i = 0; i < R; i++) {
    for(let j = 0; j < C; j++) {
      if(data[i][j] === 'M') {
        s = [i, j];
        continue;
      }
      if(data[i][j] === 'Z') {
        e = [i, j];
        continue;
      }
    }
    if(s && e) break;
  }

  const check = (y, x) => 0 <= y && y < R && 0 <= x && x < C;

  const go = ([y, x], i) => {
    const [dy, dx] = direction[i];
    const [ny, nx] = [dy + y, dx + x];
    if(data[ny][nx] === '.') return [[ny, nx], (i + 2) % 4];
    if(['+', '|', '-'].includes(data[ny][nx])) return go([ny, nx], i);
    if(i === 0) {
      if(data[ny][nx] === '3') return go([ny, nx], 3);
      if(data[ny][nx] === '4') return go([ny, nx], 1);
      return go([ny, nx], 0);
    } 
    if(i === 1) {
      if(data[ny][nx] === '2') return go([ny, nx], 0);
      if(data[ny][nx] === '3') return go([ny, nx], 2);
      return go([ny, nx], 1);
    }
    if(i === 2) {
      if(data[ny][nx] === '1') return go([ny, nx], 1);
      if(data[ny][nx] === '2') return go([ny, nx], 3);
      return go([ny, nx], 2);
    }
    if(i === 3) {
      if(data[ny][nx] === '1') return go([ny, nx], 0);
      if(data[ny][nx] === '4') return go([ny, nx], 2);
      return go([ny, nx], 3);
    }
  }

  const find = ([y, x]) => {
    for(let i = 0; i < direction.length; i++) {
      const [dy, dx] = direction[i]
      const [ny, nx] = [dy + y, dx + x];
      if(!check(ny, nx)) continue;
      if(['.', 'M', 'Z'].includes(data[ny][nx])) continue;
      if(i === 0) {
        if(['|', '1', '2'].includes(data[ny][nx])) continue;
        if(data[ny][nx] === '3') return [[ny, nx], 3];
        if(data[ny][nx] === '4') return [[ny, nx], 1];
        return [[ny, nx], 0];
      } 
      if(i === 1) {
        if(['-', '1', '4'].includes(data[ny][nx])) continue;
        if(data[ny][nx] === '2') return [[ny, nx], 0];
        if(data[ny][nx] === '3') return [[ny, nx], 2];
        return [[ny, nx], 1];
      }
      if(i === 2) {
        if(['|', '3', '4'].includes(data[ny][nx])) continue;
        if(data[ny][nx] === '1') return [[ny, nx], 1];
        if(data[ny][nx] === '2') return [[ny, nx], 3];
        return [[ny, nx], 2];
      }
      if(i === 3) {
        if(['-', '2', '3'].includes(data[ny][nx])) continue;
        if(data[ny][nx] === '1') return [[ny, nx], 0];
        if(data[ny][nx] === '4') return [[ny, nx], 2];
        return [[ny, nx], 3];
      }
    }
  }

  const [sp, sd] = go(...find(s));
  const [ep, ed] = go(...find(e));

  for(let i = 0; i < 4; i++) {
    if(sd === i || ed === i) continue;
    const [dy, dx] = direction[i];
    const [ny, nx] = [dy + sp[0], dx + sp[1]];
    if(!check(ny, nx)) break;
    if(data[ny][nx] === '.') continue;
    if(i === 0) {
      if(['|', '1', '2', 'M', 'Z'].includes(data[ny][nx])) continue;
      return [sp[0] + 1, sp[1] + 1, '+'].join(' ');
    } 
    if(i === 1) {
      if(['-', '1', '4', 'M', 'Z'].includes(data[ny][nx])) continue;
      return [sp[0] + 1, sp[1] + 1, '+'].join(' ');
    }
    if(i === 2) {
      if(['|', '3', '4', 'M', 'Z'].includes(data[ny][nx])) continue;
      return [sp[0] + 1, sp[1] + 1, '+'].join(' ');
    }
    if(i === 3) {
      if(['-', '2', '3', 'M', 'Z'].includes(data[ny][nx])) continue;
      return [sp[0] + 1, sp[1] + 1, '+'].join(' ');
    }
  }
  
  if(sd === (ed + 2) % 4) {
    if(sd % 2 === 1) {
      return [sp[0] + 1, sp[1] + 1, '|'].join(' ');
    } else {
      return [sp[0] + 1, sp[1] + 1, '-'].join(' ');
    }
  }
  if(sd === 0) {
    if(ed === 1) return [sp[0] + 1, sp[1] + 1, 1].join(' ');
    if(ed === 3) return [sp[0] + 1, sp[1] + 1, 2].join(' ');
  }
  if(sd === 1) {
    if(ed === 0) return [sp[0] + 1, sp[1] + 1, 1].join(' ');
    if(ed === 2) return [sp[0] + 1, sp[1] + 1, 4].join(' ');
  }
  if(sd === 2) {
    if(ed === 1) return [sp[0] + 1, sp[1] + 1, 4].join(' ');
    if(ed === 3) return [sp[0] + 1, sp[1] + 1, 3].join(' ');
  }
  if(sd === 3) {
    if(ed === 0) return [sp[0] + 1, sp[1] + 1, 2].join(' ');
    if(ed === 2) return [sp[0] + 1, sp[1] + 1, 3].join(' ');
  }
}
