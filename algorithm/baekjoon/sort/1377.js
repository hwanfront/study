// https://www.acmicpc.net/problem/1377
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `5
1
3
5
7
9`;
const data = input.split`\n`.map(Number);
const [n, ...values] = data;
console.log(solution(n, values.map((e, i) => [e, i])));
console.log(question(data));

function question(data) {
  let changed = false;

  const swap = (i, j) => {
    const tmp = data[j];
    data[j] = data[i];
    data[i] = tmp;
  }

  for(let i = 1; i <= data[0] + 1; i++) {
    for(let j = 1; j <= data[0] - i; j++) {
      if(data[j] > data[j + 1]) {
        changed = true;
        swap(j, j + 1);
        console.log(data);
      }
    }
    if(changed === false) {
      console.log(i);
      break;
    }
  }
}

function solution(n, values) {
  let result = Number.MIN_SAFE_INTEGER;
  values.sort((a, b) => a[0] - b[0]);
  for(let i = 0; i < n; i++) {
    result = Math.max(result, values[i][1] - i);
  }
  return result + 1
}
