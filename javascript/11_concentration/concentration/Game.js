class Game {
  constructor() {
    this.cards = cardColors.map((color, index) => new Card(this, color, index));
    this.select = [];
    this.complete = [];
    this.start();
  }
  start() {
    this.cards.forEach((card, i) => {
      setTimeout(() => card.flip(), i * 200);
    });
    setTimeout(() => {
      this.cards.forEach((card) => card.unFlip());
    }, this.cards.length * 200 + 1000);
  }
  selectCard(id) {
    this.select.push(id);
    if (this.select.length === 1) {
      this.cards[id].flip();
      return "select";
    }
    const [firstIndex, secondIndex] = this.select;
    const firstCard = this.cards[firstIndex];
    const secondCard = this.cards[secondIndex];
    const firstColor = firstCard.color;
    const secondColor = secondCard.color;
    firstCard.flip();
    secondCard.flip();
    if (firstColor === secondColor) {
      this.success();
      return "success";
    }
    setTimeout(() => {
      firstCard.unFlip();
      secondCard.unFlip();
    }, 1000);
    this.fail();
    return "fail";
  }
  success() {
    this.complete = [...this.complete, ...this.select];
    if (this.complete.length === this.cards.length) {
      this.win();
    }
    this.select = [];
  }
  fail() {
    this.select = [];
  }
  win() {
    setTimeout(() => {
      alert(`축하합니다`);
    }, 1000);
  }
}
