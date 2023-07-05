// https://www.acmicpc.net/problem/14890
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 3
2 1 3 1 3 
2 2 1 3 2 
2 1 2 2 2 
3 1 2 3 2 
3 3 2 3 1`;
const [NL, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
const [N, L] = NL;
console.log(solution(N, L, data));

function solution (N, L, data) {
  let result = 0;

  for(let i = 0; i < N; i++) {
    let res = true;
    let beforeSlope = 0;
    let height = -1;
    let cnt = 0;
    let pos = 0
    for(; pos < N; pos++) {
      cnt++;

      if(height === -1) {
        height = data[i][pos];
        continue;
      }

      if(height === data[i][pos]) continue; // 평지 -> 0
      if(data[i][pos] - height > 1 || data[i][pos] - height < -1) { // 모든 길 -> +2, -2
        res = false;
        break;
      }

      if(beforeSlope === 0) { // 시작점 출발
        if(data[i][pos] - height === 1) { // 시작점 -> +1
          if(cnt <= L) {
            res = false;
            break;
          }
          beforeSlope = 1;
        }

        if(data[i][pos] - height === -1) { // 시작점 -> -1
          beforeSlope = -1;
        }
        cnt = 1;
        height = data[i][pos];
        continue;
      }

      if(beforeSlope === -1) { // 내리막 출발
        if(data[i][pos] - height === 1) { // 내리막 -> +1
          if(cnt <= L * 2) {
            res = false;
            break;
          }
          beforeSlope = 1;
        }
        if(data[i][pos] - height === -1) { // 내리막 -> -1
          if(cnt <= L) {
            res = false;
            break;
          }
          beforeSlope = -1;
        }
        cnt = 1;
        height = data[i][pos];
        continue;
      }

      if(beforeSlope === 1) { // 오르막 출발
        if(data[i][pos] - height === 1) { // 오르막 -> +1
          if(cnt <= L) {
            res = false;
            break;
          }
          beforeSlope = 1;
        }
        if(data[i][pos] - height === -1) { // 오르막 -> -1
          beforeSlope = -1;
        }
        cnt = 1;
        height = data[i][pos];
        continue;
      }
    }

    if(beforeSlope === -1 && cnt < L) {
      res = false;
    }

    if(res) {
      result += 1;
    }
  }


  for(let i = 0; i < N; i++) {
    let res = true;
    let beforeSlope = 0;
    let height = -1;
    let cnt = 0;
    let pos = 0
    for(; pos < N; pos++) {
      cnt++;
      if(height === -1) {
        height = data[pos][i];
        continue;
      }

      if(height === data[pos][i]) continue; // 평지 -> 0
      if(data[pos][i] - height > 1 || data[pos][i] - height < -1) { // 모든 길 -> +2, -2
        res = false;
        break;
      }

      if(beforeSlope === 0) { // 시작점 출발
        if(data[pos][i] - height === 1) { // 시작점 -> +1
          if(cnt <= L) {
            res = false;
            break;
          }
          beforeSlope = 1;
        }

        if(data[pos][i] - height === -1) { // 시작점 -> -1
          beforeSlope = -1;
        }
        cnt = 1;
        height = data[pos][i];
        continue;
      }

      if(beforeSlope === -1) { // 내리막 출발
        if(data[pos][i] - height === 1) { // 내리막 -> +1
          if(cnt <= L * 2) {
            res = false;
            break;
          }
          beforeSlope = 1;
        }
        if(data[pos][i] - height === -1) { // 내리막 -> -1
          if(cnt <= L) {
            res = false;
            break;
          }
          beforeSlope = -1;
        }
        cnt = 1;
        height = data[pos][i];
        continue;
      }

      if(beforeSlope === 1) { // 오르막 출발
        if(data[pos][i] - height === 1) { // 오르막 -> +1
          if(cnt <= L) {
            res = false;
            break;
          }
          beforeSlope = 1;
        }
        if(data[pos][i] - height === -1) { // 오르막 -> -1
          beforeSlope = -1;
        }
        cnt = 1;
        height = data[pos][i];
        continue;
      }
    }

    if(beforeSlope === -1 && cnt < L) {
      console.log(i,pos, beforeSlope, cnt, L);
      res = false;
    }

    if(res) {
      result += 1;
    }
  }

  return result;
}
