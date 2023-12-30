// https://www.acmicpc.net/problem/22859
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `<main><div title="title   name_1"><p>   paragraph  1       </p><br> <p>paragraph 2 <diving>Italic Tag</diving> <br > </p><p>paragraph 3 <b>Bold Tag</b> end.</p></div><div title="title_name_2"><p>paragraph 4</p><p>paragraph 5 <i>Italic Tag 2</i> <br > end.</p></div></main>`;
console.log(solution(input));

function solution (html) {
  let result = '';
  const r1 = new RegExp(/<div title=".+?<\/div>/g);
  const r2 = new RegExp(/<p>.+?<\/p>/g);
  const r3 = new RegExp(/<div title=".+?">/);
  const r4 = new RegExp(/(<div title=")|(">)/g);
  const r5 = new RegExp(/<.+?>/g);
  const r6 = new RegExp(/ +/g);
  const paragraphs = html.match(r1);
  for(const paragraph of paragraphs) {
    const title = paragraph.match(r3).toString().replace(r4, '');
    const p = paragraph.match(r2).map(e => e.replace(r5, '').replace(r6, ' ').trim());

    result += `title : ${title}\n${p.join('\n')}\n`;
  }

  return result.trim();
}