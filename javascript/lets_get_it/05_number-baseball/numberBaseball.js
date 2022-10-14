const $form = document.querySelector("#form");
const $input = document.querySelector("#input");
const $logs = document.querySelector("#logs");
const answer = [];
let chance = 10;

for (let i = 0; i < 4; i++) {
  while (1) {
    const randNum = Math.floor(Math.random() * 10);
    if (!answer.includes(randNum)) {
      answer.push(randNum);
      break;
    }
  }
}

$input.focus();

$form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = $input.value;
  let included = 0;
  let strike = 0;

  chance--;

  if (isNaN(Number(value))) {
    return alert("숫자가 아닌 글자가 포합되어 있습니다!");
  }

  if (value.length !== 4) {
    return alert("네 개의 숫자를 입력해주세요.");
  }

  for (let i = 0; i < value.length; i++) {
    if (value.lastIndexOf(value[i]) !== i) {
      return alert("중복된 숫자가 있습니다.");
    }

    if (answer.includes(parseInt(value[i]))) {
      included++;
    }
    if (answer[i] === parseInt(value[i])) {
      strike++;
    }
  }

  if (strike === 4) {
    return alert(`${value} 정답입니다!`);
  }

  if (chance < 1) {
    return alert(`패배했습니다.`);
  }

  alert(`볼: ${included - strike}, 스트라이크: ${strike}`);
  $logs.insertAdjacentHTML(
    "afterbegin",
    `<span>${value} 볼: ${included - strike}, 스트라이크: ${strike}</span>`
  );
  $input.value = "";
});

$input.addEventListener("input", (event) => {
  if (event.target.value.length > 4) {
    const value = event.target.value;
    event.target.value = value.slice(0, 4);
  }
});
