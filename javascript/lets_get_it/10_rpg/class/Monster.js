const nameList = ["슬라임", "스켈레톤", "고블린", "마왕"];

class Monster extends Unit {
  constructor(game) {
    const name = nameList[Math.floor(Math.random() * nameList.length)];
    const randNum = Math.floor(Math.random() * 10);
    const hp = Math.floor(10 + Math.random() * 10 * randNum);
    const xp = Math.floor(1 + Math.random() * 5 * randNum);
    const att = Math.floor(5 + Math.random() * 5 * randNum);
    super(game, name, hp, xp, att);
    this.level = 1;
  }
  attack(unit) {
    super.attack(unit);
    this.game.changeCharacterStat();
  }
}
