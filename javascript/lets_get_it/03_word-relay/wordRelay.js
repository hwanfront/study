const playerCount = Number(prompt("참여 인원", 2)); // 플레이어 수
const $order = document.querySelector("#order");
const $word = document.querySelector("#word");
const $input = document.querySelector("input");
const $button = document.querySelector("button");

const answers = []; // 제시어 목록
let player = 1; // 현재 플레이어
let answer = ""; // 정답

$input.focus();

const isCorrectAnswer = (prevAnswer, nowAnswer) =>
  prevAnswer[prevAnswer.length - 1] !== nowAnswer[0];

const onSubmitAnswer = () => {
  if ($input.value.length < 2) {
    return alert("두 글자 이상 입력해주세요!");
  }
  if (answers.length) {
    const prevAnswer = answers[answers.length - 1];

    if (isCorrectAnswer(prevAnswer, answer)) {
      return alert("틀렸습니다!");
    }
    if (answers.includes(answer)) {
      return alert("중복단어입니다!");
    }
  }

  if (player === playerCount) {
    player = 1;
  } else {
    player += 1;
  }

  answers.push(answer);
  $order.textContent = player;
  $word.textContent = answer;

  $input.value = "";
  $input.focus();
};

const onClickEnter = (callback) => (event) => {
  // Enter 입력 시 callback 실행
  if (event.keyCode === 13) {
    callback();
  }
};

const onChangeInput = (event) => {
  answer = event.target.value;
};

$button.addEventListener("click", onSubmitAnswer);
$input.addEventListener("keydown", onClickEnter(onSubmitAnswer));
$input.addEventListener("input", onChangeInput);
