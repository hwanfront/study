// https://www.acmicpc.net/problem/5373
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
/**
 *          B1 B2 B3
 *          B4 oo B6
 *          B7 B8 B9
 * L1 L2 L3 U1 U2 U3 R1 R2 R3
 * L4 gg L6 U4 ww U6 R4 bb R6
 * L7 L8 L9 U7 U8 U9 R7 R8 R9
 *          F1 F2 F3
 *          F4 rr F6
 *          F7 F8 F9
 *          D1 D2 D3 
 *          D4 yy D6 
 *          D7 D8 D9 
 */

/**
 * U+ cw(u) b7 b8 b9 -> r1 r4 r7 -> f3 f2 f1 -> l9 l6 l3
 * U- tcw(u) b7 b8 b9 -> l9 l6 l3 -> f3 f2 f1 -> r1 r4 r7
 * F+ cw(f) u7 u8 u9 -> r7 r8 r9 -> d3 d2 d1 -> l7 l8 l9
 * F- tcw(f) u7 u8 u9 -> l7 l8 l9 -> d3 d2 d1 -> r7 r8 r9
 * B+ cw(b) u1 u2 u3 -> l1 l2 l3 -> d9 d8 d7 -> r1 r2 r3
 * B- tcw(b) u1 u2 u3 -> r1 r2 r3 -> d9 d8 d7 -> l1 l2 l3
 * L+ cw(l) b1 b4 b7 -> u1 u4 u7 -> f1 f4 f7 -> d1 d4 d7
 * L- tcw(l) b1 b4 b7 -> d1 d4 d7 -> f1 f4 f7 -> u1 u4 u7
 * R+ cw(r) b3 b6 b9 -> d3 d6 d9 -> f3 f6 f9 -> u3 u6 u9
 * R- tcw(r) b3 b6 b9 -> u3 u6 u9 -> f3 f6 f9 -> d3 d6 d9
 * D+ cw(d) f7 f8 f9 -> r9 r6 r3 -> b3 b2 b1 -> l1 l4 l7
 * D- tcw(d) f7 f8 f9 -> l1 l4 l7 -> b3 b2 b1 -> r9 r6 r3
 */

const input = `1
8
U+ B- R- F- D+ L- B+ U-`;
const [t, ...info] = input.split('\n');
let result = '';
for(let i = 0; i < +t; i++) {
  const methods = info[i * 2 + 1].split(' ');
  result += solution(methods) + '\n' + '\n';
}
console.log(result.trim());

function solution (methods) {
  const CUBE_WIDTH = 3;
  const getSide = (color) => Array.from({length: CUBE_WIDTH}, () => Array(CUBE_WIDTH).fill(color));
  const turnCW = (side) => {
    const newSide = getSide();
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        newSide[i][j] = side[3 - 1 - j][i];
      }
    }
    return newSide;
  }
  const turnCCW = (side) => {
    const newSide = getSide();
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        newSide[i][j] = side[j][3 - 1 - i];
      }
    }
    return newSide;
  }

  let u = getSide('w');
  let d = getSide('y');
  let f = getSide('r');
  let b = getSide('o');
  let l = getSide('g');
  let r = getSide('b');
  const turn = (method) => {
    let tmp;
    switch(method) {
    case 'U+':
      u = turnCW(u);
      tmp = [
        l[2][2], 
        l[1][2], 
        l[0][2]
      ];
      l[2][2] = f[0][2]; f[0][2] = r[0][0]; r[0][0] = b[2][0]; b[2][0] = tmp[0];  
      l[1][2] = f[0][1]; f[0][1] = r[1][0]; r[1][0] = b[2][1]; b[2][1] = tmp[1];  
      l[0][2] = f[0][0]; f[0][0] = r[2][0]; r[2][0] = b[2][2]; b[2][2] = tmp[2]; 
      break;
    case 'U-':
      u = turnCCW(u);
      tmp = [
        r[0][0], 
        r[1][0], 
        r[2][0]
      ];
      r[0][0] = f[0][2]; f[0][2] = l[2][2]; l[2][2] = b[2][0]; b[2][0] = tmp[0];  
      r[1][0] = f[0][1]; f[0][1] = l[1][2]; l[1][2] = b[2][1]; b[2][1] = tmp[1];  
      r[2][0] = f[0][0]; f[0][0] = l[0][2]; l[0][2] = b[2][2]; b[2][2] = tmp[2]; 
      break;
    case 'F+':
      f = turnCW(f);
      tmp = [
        l[2][0], 
        l[2][1], 
        l[2][2]
      ];
      l[2][0] = d[0][2]; d[0][2] = r[2][0]; r[2][0] = u[2][0]; u[2][0] = tmp[0];  
      l[2][1] = d[0][1]; d[0][1] = r[2][1]; r[2][1] = u[2][1]; u[2][1] = tmp[1];  
      l[2][2] = d[0][0]; d[0][0] = r[2][2]; r[2][2] = u[2][2]; u[2][2] = tmp[2]; 
      break;
    case 'F-':
      f = turnCCW(f);
      tmp = [
        r[2][0], 
        r[2][1], 
        r[2][2]
      ];
      r[2][0] = d[0][2]; d[0][2] = l[2][0]; l[2][0] = u[2][0]; u[2][0] = tmp[0];  
      r[2][1] = d[0][1]; d[0][1] = l[2][1]; l[2][1] = u[2][1]; u[2][1] = tmp[1];  
      r[2][2] = d[0][0]; d[0][0] = l[2][2]; l[2][2] = u[2][2]; u[2][2] = tmp[2]; 
      break;
    case 'B+':
      b = turnCW(b);
      tmp = [
        r[0][0], 
        r[0][1], 
        r[0][2]
      ];
      r[0][0] = d[2][2]; d[2][2] = l[0][0]; l[0][0] = u[0][0]; u[0][0] = tmp[0];  
      r[0][1] = d[2][1]; d[2][1] = l[0][1]; l[0][1] = u[0][1]; u[0][1] = tmp[1];  
      r[0][2] = d[2][0]; d[2][0] = l[0][2]; l[0][2] = u[0][2]; u[0][2] = tmp[2]; 
      break;
    case 'B-':
      b = turnCCW(b);
      tmp = [
        l[0][0], 
        l[0][1], 
        l[0][2]
      ];
      l[0][0] = d[2][2]; d[2][2] = r[0][0]; r[0][0] = u[0][0]; u[0][0] = tmp[0];  
      l[0][1] = d[2][1]; d[2][1] = r[0][1]; r[0][1] = u[0][1]; u[0][1] = tmp[1];  
      l[0][2] = d[2][0]; d[2][0] = r[0][2]; r[0][2] = u[0][2]; u[0][2] = tmp[2]; 
      break;
    case 'L+':
      l = turnCW(l);
      tmp = [
        d[0][0], 
        d[1][0], 
        d[2][0]
      ];
      d[0][0] = f[0][0]; f[0][0] = u[0][0]; u[0][0] = b[0][0]; b[0][0] = tmp[0];  
      d[1][0] = f[1][0]; f[1][0] = u[1][0]; u[1][0] = b[1][0]; b[1][0] = tmp[1];  
      d[2][0] = f[2][0]; f[2][0] = u[2][0]; u[2][0] = b[2][0]; b[2][0] = tmp[2]; 
      break;
    case 'L-':
      l = turnCCW(l);
      tmp = [
        u[0][0], 
        u[1][0], 
        u[2][0]
      ];
      u[0][0] = f[0][0]; f[0][0] = d[0][0]; d[0][0] = b[0][0]; b[0][0] = tmp[0];  
      u[1][0] = f[1][0]; f[1][0] = d[1][0]; d[1][0] = b[1][0]; b[1][0] = tmp[1];  
      u[2][0] = f[2][0]; f[2][0] = d[2][0]; d[2][0] = b[2][0]; b[2][0] = tmp[2]; 
      break;
    case 'R+':
      r = turnCW(r);
      tmp = [
        u[0][2], 
        u[1][2], 
        u[2][2]
      ];
      u[0][2] = f[0][2]; f[0][2] = d[0][2]; d[0][2] = b[0][2]; b[0][2] = tmp[0];  
      u[1][2] = f[1][2]; f[1][2] = d[1][2]; d[1][2] = b[1][2]; b[1][2] = tmp[1];  
      u[2][2] = f[2][2]; f[2][2] = d[2][2]; d[2][2] = b[2][2]; b[2][2] = tmp[2]; 
      break;
    case 'R-':
      r = turnCCW(r);
      tmp = [
        d[0][2], 
        d[1][2], 
        d[2][2]
      ];
      d[0][2] = f[0][2]; f[0][2] = u[0][2]; u[0][2] = b[0][2]; b[0][2] = tmp[0];  
      d[1][2] = f[1][2]; f[1][2] = u[1][2]; u[1][2] = b[1][2]; b[1][2] = tmp[1];  
      d[2][2] = f[2][2]; f[2][2] = u[2][2]; u[2][2] = b[2][2]; b[2][2] = tmp[2]; 
      break;
    case 'D+':
      d = turnCW(d);
      tmp = [
        l[0][0], 
        l[1][0], 
        l[2][0]
      ];
      l[0][0] = b[0][2]; b[0][2] = r[2][2]; r[2][2] = f[2][0]; f[2][0] = tmp[0];  
      l[1][0] = b[0][1]; b[0][1] = r[1][2]; r[1][2] = f[2][1]; f[2][1] = tmp[1];  
      l[2][0] = b[0][0]; b[0][0] = r[0][2]; r[0][2] = f[2][2]; f[2][2] = tmp[2]; 
      break;
    case 'D-':
      d = turnCCW(d);
      tmp = [
        r[2][2], 
        r[1][2], 
        r[0][2]
      ];
      r[2][2] = b[0][2]; b[0][2] = l[0][0]; l[0][0] = f[2][0]; f[2][0] = tmp[0];  
      r[1][2] = b[0][1]; b[0][1] = l[1][0]; l[1][0] = f[2][1]; f[2][1] = tmp[1];  
      r[0][2] = b[0][0]; b[0][0] = l[2][0]; l[2][0] = f[2][2]; f[2][2] = tmp[2]; 
      break;
    }
  }

  for(const method of methods) {
    turn(method);
  }

  return u.map(e => e.join('')).join('\n');
}