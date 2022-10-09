class Card {
  constructor(game, color, id) {
    this.id = id;
    this.game = game;
    this.color = color;
    this.flipped = false;
    this.$card = this.createCard();
    this.createClickEvent();
    $wrapper.appendChild(this.$card);
  }
  createCard() {
    const $card = document.createElement("div");
    const $cardInner = document.createElement("div");
    const $cardFront = document.createElement("div");
    const $cardBack = document.createElement("div");
    $card.classList.add("card");
    $cardInner.classList.add("card-inner");
    $cardFront.classList.add("card-front");
    $cardBack.classList.add("card-back");
    $cardBack.style.background = this.color;
    $cardInner.appendChild($cardFront);
    $cardInner.appendChild($cardBack);
    $card.appendChild($cardInner);
    return $card;
  }
  createClickEvent() {
    this.$card.addEventListener("click", this.onSelectCard);
  }
  removeClickEvent() {
    this.$card.removeEventListener("click", this.onSelectCard);
  }
  onSelectCard = () => {
    this.game.selectCard(this.id);
  };
  flip() {
    this.$card.classList.add("flipped");
    this.removeClickEvent();
  }
  unFlip() {
    this.$card.classList.remove("flipped");
    this.createClickEvent();
  }
}
