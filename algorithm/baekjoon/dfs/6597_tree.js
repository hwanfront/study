// https://www.acmicpc.net/problem/6597
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 
const input = `DBACEGF ABCDEFG
BCAD CBAD`;
const data = input.split('\n').map(e => e.split(' '));
const result = [];
for(let i = 0; i < data.length; i++) {
  result.push(solution(data[i]));
}
console.log(result.join('\n'));

function solution (data) {
  const result = [];
  let cnt = 0;
  const find = (from, to) => {
    if(from > to) return;
    const m = data[1].indexOf(data[0][cnt++]);
    if(m === -1) return;
    find(from, m - 1);
    find(m + 1, to);
    result.push(data[1][m]);
  }

  find(0, data[0].length);

  return result.join('');
}