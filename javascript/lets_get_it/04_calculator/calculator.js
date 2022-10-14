let firstNum = "";
let secondNum = "";
let operator = "";
const $operator = document.querySelector("#operator");
const $result = document.querySelector("#result");

const onClickNum = (event) => {
  const id = event.target.id;
  const num = id[id.length - 1];

  if (!operator) {
    if (num === "0" && !firstNum) {
      return;
    }
    firstNum += num;
    $result.value = firstNum;
  } else {
    if (num === "0" && !secondNum) {
      return;
    }
    secondNum += num;
    $result.value = secondNum;
  }
};

const onClickOperator = (event) => {
  const id = event.target.id;

  switch (id) {
    case "plus":
      operator = "+";
      break;
    case "minus":
      operator = "-";
      break;
    case "multiply":
      operator = "*";
      break;
    case "divide":
      operator = "/";
      break;
  }
  $operator.value = operator;
};

const onClickCalculate = () => {
  if (!operator) {
    firstNum = "";
    return;
  }

  switch (operator) {
    case "+":
      firstNum = parseInt(firstNum) + parseInt(secondNum);
      break;
    case "-":
      firstNum -= secondNum;
      break;
    case "*":
      firstNum *= secondNum;
      break;
    case "/":
      firstNum /= secondNum;
      break;
  }

  secondNum = "";
  operator = "";
  $result.value = firstNum;
  $operator.value = "";
};

const onClickClear = () => {
  firstNum = "";
  secondNum = "";
  operator = "";
  $result.value = "";
  $operator.value = "";
};

document.querySelector("#num-1").addEventListener("click", onClickNum);
document.querySelector("#num-2").addEventListener("click", onClickNum);
document.querySelector("#num-3").addEventListener("click", onClickNum);
document.querySelector("#num-4").addEventListener("click", onClickNum);
document.querySelector("#num-5").addEventListener("click", onClickNum);
document.querySelector("#num-6").addEventListener("click", onClickNum);
document.querySelector("#num-7").addEventListener("click", onClickNum);
document.querySelector("#num-8").addEventListener("click", onClickNum);
document.querySelector("#num-9").addEventListener("click", onClickNum);
document.querySelector("#num-0").addEventListener("click", onClickNum);

document.querySelector("#plus").addEventListener("click", onClickOperator);
document.querySelector("#minus").addEventListener("click", onClickOperator);
document.querySelector("#multiply").addEventListener("click", onClickOperator);
document.querySelector("#divide").addEventListener("click", onClickOperator);
document
  .querySelector("#calculate")
  .addEventListener("click", onClickCalculate);
document.querySelector("#clear").addEventListener("click", onClickClear);
