const $form = document.querySelector("#form");
const $rowInput = document.querySelector("#row");
const $cellInput = document.querySelector("#cell");
const $mineInput = document.querySelector("#mine");
const $timer = document.querySelector("#timer");
const $tbody = document.querySelector("#table tbody");
const $result = document.querySelector("#result");

let mineData = []; // [[1, 0...], ...] 지뢰: 1
let row = null;
let cell = null;
let mine = null;
let checkCnt = 0;
let time = null;
let overTime = null;
let timerId = null;

function start() {
  time = new Date();
  timerId = setInterval(() => {
    const nowTime = new Date();
    overTime = (nowTime - time) / 1000;
    $timer.textContent = `${Math.floor(overTime)}초`;
  }, 50);
  mineData = [];
  clearTable();
  setMineData();
  drawTable();
}

function clearTable() {
  checkCnt = 0;
  while ($tbody.childNodes.length) {
    $tbody.removeChild(document.querySelector("tr"));
  }
}

function setMineData() {
  const posCnt = row * cell;
  const pos = Array(posCnt)
    .fill()
    .map((_, i) => i);
  const shuffle = [];
  while (pos.length > posCnt - mine) {
    const minePos = pos.splice(Math.floor(Math.random() * pos.length), 1)[0];
    shuffle.push(minePos);
  }
  for (let i = 0; i < row; i++) {
    const rowData = [];
    for (let j = 0; j < row; j++) {
      rowData.push(0);
    }
    mineData.push(rowData);
  }
  for (let i = 0; i < shuffle.length; i++) {
    const r = Math.floor(shuffle[i] / cell);
    const c = shuffle[i] % cell;
    mineData[r][c] = 1;
  }
}

function countMine(rowIndex, cellIndex) {
  const px = [-1, -1, -1, 0, 0, 1, 1, 1];
  const py = [-1, 0, 1, -1, 1, -1, 0, 1];
  let cnt = 0;

  for (let i = 0; i < 8; i++) {
    if (mineData[rowIndex + px[i]]?.[cellIndex + py[i]]) {
      cnt++;
    }
  }
  return cnt;
}

function checkMine(target, rowIndex, cellIndex) {
  if (target.classList.contains("opened")) {
    return;
  }
  const mineCnt = countMine(rowIndex, cellIndex);
  target.classList.add("opened");
  checkCnt++;
  if (mineCnt) {
    target.textContent = mineCnt;
  } else {
    const px = [-1, -1, -1, 0, 0, 1, 1, 1];
    const py = [-1, 0, 1, -1, 1, -1, 0, 1];
    setTimeout(() => {
      for (let i = 0; i < 8; i++) {
        const newRowIndex = rowIndex + px[i];
        const newCellIndex = cellIndex + py[i];
        const newTarget = $tbody.children[newRowIndex]?.children[newCellIndex];

        if ($tbody.children[newRowIndex]?.children[newCellIndex]) {
          checkMine(newTarget, newRowIndex, newCellIndex);
        }
      }
    }, 0);
  }
}

const leftClick = (rowIndex, cellIndex) => (event) => {
  const { textContent } = event.target;
  if (textContent === "#" || textContent === "?") {
    return;
  }
  if (mineData[rowIndex][cellIndex] === 1) {
    event.target.textContent = "X";
    alert("지뢰입니다!");
    return;
  } else {
    checkMine(event.target, rowIndex, cellIndex);
  }
  if (checkCnt === row * cell - mine) {
    clearInterval(timerId);
    timerId = null;
    alert(`축하합니다! ${overTime} 초`);
  }
};

function rightClick(event) {
  event.preventDefault();
  const { textContent } = event.target;
  if (textContent === "X") {
    return;
  }
  if (textContent === "#") {
    event.target.textContent = "?";
    event.target.classList.remove("flag");
    event.target.classList.add("question");
  } else if (textContent === "?") {
    event.target.textContent = "";
    event.target.classList.remove("question");
  } else {
    event.target.textContent = "#";
    event.target.classList.add("flag");
  }
}

function drawTable() {
  for (let i = 0; i < row; i++) {
    const $tr = document.createElement("tr");
    for (let j = 0; j < cell; j++) {
      const $td = document.createElement("td");
      $td.addEventListener("click", leftClick(i, j));
      $td.addEventListener("contextmenu", rightClick);
      $tr.appendChild($td);
    }
    $tbody.appendChild($tr);
  }
}

$form.addEventListener("submit", (event) => {
  event.preventDefault();
  const rowNum = parseInt($rowInput.value);
  const cellNum = parseInt($cellInput.value);
  const mineNum = parseInt($mineInput.value);
  if (isNaN(rowNum) || isNaN(cellNum) || isNaN(mineNum)) {
    return alert("숫자가 아닌 글자가 포함되어 있습니다");
  }
  if (rowNum * cellNum <= mineNum) {
    return alert("지뢰가 너무 많습니다");
  }
  if (rowNum < 1 || cellNum < 1 || mineNum < 1) {
    return alert("0 보다 큰 수를 입력해주세요");
  }
  row = rowNum;
  cell = cellNum;
  mine = mineNum;
  start();
});
