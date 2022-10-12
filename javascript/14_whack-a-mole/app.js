const $$gopher = document.querySelectorAll(".gopher");
const $$bomb = document.querySelectorAll(".bomb");
const $timer = document.querySelector("#timer");
const $score = document.querySelector("#score");
const $start = document.querySelector("#start");

let holes;
let startTime;
let interval;
let score;
const maxIime = 60;
const TYPE = {
  empty: 0,
  gopher: 1,
  bomb: 2,
  dead: 3,
  boom: 4,
};

$$gopher.forEach(($gopher, index) => {
  $gopher.addEventListener("click", (event) => {
    holes[index] = TYPE.dead;
    if (!event.target.classList.contains("dead")) {
      score += 2;
    }
    setTimeout(() => {
      holes[index] = TYPE.empty;
      draw();
    }, 1000);
    draw();
  });
});

$$bomb.forEach(($bomb, index) => {
  $bomb.addEventListener("click", () => {
    holes[index] = TYPE.boom;
    if (!event.target.classList.contains("boom")) {
      score -= 1;
    }
    setTimeout(() => {
      holes[index] = TYPE.empty;
      draw();
    }, 1000);
    draw();
  });
});

$start.addEventListener("click", start);

function start() {
  resetData();
  startGame();
}

function resetData() {
  holes = new Array(9).fill(0);
  startTime = null;
  interval = null;
  score = 0;
}

function createRandomData() {
  const randomHoles = holes.map((hole) =>
    hole ? hole : Math.floor(Math.random() * 3)
  );
  holes = randomHoles;
  setTimeout(() => {
    randomHoles.forEach((hole, index) => {
      if (
        hole > 0 &&
        (holes[index] === TYPE.gopher || holes[index] === TYPE.bomb)
      ) {
        holes[index] = 0;
      }
    });
    draw();
  }, 1000);
}

function draw() {
  holes.forEach((hole, index) => {
    if (hole === TYPE.empty) {
      $$gopher[index].className = "gopher hidden";
      $$bomb[index].className = "bomb hidden";
    }
    if (hole === TYPE.gopher) {
      $$gopher[index].className = "gopher";
    }
    if (hole === TYPE.bomb) {
      $$bomb[index].className = "bomb";
    }
    if (hole === TYPE.dead) {
      $$gopher[index].className = "gopher dead hidden";
    }
    if (hole === TYPE.boom) {
      $$bomb[index].className = "bomb boom hidden";
    }
  });
  $score.textContent = score;
}

function startTimer() {
  startTime = new Date();
  interval = setInterval(() => {
    const time = maxIime - Math.floor((new Date() - startTime) / 1000);
    createRandomData();
    draw();
    $timer.textContent = time;
    if (time === 0) {
      clearInterval(interval);
      alert(`게임종료 ${score} 점`);
      $start.addEventListener("click", start);
    }
  }, 50);
}

function startGame() {
  $start.removeEventListener("click", start);
  startTimer();
}
