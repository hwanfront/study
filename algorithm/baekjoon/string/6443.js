// https://www.acmicpc.net/problem/6443
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3
abc
acba
aaaaaaaaaa
abcdesgqwegpojaposhh`;
const [N, ...words] = input.split('\n');

solution(Number(N), words);

function solution(N, words) {
  let check;
  let nowWord;
  let res = [];
  
  const dfs = (str) => {
    if(str.length === nowWord.length) {
      res.push(str);
      return;
    }

    for(let i = 0; i < check.length; i++) {
      if(check[i] === 0) continue;
      check[i]--;
      str += String.fromCharCode('a'.charCodeAt() + i);
      dfs(str);
      check[i]++;
      str = str.slice(0, str.length - 1);
    }
  }

  words.forEach((word) => {
    res = [];
    nowWord = word;
    check = Array(26).fill(0);
    for(const str of word) {
      check[str.charCodeAt() - 'a'.charCodeAt()]++;
    }
    dfs('');
    console.log(res.join('\n'));
  })
}
