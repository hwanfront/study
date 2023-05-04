// https://school.programmers.co.kr/learn/courses/30/lessons/42862
function solution(n, lost, reserve) {
  const students = Array(n + 1).fill(0);
  lost.forEach((s) => students[s] -= 1);
  reserve.forEach((s) => students[s] += 1);

  for(let i = 1; i < students.length; i++) {
      if(students[i] !== -1) continue;
      if(students[i - 1] === 1) {
          students[i - 1] -= 1;
          students[i] += 1;
          continue;
      }
      if(students[i + 1] === 1) {
          students[i + 1] -= 1;
          students[i] += 1;
      }
  }
  
  return students.filter((s) => s > -1).length - 1;
}