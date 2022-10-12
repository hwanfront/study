const $table = document.querySelector("#table");
const $score = document.querySelector("#score");
let data = [];
let score = 0;

function start() {
  data = [];
  drawTable();
  create2ToRandomCell();
  draw();
}

function checkResult() {
  const flatData = data.flat();
  if (flatData.includes(2048)) {
    alert("승리");
    return;
  }
  if (!flatData.includes(0)) {
    alert(`패배 ${score}점`);
  }
}

function drawTable() {
  const $fragment = document.createDocumentFragment();

  for (let i = 0; i < 4; i++) {
    const $tr = document.createElement("tr");
    const rowData = [];
    for (let j = 0; j < 4; j++) {
      const $td = document.createElement("td");
      $tr.appendChild($td);
      rowData.push(0);
    }
    $fragment.appendChild($tr);
    data.push(rowData);
  }
  $table.appendChild($fragment);
}

function create2ToRandomCell() {
  const emptyCell = [];

  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      if (!cellData) {
        emptyCell.push([i, j]);
      }
    });
  });

  const cellIndex = emptyCell[Math.floor(Math.random() * emptyCell.length)];
  data[cellIndex[0]][cellIndex[1]] = 2;
}

function draw() {
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      const $td = $table.children[i].children[j];
      if (cellData < 1) {
        $td.textContent = "";
        $td.className = "";
      } else {
        $td.textContent = cellData;
        $td.className = `color-${cellData}`;
      }
    });
  });
  $score.textContent = score;
}

function isSameData(newData) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (data[i][j] !== newData[i][j]) {
        // 기존 데이터와 변경된 데이터가 다를경우
        data = newData;
        return false;
      }
    }
  }
  return true;
}

function up() {
  const newData = [[], [], [], []];

  for (let i = 0; i < 4; i++) {
    const newRowData = [];
    for (let j = 0; j < 4; j++) {
      if (data[j][i]) {
        if (newRowData[newRowData.length - 1] !== data[j][i]) {
          // 다르면 push
          newRowData.push(data[j][i]);
        } else {
          // 같으면 값을 더함
          score += data[j][i];
          newRowData[newRowData.length - 1] += data[j][i];
        }
      }
    }
    const length = newRowData.length;

    for (let i = 0; i < 4 - length; i++) {
      newRowData.push(0);
    }
    newRowData.forEach((cellData, index) => {
      newData[index].push(cellData);
    });
  }

  if (isSameData(newData)) {
    return;
  }
  create2ToRandomCell();
  checkResult();
  draw();
}

function down() {
  const newData = [[], [], [], []];

  for (let i = 0; i < 4; i++) {
    const newRowData = [];
    for (let j = 0; j < 4; j++) {
      if (data[3 - j][i]) {
        if (newRowData[newRowData.length - 1] !== data[3 - j][i]) {
          // 다르면 push
          newRowData.push(data[3 - j][i]);
        } else {
          // 같으면 값을 더함
          score += data[3 - j][i];
          newRowData[newRowData.length - 1] += data[3 - j][i];
        }
      }
    }
    const length = newRowData.length;

    for (let i = 0; i < 4 - length; i++) {
      newRowData.push(0);
    }
    newRowData.reverse();
    newRowData.forEach((cellData, index) => {
      newData[index].push(cellData);
    });
  }

  if (isSameData(newData)) {
    return;
  }
  create2ToRandomCell();
  checkResult();
  draw();
}

function left() {
  const newData = [];

  for (let i = 0; i < 4; i++) {
    const newRowData = [];
    for (let j = 0; j < 4; j++) {
      if (data[i][j]) {
        if (newRowData[newRowData.length - 1] !== data[i][j]) {
          // 다르면 push
          newRowData.push(data[i][j]);
        } else {
          // 같으면 값을 더함
          score += data[i][j];
          newRowData[newRowData.length - 1] += data[i][j];
        }
      }
    }
    const length = newRowData.length;

    for (let i = 0; i < 4 - length; i++) {
      newRowData.push(0);
    }

    newData.push(newRowData);
  }

  if (isSameData(newData)) {
    return;
  }
  create2ToRandomCell();
  checkResult();
  draw();
}

function right() {
  const newData = [];

  for (let i = 0; i < 4; i++) {
    const newRowData = [];
    for (let j = 0; j < 4; j++) {
      if (data[i][3 - j]) {
        if (newRowData[newRowData.length - 1] !== data[i][3 - j]) {
          // 다르면 push
          newRowData.push(data[i][3 - j]);
        } else {
          // 같으면 값을 더함
          score += data[i][3 - j];
          newRowData[newRowData.length - 1] += data[i][3 - j];
        }
      }
    }

    const length = newRowData.length;

    for (let i = 0; i < 4 - length; i++) {
      newRowData.push(0);
    }

    newRowData.reverse();
    newData.push(newRowData);
  }

  if (isSameData(newData)) {
    return;
  }
  create2ToRandomCell();
  checkResult();
  draw();
}

window.addEventListener("keyup", (event) => {
  const { key } = event;
  switch (key) {
    case "ArrowUp":
      up();
      break;
    case "ArrowDown":
      down();
      break;
    case "ArrowLeft":
      left();
      break;
    case "ArrowRight":
      right();
      break;
    default:
      return;
  }
});
let startPos;
window.addEventListener("mousedown", (event) => {
  startPos = [event.clientX, event.clientY];
});
window.addEventListener("mouseup", (event) => {
  const endPos = [event.clientX, event.clientY];
  const diffX = endPos[0] - startPos[0];
  const diffY = endPos[1] - startPos[1];
  if (diffY < 0 && Math.abs(diffX) < Math.abs(diffY)) {
    up();
  } else if (diffY > 0 && Math.abs(diffX) < Math.abs(diffY)) {
    down();
  } else if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
    left();
  } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
    right();
  }
});

start();
