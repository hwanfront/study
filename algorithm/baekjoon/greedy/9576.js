// https://www.acmicpc.net/problem/9576
const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 
const [t, ...data] = input.split('\n');
const result = []
let j = 0;
for(let i = 0; i < t; i++) {
	const [n, m] = data[j++].split(' ').map(Number);	
    const ab = data.slice(j, j += m).map(e => e.split(' ').map(Number));
	result.push(solution(n, ab))
}

console.log(result.join('\n'));

function solution(n, ab) {
	const visited = Array(n + 1).fill(false)
	let result = 0
	ab.sort((a, b) => {
		if(a[1] === b[1]) return a[0] - b[0];
		return a[1] - b[1];
	})

	for(const [a, b] of ab) {
		for(let i = a; i <= b; i++) {
			if(visited[i]) continue;
			visited[i] = true;
			result++;
			break;
		}
	}	

	return result;
}