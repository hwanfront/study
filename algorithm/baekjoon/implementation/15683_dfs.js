// https://www.acmicpc.net/problem/15683
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3 7
4 0 0 0 0 0 0
0 0 0 2 0 0 0
0 0 0 0 0 0 4`;
const direction = [[-1, 0],[0, 1],[1, 0],[0, -1]];
const [NM, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
const [N, M] = NM;
console.log(solution(N, M, data));

function solution (N, M, data) {
  let walls = 0;
  let result = 0;
  const cctvs = []; // [x, y, cctv]
  const c = [[], [[0], [1], [2], [3]], [[0,2],[1,3]], [[0,1],[1,2],[2,3],[3,0]], [[0,1,2],[1,2,3],[2,3,0],[3,0,1]], [[0,1,2,3]]]

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
      if(0 < data[i][j] && data[i][j] < 6) {
        cctvs.push([i, j, data[i][j]]);
      }
      if(data[i][j] === 6) {
        walls++;
      }
    }
  }

  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < M;

  const shot = (y, x, d, map) => {
    let cnt = 0;
    let i = 0;
    while(1) {
      i++;
      const [dy, dx] = d;
      const ny = y + dy * i;
      const nx = x + dx * i;
      if(!check(ny, nx)) break;
      if(map[ny][nx] === 6) break;
      if(map[ny][nx] === '#') continue;
      map[ny][nx] = '#';
      cnt++;
    }
    return cnt;
  }

  const cctv = (y, x, ds, map) => {
    let cnt = 0;
    if(map[y][x] !== '#') {
      map[y][x] = '#';
      cnt++;
    }
    for(const d of ds) {
      cnt += shot(y, x, direction[d], map);
    }
    return cnt;
  }

  const dfs = (cnt, map, res) => {
    if(cnt === cctvs.length) {
      result = Math.max(result, res);
      return;
    }
    const [y, x, cn] = cctvs[cnt];

    for(const arr of c[cn]) {
      const newMap = JSON.parse(JSON.stringify(map));
      const newCnt = cctv(y, x, arr, newMap);
      dfs(cnt + 1, newMap, res + newCnt);
    }

  }

  dfs(0, data, 0);

  return N * M - result - walls;
}
