// https://www.acmicpc.net/problem/20056
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4 9 5
3 2 8 5 2
3 3 19 3 4
3 1 7 1 1
4 4 6 4 0
2 1 6 2 5
4 3 9 4 3
2 2 16 1 2
4 2 17 5 3
3 4 3 5 7`;
const direction = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
const [NMK, ...info] = input.split('\n').map(e => e.split(' ').map(Number));
const [N, M, K] = NMK;
console.log(solution(NMK, info));

// info -> r(행) c(열) m(질량) s(속력) d(방향) 

function solution ([N, M, K], initInfo) {
  let fireball = initInfo;
  let cnt = 0;

  const move = ([y, x], [dy, dx], s) => [y + dy * s, x + dx * s];
  const getCoordinate = (a) => {
    if(a > N) {
      return (a % N);
    }
    if(a < 1) {
      return N + (a % N);
    }
    return a;
  }


  while(1) {
    if(cnt++ === K) break;
    const grid = Array.from({length: N + 1}, () => Array.from({length: N + 1}, () => [[], 0, 0]));
    const newFireball = [];

    for(let i = 0; i < fireball.length; i++) {
      const [r, c, m, s, d] = fireball[i];
      let [ny, nx] = move([r, c], direction[d], s % N);
      ny = getCoordinate(ny);
      nx = getCoordinate(nx);
      grid[ny][nx][0].push(d);
      grid[ny][nx][1] += m;
      grid[ny][nx][2] += s;
    }
    
    for(let i = 1; i <= N; i++) {
      for(let j = 1; j <= N; j++) {
        const [d, m, s] = grid[j][i];
        const cnt = d.length;
        if(cnt === 0) continue;
        if(cnt === 1) {
          newFireball.push([j, i, m, s, d[0]]);
          continue;
        }
        const dm = Math.floor(m / 5);
        if(dm < 1) continue;
        const ds = Math.floor(s / cnt);
        const base = d[0] % 2;
        for(const nd of d.some(e => e % 2 !== base) ? [1,3,5,7] : [0,2,4,6]) {
          newFireball.push([j, i, dm, ds, nd]);
        }
      }
    }

    fireball = newFireball;
  }

  return fireball.reduce((prev, cur) => prev + cur[2], 0);
}