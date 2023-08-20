// https://www.acmicpc.net/problem/15898
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5
6 3 3 -9
-6 8 -6 8
9 5 1 -1
-8 2 -3 -1
R B G Y
Y B R R
W R R R
G R W B
6 3 3 -9
-6 8 -6 8
9 5 1 -1
-8 2 -3 -1
R B G Y
Y B R R
W R R R
G R W B
-6 -2 -4 -3
1 -3 0 9
8 -7 2 0
0 3 -5 7
W B R Y
Y W R B
W B G G
Y G B R
8 7 2 1
-9 8 8 -9
-1 -4 8 6
-7 8 -3 8
Y W W G
Y B R B
Y W R R
R Y W Y
4 -5 8 3
2 3 1 3
-5 0 1 -3
4 3 3 -6
W Y G W
G G R W
G Y G R
R R G Y`;
const [n, ...info] = input.split('\n');
console.log(solution(n, info.map(e => e.split(' '))));
function solution (n, info) {
  let result = 0;
  const mtpos = [[0,0],[0,1],[1,0],[1,1]];
  const g = Array.from({length: 5}, () => Array.from({length: 5}, () => ([0, 'W'])));
  const mts = [];

  for(let i = 0; i < n; i++) {
    const mt = [];
    for(let j = 0; j < 4; j++) {
      const arr = [];
      for(let k = 0; k < 4; k++) {
        arr.push([+info[i * 8 + j][k], info[i * 8 + j + 4][k]])
      }
      mt.push(arr);
    }
    mts.push(mt);
  }

  const getQuality = (g) => {
    const cnt = {R: 0, B: 0, G: 0, Y: 0};
    for(const line of g) {
      for(const [value, color] of line) {
        if(color === 'W') continue;
        cnt[color] += value;
      }
    }
    return cnt.R * 7 + cnt.B * 5 + cnt.G * 3 + cnt.Y * 2;
  }
  
  const spin = (mt) => {
    const newMt = Array.from({length: 4}, () => Array(4).fill(null));
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 4; j++) {
        newMt[i][j] = mt[j][3 - i];
      }
    }
    return newMt;
  }
  
  const put = (myMts, cnt, g) => {
    if(cnt === 3) {
      result = Math.max(result, getQuality(g));
      return 
    }

    for(const [y, x] of mtpos) {
      const newG = JSON.parse(JSON.stringify(g));
      for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
          const [v, c] = newG[i + y][j + x];
          const [av, ac] = myMts[cnt][i][j];
          const newV = v + av;
          const newC = ac === 'W' ? c : ac;
          if(newV < 0) {
            newG[i + y][j + x] = [0, newC];
          } else if (newV > 9) {
            newG[i + y][j + x] = [9, newC];
          } else {
            newG[i + y][j + x] = [newV, newC];
          }
        }
      }
      put(myMts, cnt + 1, newG);
    }
  }

  const make = (myMts, cnt) => {
    if(cnt === 3) {
      const newG = JSON.parse(JSON.stringify(g));
      for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
          const [v, c] = newG[i][j];
          const [av, ac] = myMts[0][i][j];
          const newV = v + av;
          const newC = ac === 'W' ? c : ac;
          if(newV < 0) {
            newG[i][j] = [0, newC];
          } else if (newV > 9) {
            newG[i][j] = [9, newC];
          } else {
            newG[i][j] = [newV, newC];
          }
        }
      }

      put(myMts, 1, newG);
      return;
    }

    const newMyMts = JSON.parse(JSON.stringify(myMts));

    for(let i = 0; i < 3; i++) {
      newMyMts[cnt] = spin(newMyMts[cnt]);
      make(newMyMts, cnt + 1);
    }
  }

  const v = Array(3).fill(false);

  const find = (arr) => {
    if(arr.length === 3) {
      make(arr.map(e => mts[e]), 0);
      return;
    }

    for(let i = 0; i < n; i++) {
      if(v[i]) continue;
      v[i] = true;
      find([...arr, i]);
      v[i] = false;
    }
  }

  find([]);

  return result;
}