/**
 * querySelector 함수
 * @param {string} selector
 * @returns Element | null
 */
const $ = (selector) => document.querySelector(selector);

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

const character = {
  name: "",
  level: 1,
  maxHp: 50,
  hp: 10,
  xp: 0,
  att: 10,
};

let monster = { name: "", hp: "", xp: "", att: "" };

$nameInput.focus();

const drawStat = () => {
  const { name, level, maxHp, hp, xp, att } = character;
  $heroName.textContent = `이름: ${name}`;
  $heroLevel.textContent = `레벨: ${level}`;
  $heroHp.textContent = `[HP: ${hp} / ${maxHp}]`;
  $heroXp.textContent = `[XP: ${xp} / ${15 * level}]`;
  $heroAtt.textContent = `공격력: ${att}`;
};

const dead = () => {
  character.hp = character.maxHp;
  character.xp = 0;
  $message.textContent = "사망했습니다 (패널티 경험치 감소)";
};

$startScreen.addEventListener("submit", (event) => {
  event.preventDefault();
  const { value } = $nameInput;
  $startScreen.style.display = "none";
  $gameMenu.style.display = "block";
  character.name = value;
  drawStat();
  $menuInput.focus();
});

const drawMonsterStat = () => {
  const { name, hp, att } = monster;
  $monsterName.textContent = name;
  $monsterHp.textContent = `[HP: ${hp}]`;
  $monsterAtt.textContent = `[공격력: ${att}]`;
};

const createMonster = () => {
  const name = "몬스터";
  const hp = Math.floor(10 + Math.random() * 10);
  const xp = Math.floor(1 + Math.random() * 5);
  const att = Math.floor(5 + Math.random() * 5);

  monster = { name, hp, xp, att };
};

const removeMonster = () => {
  monster = { name: "", hp: "", xp: "", att: "" };
};

const adventure = () => {
  $gameMenu.style.display = "none";
  $battleMenu.style.display = "block";
  $battleInput.focus();
  createMonster();
  drawMonsterStat();
};

const rest = () => {
  character.hp = character.maxHp;
  drawStat();
};

const exit = () => {
  $gameMenu.style.display = "none";
  $message.textContent = "게임을 종료했습니다.";
  removeMonster();
};

$gameMenu.addEventListener("submit", (event) => {
  event.preventDefault();
  if ($message.textContent) {
    $message.textContent = "";
  }
  const { value } = $menuInput;
  switch (value) {
    case "1":
      adventure();
      break;
    case "2":
      rest();
      break;
    case "3":
      exit();
      break;
    default:
      break;
  }
  $menuInput.value = "";
});

const levelup = () => {
  character.xp -= character.level * 15;
  character.level++;
  character.maxHp = 50 + character.level * 10;
  character.hp = character.maxHp;
};

const attack = () => {
  monster.hp -= character.att;
  if (monster.hp < 1) {
    character.xp += parseInt(monster.xp);
    if (character.xp >= character.level * 15) {
      levelup();
    }
    createMonster();
    $menuInput.focus();
  }
  character.hp -= monster.att;
  if (character.hp < 1) {
    dead();
    $gameMenu.style.display = "block";
    $battleMenu.style.display = "none";
    removeMonster();
  }
  drawStat();
  drawMonsterStat();
};

const heal = () => {
  if (character.hp + 20 > character.maxHp) {
    character.hp = character.maxHp;
  } else {
    character.hp += 20;
  }
  character.hp -= monster.att;
  drawStat();
  $battleInput.focus();
};

const run = () => {
  $gameMenu.style.display = "block";
  $battleMenu.style.display = "none";
  removeMonster();
  drawMonsterStat();
  $menuInput.focus();
};

$battleMenu.addEventListener("submit", (event) => {
  event.preventDefault();
  const { value } = $battleInput;

  switch (value) {
    case "1":
      attack();
      break;
    case "2":
      heal();
      break;
    case "3":
      run();
      break;
    default:
      break;
  }
  $battleInput.value = "";
});
