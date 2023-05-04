// https://school.programmers.co.kr/learn/courses/30/lessons/42860
// A => 0
// N => 13
// Z => 1
function calculate(char) {
  const code = char.charCodeAt();
  if(code <= 'N'.charCodeAt()) return code - 'A'.charCodeAt();
  return 13 - (code - 'N'.charCodeAt());
}

function solution(name) {
  let result = 0;
  let min = name.length;
  
  for(let i = 0; i < name.length; i++) {
      result += calculate(name[i]);
  }
  
  for(let i = 0; i < name.length; i++) {
      let to = i + 1;
      while(to < name.length && name[to] === 'A') {
          to += 1;
      }
      min = Math.min(min, i * 2 + name.length - to);
      min = Math.min(min, (name.length - to) * 2 + i);
  }
  
  return min + result;
}