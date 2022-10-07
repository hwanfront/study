const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");

let timeoutId;
let startTime;
const records = [];
const screen = {
  waiting: {
    classList: "waiting",
    textContent: "클릭해서 시작하세요",
  },
  ready: {
    classList: "ready",
    textContent: "초록색이 되면 클릭하세요",
  },
  fast: {
    classList: "waiting",
    textContent: "너무 빨랐습니다",
  },
  now: {
    classList: "now",
    textContent: "클릭하세요!",
  },
};

const changeScreen = (type) => {
  $screen.classList = screen[type].classList;
  $screen.textContent = screen[type].textContent;
};

$screen.addEventListener("click", () => {
  if ($screen.classList.contains("waiting")) {
    const randNum = Math.floor((Math.random() * 3 + 1) * 1000);
    timeoutId = setTimeout(() => {
      changeScreen("now");
      startTime = new Date();
    }, randNum);
    changeScreen("ready");
    return;
  }
  if ($screen.classList.contains("ready")) {
    clearTimeout(timeoutId);
    changeScreen("fast");
    return;
  }
  if ($screen.classList.contains("now")) {
    const gap = new Date() - startTime;
    records.push(gap);
    const average = records.reduce((pre, cur) => pre + cur, 0) / records.length;
    $result.textContent = `반응속도 ${gap}ms 평균 ${average}ms`;
    changeScreen("waiting");
  }
});
