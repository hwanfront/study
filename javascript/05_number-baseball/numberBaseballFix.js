const $form = document.querySelector("#form");
const $input = document.querySelector("#input");
const $logs = document.querySelector("#logs");

const numbers = Array(10)
  .fill()
  .map((_, idx) => idx);
const answer = [];
let chance = 10;

for (let i = 0; i < 4; i++) {
  const index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}

$input.focus();

function checkInput(input) {
  if (isNaN(Number(input))) {
    alert("숫자가 아닌 글자가 포합되어 있습니다!");
    return;
  }

  if (input.length !== 4) {
    alert("네 개의 숫자를 입력해주세요.");
    return;
  }

  if (new Set(input).size !== 4) {
    alert("중복된 숫자가 있습니다.");
    return;
  }

  return true;
}

$form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = $input.value;
  let included = 0;
  let strike = 0;

  if (!checkInput(value)) {
    return;
  }

  chance--;

  for (let i = 0; i < value.length; i++) {
    if (answer.includes(parseInt(value[i]))) {
      included++;
    }
    if (answer[i] === parseInt(value[i])) {
      strike++;
    }
  }

  if (strike === 4) {
    alert(`${value} 정답입니다!`);
    return;
  }

  if (chance < 1) {
    $logs.insertAdjacentHTML(
      "afterbegin",
      `<span>패배하셨습니다! 정답은 ${value}</span>`
    );
    return;
  }

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
