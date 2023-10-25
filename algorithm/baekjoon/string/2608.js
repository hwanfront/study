// https://www.acmicpc.net/problem/2608
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 
const input = `DLIII
MCMXL`;
const r = input.split('\n');

console.log(solution(r))

function solution ([r1, r2]) {
  const value = {
    I: 1, // ~3
    V: 5, // ~1 // IV: 4
    X: 10, // ~3 // IX: 9
    L: 50, // 1 // XL: 40
    C: 100, // ~3 // XC: 90
    D: 500, // 1 // CD: 400
    M: 1000, // ~3 // CM: 900
  }

  const calc = (r) => {
    let sum = 0;
    let tmp = null;

    for(let i = 0; i < r.length; i++) {
      if(tmp === 'I' && ['V', 'X'].includes(r[i])) {
        sum += value[r[i]] - value[tmp] * 2;
        continue;
      }
  
      if(tmp === 'X' && ['L', 'C'].includes(r[i])) {
        sum += value[r[i]] - value[tmp] * 2;
        tmp = r[i];
        continue;
      }
  
      if(tmp === 'C' && ['D', 'M'].includes(r[i])) {
        sum += value[r[i]] - value[tmp] * 2;
        continue;
      }

      sum += value[r[i]];
      tmp = r[i];
    }

    return sum;
  }

  const convert = (num) => {
    let result = '';
    
    result += 'M'.repeat(Math.floor(num / 1000));
    num %= 1000;
    result += 'CM'.repeat(Math.floor(num / 900));
    num %= 900;
    result += 'D'.repeat(Math.floor(num / 500));
    num %= 500;
    result += 'CD'.repeat(Math.floor(num / 400));
    num %= 400;
    result += 'C'.repeat(Math.floor(num / 100));
    num %= 100;
    result += 'XC'.repeat(Math.floor(num / 90));
    num %= 90;
    result += 'L'.repeat(Math.floor(num / 50));
    num %= 50;
    result += 'XL'.repeat(Math.floor(num / 40));
    num %= 40;
    result += 'X'.repeat(Math.floor(num / 10));
    num %= 10;
    result += 'IX'.repeat(Math.floor(num / 9));
    num %= 9;
    result += 'V'.repeat(Math.floor(num / 5));
    num %= 5;
    result += 'IV'.repeat(Math.floor(num / 4));
    num %= 4;
    result += 'I'.repeat(Math.floor(num));
    
    return result; 
  }

  const result1 = calc(r1) + calc(r2);
  const result2 = convert(result1);

  return `${result1}\n${result2}`
}