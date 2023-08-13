function solution(input_string) {
  const answer = [];
  const map = new Map();
  let ps = '';
  for(const s of input_string) {
      if(ps === s) continue;
      ps = s;
      if(map.has(s)) {
          if(!map.get(s)) map.set(s, true);
      } else {
          map.set(s, false);
      }
  }
  map.forEach((v, k) => {
      if(v) answer.push(k);
  })
  answer.sort();
  return answer.length ? answer.join('') : 'N';
}