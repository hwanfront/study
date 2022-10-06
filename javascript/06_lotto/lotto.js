const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");
const color = [
  { background: "red", text: "white" },
  { background: "orange", text: "black" },
  { background: "yellow", text: "black" },
  { background: "blue", text: "white" },
  { background: "green", text: "white" },
  { background: "black", text: "white" },
];
const numbers = Array(45)
  .fill()
  .map((_, i) => i + 1);
const result = [];
let i = 0;

for (let i = 0; i < 7; i++) {
  const index = Math.floor(Math.random() * numbers.length);
  result.push(numbers[index]);
  numbers.splice(index, 1);
}

result.sort((a, b) => a - b);

const getBallElement = (number) => {
  const $ball = document.createElement("div");
  const ballColor = color[Math.floor(Math.random() * color.length)];
  $ball.className = "ball";
  $ball.textContent = number;
  $ball.style.backgroundColor = ballColor.background;
  $ball.style.color = ballColor.text;
  return $ball;
};

const interval = setInterval(() => {
  if (i === 6) {
    $bonus.appendChild(getBallElement(result[i]));
    clearInterval(interval);
    return;
  }
  $result.appendChild(getBall(result[i]));
  i++;
}, 1000);
