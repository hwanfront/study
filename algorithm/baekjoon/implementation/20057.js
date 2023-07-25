// https://www.acmicpc.net/problem/20057
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `9
193 483 223 482 858 274 847 283 748
484 273 585 868 271 444 584 293 858
828 384 382 818 347 858 293 999 727
818 384 727 373 636 141 234 589 991
913 564 555 827 0 999 123 123 123
321 321 321 983 982 981 983 980 990
908 105 270 173 147 148 850 992 113
943 923 982 981 223 131 222 913 562
752 572 719 590 551 179 141 137 731`;
const [N, ...grid] = input.split('\n');
const direction = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const directionT = [
  [[0, -3], [1, 0], [1, -1], [1, -2], [2, -1], 
            [-1, 0], [-1, -1], [-1, -2], [-2, -1]],
  [[3, 0], [0, 1], [1, 1], [2, 1], [1, 2], 
            [0, -1], [1, -1], [2, -1], [1, -2]],
  [[0, 3], [1, 0], [1, 1], [1, 2], [2, 1], 
            [-1, 0], [-1, 1], [-1, 2], [-2, 1]],
  [[-3, 0], [0, 1], [-1, 1], [-2, 1], [-1, 2], 
            [0, -1], [-1, -1], [-2, -1], [-1, -2]]
]
console.log(solution(+N, grid.map(e => e.split(' ').map(Number))));

function solution (N, grid) {
  let result = 0;
  let cnt = 1;
  const center = Math.floor(N / 2);
  let pos = [center, center];

  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < N;

  const move = ([y, x], d) => {
    const [dy, dx] = direction[d];
    const ny = dy + y;
    const nx = dx + x;
    const sand = grid[ny][nx];
    const s1 = Math.floor(sand / 100);
    const s2 = Math.floor((sand * 2) / 100);
    const s5 = Math.floor(sand / 20);
    const s7 = Math.floor((sand * 7) / 100);
    const s10 = Math.floor((sand) / 10);
    
    let a = sand;

    for(let i = 0; i < directionT[d].length; i++) {
      const [ty, tx] = directionT[d][i];
      let s;
      switch (i) {
      case 0:
        s = s5;
        break;
      case 1:
      case 5:
        s = s1;
        break;
      case 2:
      case 6:
        s = s7;
        break;
      case 3:
      case 7:
        s = s10;
        break;
      case 4:
      case 8:
        s = s2;
        break;
      default:
        break;
      }
      
      if(s === 0) continue;
      if(!check(ty + y, tx + x)) {
        result += s;
      } else {
        grid[ty + y][tx + x] += s;
      } 
      a -= s;
    }

    grid[ny][nx] = 0;
    if(!check(ny + dy, nx + dx)) result += a;
    else grid[ny + dy][nx + dx] += a;
    return [ny, nx];
  }

  while(1) {
    if(cnt === N) {
      for(let i = 1; i < cnt; i++) {
        pos = move(pos, 0);
      }
      break;
    }

    const isOdd = cnt % 2 === 1;

    if(isOdd) {
      for(let i = 0; i < cnt; i++) {
        pos = move(pos, 0);
      }
      for(let i = 0; i < cnt; i++) {
        pos = move(pos, 1);
      }
    } else {
      for(let i = 0; i < cnt; i++) {
        pos = move(pos, 2);
      }
      for(let i = 0; i < cnt; i++) {
        pos = move(pos, 3);
      }
    }
    cnt++;
  }


  return result;
}