const $body = document.body;
const $table = document.createElement("table");
const $result = document.createElement("span");
const $turn = document.createElement("span");
const table = [];
let turn = "O";

$turn.textContent = `턴: ${turn}`;

const checkGameResult = (target) => {
  const rowIdx = target.parentNode.rowIndex;
  const colIdx = target.cellIndex;

  if (
    table[rowIdx][0].textContent === turn &&
    table[rowIdx][1].textContent === turn &&
    table[rowIdx][2].textContent === turn
  ) {
    return true;
  }

  if (
    table[0][colIdx].textContent === turn &&
    table[1][colIdx].textContent === turn &&
    table[2][colIdx].textContent === turn
  ) {
    return true;
  }

  if (
    table[0][0].textContent === turn &&
    table[1][1].textContent === turn &&
    table[2][2].textContent === turn
  ) {
    return true;
  }
  if (
    table[0][2].textContent === turn &&
    table[1][1].textContent === turn &&
    table[2][0].textContent === turn
  ) {
    return true;
  }

  return false;
};

const clickTable = (event) => {
  const textContent = event.target.textContent;
  if (textContent !== "") {
    return;
  }
  event.target.textContent = turn;
  if (checkGameResult(event.target)) {
    $result.textContent = `${turn} 승리`;
    $table.removeEventListener("click", clickTable);
    return alert(`${turn} 승리!!`);
  }
  const isDraw = table.flat().every((cell) => cell.textContent);
  if (isDraw) {
    $result.textContent = "무승부";
    return;
  }
  $turn.textContent = `턴: ${turn}`;
  turn = turn === "O" ? "X" : "O";
};

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement("tr");
  const row = [];

  for (let j = 0; j < 3; j++) {
    const $td = document.createElement("td");
    row.push($td);
    $tr.appendChild($td);
  }
  table.push(row);
  $table.appendChild($tr);
}

$table.addEventListener("click", clickTable);

$body.insertAdjacentElement("afterbegin", $result);
$body.insertAdjacentElement("afterbegin", $table);
$body.insertAdjacentElement("afterbegin", $turn);
