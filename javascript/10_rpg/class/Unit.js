class Unit {
  constructor(game, name, hp, xp, att) {
    this.game = game;
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.xp = xp;
    this.att = att;
  }
  attack(unit) {
    unit.hp -= this.att;
  }
  dead() {
    this.hp = 1;
    this.xp = 0;
  }
}
