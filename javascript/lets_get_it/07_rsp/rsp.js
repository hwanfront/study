const $computer = document.querySelector("#computer");
const $scissors = document.querySelector("#scissors");
const $rock = document.querySelector("#rock");
const $paper = document.querySelector("#paper");
const $score = document.querySelector("#score");
const IMG_URL = "./rsp.png";
$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = `auto 200px`;

$computer.style.backgroundPositionX = "165px";

const rspX = {
  rock: "-228px",
  scissors: "0px",
  paper: "165px",
};

let computer = "scissors";
let score = Number($score.textContent);

const runRsp = () => {
  switch (computer) {
    case "rock":
      computer = "scissors";
      break;
    case "scissors":
      computer = "paper";
      break;
    case "paper":
      computer = "rock";
      break;
    default:
      break;
  }
  $computer.style.backgroundPositionX = rspX[computer];
};

let interval = setInterval(runRsp, 50);

const clickButton = (event) => {
  const choice = event.target.id;
  if (choice === "rock") {
    if (computer === "rock") $score.textContent = `${score} 무승부`;
    if (computer === "scissors") $score.textContent = `${--score} 패배`;
    if (computer === "paper") $score.textContent = `${++score} 승리`;
  }
  if (choice === "scissors") {
    if (computer === "rock") $score.textContent = `${--score} 패배`;
    if (computer === "scissors") $score.textContent = `${score} 무승부`;
    if (computer === "paper") $score.textContent = `${++score} 승리`;
  }
  if (choice === "paper") {
    if (computer === "rock") $score.textContent = `${++score} 승리`;
    if (computer === "scissors") $score.textContent = `${--score} 패배`;
    if (computer === "paper") $score.textContent = `${score} 무승부`;
  }
  $scissors.removeEventListener("click", clickButton);
  $rock.removeEventListener("click", clickButton);
  $paper.removeEventListener("click", clickButton);
  clearInterval(interval);

  setTimeout(() => {
    $scissors.addEventListener("click", clickButton);
    $rock.addEventListener("click", clickButton);
    $paper.addEventListener("click", clickButton);
    interval = setInterval(runRsp, 50);
  }, 1000);
};

$scissors.addEventListener("click", clickButton);
$rock.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);
