// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `6 8 6
3 2 6 3 1 2 9 7
9 7 8 2 1 4 5 3
5 9 2 1 9 6 1 8
2 1 3 8 6 3 9 2
1 3 2 8 7 9 2 1
4 5 1 9 8 2 1 3
1 2 3 4 5 6`;
const [nmr, ...data] = input.split('\n').map(e => e.split` `.map(Number));
const cs = data.pop();
console.log(solution(nmr, data, cs));

function solution ([n, m ,r], data, cs) {
  const yx = (arr) => [arr.length, arr[0].length];
  const cal = {
    1(arr) {
      const [y, x] = yx(arr);
      const result = Array.from({length: y}, () => Array(x));
      for(let i = 0; i < y; i++) {
        for(let j = 0; j < x; j++) {
          result[i][j] = arr[y - i - 1][j];
        }
      }
      return result;
    },
    2(arr) {
      const [y, x] = yx(arr);
      const result = Array.from({length: y}, () => Array(x));
      for(let i = 0; i < y; i++) {
        for(let j = 0; j < x; j++) {
          result[i][j] = arr[i][x - j - 1];
        }
      }
      return result;
    },
    3(arr) {
      const [y, x] = yx(arr);
      const result = Array.from({length: x}, () => Array(y));
      for(let i = 0; i < y; i++) {
        for(let j = 0; j < x; j++) {
          result[j][i] = arr[y - i - 1][j];
        }
      }
      return result;
    },
    4(arr) {
      const [y, x] = yx(arr);
      const result = Array.from({length: x}, () => Array(y));
      for(let i = 0; i < y; i++) {
        for(let j = 0; j < x; j++) {
          result[j][i] = arr[i][x - j - 1];
        }
      }
      return result;
    },
    5(arr) {
      const [y, x] = yx(arr);
      const [yy, xx] = [y / 2, x / 2];
      const result = Array.from({length: y}, () => Array(x));
      for(let i = 0; i < yy; i++) {
        for(let j = 0; j < xx; j++) {
          result[i][j] = arr[i + yy][j];
          result[i][j + xx] = arr[i][j];
          result[i + yy][j + xx] = arr[i][j + xx];
          result[i + yy][j] = arr[i + yy][j + xx];
        }
      }
      return result;
    },
    6(arr) {
      const [y, x] = yx(arr);
      const [yy, xx] = [y / 2, x / 2];
      const result = Array.from({length: y}, () => Array(x));
      for(let i = 0; i < yy; i++) {
        for(let j = 0; j < xx; j++) {
          result[i][j] = arr[i][j + xx];
          result[i][j + xx] = arr[i + yy][j + xx];
          result[i + yy][j + xx] = arr[i + yy][j];
          result[i + yy][j] = arr[i][j];
        }
      }
      return result;
    },
  }

  for(const c of cs) {
    data = cal[c](data);
  }
  return data.map(e => e.join` `).join`\n`;
}