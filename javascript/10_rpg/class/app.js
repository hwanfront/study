const $startScreen = $("#start-screen");
const $nameInput = $("#name-input");

const $heroStat = $("#hero-stat");
const $heroName = $("#hero-name");
const $heroLevel = $("#hero-level");
const $heroHp = $("#hero-hp");
const $heroXp = $("#hero-xp");
const $heroAtt = $("#hero-att");

const $monsterName = $("#monster-name");
const $monsterHp = $("#monster-hp");
const $monsterAtt = $("#monster-att");

const $gameMenu = $("#game-menu");
const $menuInput = $("#menu-input");

const $battleMenu = $("#battle-menu");
const $battleInput = $("#battle-input");

const $message = $("#message");

let game = null;
$nameInput.focus();

$startScreen.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $nameInput.value;
  game = new Game(name);
  $nameInput.value = "";
});
