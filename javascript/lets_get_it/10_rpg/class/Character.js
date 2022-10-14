class Character extends Unit {
  constructor(game, name) {
    super(game, name, 50, 0, 10);
    this.level = 1;
  }
  attack(monster) {
    super.attack(monster);
    this.game.changeMonsterStat();
  }
  dead() {
    this.xp = 0;
    this.hp = 1;
    this.game.changeScreen("game");
    this.game.message("사망");
    this.game.changeCharacterStat();
    $menuInput.focus();
  }
  heal(monster) {
    if (this.hp + 20 > this.maxHp) {
      this.hp = this.maxHp;
    } else {
      this.hp += 20;
    }
    this.hp -= monster.att;
    this.game.changeCharacterStat();
  }
  rest() {
    this.hp = this.maxHp;
    this.game.changeCharacterStat();
  }
  win(monster) {
    this.xp += monster.xp;
    if (this.xp >= this.level * 15) {
      this.levelUp();
    }
    this.game.changeCharacterStat();
  }
  levelUp() {
    this.xp -= this.level * 15;
    this.level += 1;
    this.maxHp = 50 + this.level * 10;
    this.att = 7 + this.level * 3;
    this.hp = this.maxHp;
  }
}
