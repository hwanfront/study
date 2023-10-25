// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 
const input = `4
4
3 2 1 4
2 3 4 1
8
3 6 5 4 8 7 1 2
5 6 8 4 3 1 2 7
1
1
1
2
1 2
2 1`;
const [t, ...data] = input.split('\n');
const result = [];
let j = 0;
for(let i = 0; i < t; i++) {
  const n = +data[j++];
  const po = data[j++].split(' ').map(Number);
  const io = data[j++].split(' ').map(Number);
  result.push(solution(n, po, io));
}

console.log(result.join('\n'))

function solution (n, preO, inO) {
  const postO = [];
  let cnt = 0;
  const find = (from, to) => {
    if(from > to) return;
    const mid = inO.indexOf(preO[cnt++]);
    if(mid === -1) return;
    find(from, mid - 1);
    find(mid + 1, to);
    postO.push(inO[mid]);
  }

  find(0, n - 1);

  return postO.join(' ');
}