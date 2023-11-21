// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `9`;
console.log(solution(input));

function solution(input) {
  const arr2 = [0,0,9,189,2889,38889,488889,5888889,68888889,788888889,8888888889];
  const arr = Array.from({length: 11}, (_, i) => i * (10 ** (i - 1)));
  const len = input.length;
  const result = [arr2[len]];
  
  for(let i = 1; i <= 9; i++) {
    result.push(arr[len]);
  }

  for(let i = 0; i < len; i++) {
    const d = len - i - 1;
    let num = +input[i];
    for(let j = 9; j >= 0; j--) {
      if(j <= num) break;
      for(let k = 0; k <= 9; k++) {
        result[k] -= arr[d];
      }
      result[j] -= 10 ** d;
    }
  }

  for(let i = 0; i < len; i++) {
    for(let j = i + 1; j < len; j++) {
      const d = len - j - 1;
      result[input[i]] -= (9 - input[j]) * 10 ** d;
    }
  }

  return result.join(' ');
}

console.log(test(+input));

function test(input) {
  const arr = Array(10).fill(0);
  for(let i = 1; i <= input; i++) {
   for (const n of i.toString()) {
    arr[n]++;
   }
  }

  return arr.join(' ');
}
/*
1 -> 0 1 0 0 0 0 0 0 0 0
2 -> 0 1 1 0 0 0 0 0 0 0
3 -> 0 1 1 1 0 0 0 0 0 0
4 -> 0 1 1 1 1 0 0 0 0 0
5 -> 0 1 1 1 1 1 0 0 0 0
6 -> 0 1 1 1 1 1 1 0 0 0
7 -> 0 1 1 1 1 1 1 1 0 0
8 -> 0 1 1 1 1 1 1 1 1 0
9 -> 0 1 1 1 1 1 1 1 1 1
10 -> 1 2 1 1 1 1 1 1 1 1
11 -> 1 4 1 1 1 1 1 1 1 1
12 -> 1 5 2 1 1 1 1 1 1 1
88 -> 8 19 19 19 19 19 19 19 19 9
99 -> 9 20 20 20 20 20 20 20 20 20
999 -> 189 300 300 300 300 300 300 300 300 300
9999 -> 2889 4000 4000 4000 4000 4000 4000 4000 4000 4000
89999 -> 34889 46000 46000 46000 46000 46000 46000 46000 46000 36000
99999 -> 38889 50000 50000 50000 50000 50000 50000 50000 50000 50000
779999 -> 380889 492000 492000 492000 492000 492000 492000 472000 382000 382000
789999 -> 384889 496000 496000 496000 496000 496000 496000 486000 396000 386000
799999 -> 388889 500000 500000 500000 500000 500000 500000 500000 400000 400000
889999 -> 434889 546000 546000 546000 546000 546000 546000 546000 536000 436000
899999 -> 438889 550000 550000 550000 550000 550000 550000 550000 550000 450000
999999 -> 488889 600000 600000 600000 600000 600000 600000 600000 600000 600000
9999999 -> 5888889 7000000
99999999 -> 68888889 80000000
999999999 -> 788888889 900000000
9999999999 -> 8888888889 10000000000
*/