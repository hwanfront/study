// https://school.programmers.co.kr/learn/courses/30/lessons/42883
function solution(number, k) {
  const stack = [];
  
  for(let i = 0; i < number.length; i++) {
      while(k > 0 && stack[stack.length - 1] < number[i]) {
          stack.pop();
          k--;
      }
      stack.push(number[i]);
  }
  
  if(k > 0) {
      stack.splice(stack.length - k, k);
  }
  
  return stack.join('');
}

function solution1(number, k) { // 10 시간초과
  let num = number;
  let cnt = k;
  
  for(let i = 0; i < num.length - 1; i++) {
      if(cnt === 0) break;
      if(Number(num[i]) < Number(num[i + 1])) {
          num = num.slice(0, i) + num.slice(i + 1);
          i -= 2;
          cnt--;
      }
  }
  
  if(cnt > 0) {
      num = num.slice(0, num.length - cnt);
  }
  
  return num;
}