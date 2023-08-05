const PriorityQueue = require('../util/PriorityQueue.js');
const input = `5
3 1
3 2
3 3
2 10
1 10`;
const [N, ...data] = input.split('\n');
console.log(solution(+N, data.map(e => e.split(' ').map(Number))));

function solution (N, data) {
  let result = 0;
  data.sort((a, b) => a[0] - b[0]);
  const pq = new PriorityQueue((a, b) => a > b);
  let j = data.length - 1;
  for(let i = data[data.length - 1][0]; i > 0; i--) {
    while(j >= 0 && data[j][0] === i) {
      pq.push(data[j--][1]);
    }
    if(!pq.empty()) {
      result += pq.top();
      pq.pop();
    } 
  }

  return result;
}