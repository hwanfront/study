class Game {
  constructor(name) {
    this.monster = null;
    this.character = new Character(this, name);
    this.start();
  }
  start() {
    $gameMenu.addEventListener("submit", this.onGameMenuInput);
    $battleMenu.addEventListener("submit", this.onGameBattleInput);
    this.changeScreen("game");
    this.changeCharacterStat();
    $menuInput.focus();
  }
  onGameMenuInput(event) {
    console.log(this);
    event.preventDefault();
    if ($message.textContent) {
      $message.textContent = "";
    }
    const { value } = $menuInput;
    switch (value) {
      case "1":
        this.adventure();
        break;
      case "2":
        this.rest();
        break;
      case "3":
        this.exit();
        break;
      default:
        break;
    }
    $menuInput.value = "";
  }
  onGameBattleInput = (event) => {
    event.preventDefault();
    const { value } = $battleInput;
    switch (value) {
      case "1":
        this.attack();
        break;
      case "2":
        this.heal();
        break;
      case "3":
        this.run();
        break;
      default:
        break;
    }
    $battleInput.value = "";
  };
  changeScreen(screen) {
    switch (screen) {
      case "start":
        $startScreen.style.display = "block";
        $gameMenu.style.display = "none";
        $battleMenu.style.display = "none";
        break;
      case "game":
        $startScreen.style.display = "none";
        $gameMenu.style.display = "block";
        $battleMenu.style.display = "none";
        break;
      case "battle":
        $startScreen.style.display = "none";
        $gameMenu.style.display = "none";
        $battleMenu.style.display = "block";
        break;
    }
  }
  adventure() {
    this.monster = new Monster(this);
    this.changeScreen("battle");
    this.changeMonsterStat();
    $battleInput.focus();
  }
  rest() {
    this.character.rest();
  }
  exit() {
    this.changeScreen("start");
    $nameInput.focus();
  }
  attack() {
    this.character.attack(this.monster);
    if (this.monster.hp <= 0) {
      this.character.win(this.monster);
      this.monster = new Monster(this);
    } else {
      this.monster.attack(this.character);
      if (this.character.hp <= 0) {
        this.character.dead();
        this.monster = null;
      }
    }
    this.changeMonsterStat();
  }
  heal() {
    this.character.heal(this.monster);
  }
  run() {
    this.changeScreen("game");
    this.monster = null;
    this.changeMonsterStat();
    $menuInput.focus();
  }
  changeCharacterStat() {
    const { name, level, hp, xp, maxHp, att } = this.character;
    $heroName.textContent = `이름: ${name}`;
    $heroLevel.textContent = `레벨: ${level}`;
    $heroHp.textContent = `[HP: ${hp} / ${maxHp}]`;
    $heroXp.textContent = `[XP: ${xp} / ${15 * level}]`;
    $heroAtt.textContent = `공격력: ${att}`;
  }
  changeMonsterStat() {
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent = "";
      $monsterHp.textContent = "";
      $monsterAtt.textContent = "";
      return;
    }
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  }
  message(message) {
    $message.textContent = message;
  }
}
