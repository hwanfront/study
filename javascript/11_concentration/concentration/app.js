const $wrapper = document.querySelector("#wrapper");
const defaultColors = ["red", "orange", "yellow", "green", "white", "pink"];
let colors = defaultColors.concat(defaultColors);
let cardColors = [];

function shuffle() {
  for (let i = 0; colors.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    cardColors = cardColors.concat(colors.splice(randomIndex, 1));
  }
}
function start() {
  shuffle();
  const game = new Game();
}

start();
