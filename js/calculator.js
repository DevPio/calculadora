let operations = [];
const buttons = document.querySelectorAll(".op");
const result = document.querySelector(".result");
const totalDom = document.querySelector("#total");
const acumulador = document.querySelector("#accumulator");
const clear = document.querySelector("#clear");
let concaDom = "";
let numConcat = "";

buttons.forEach((item) => {
  item.addEventListener("click", (event) => {
    const operacaoMoment = event.target.textContent;

    if (realizarConcatenacao(operacaoMoment)) {
      operations.push(numConcat);
      operations.push(operacaoMoment);

      numConcat = "";
    }

    if (!realizarConcatenacao(operacaoMoment)) {
      numConcat += operacaoMoment;
    }

    acumulador.innerHTML += operacaoMoment;
  });
});

result.addEventListener("click", realizarOperacao);

function realizarConcatenacao(op) {
  switch (op) {
    case "+":
      return true;
      break;
    case "-":
      return true;
      break;
    case "x":
      return true;
      break;
    case "/":
      return true;
      break;

    default:
      return false;
      break;
  }
}

function respeiTaOpe(op) {
  for (let index = 0; index < op.length; index++) {
    if (op[index] == "x") {
      op[index] = calc(op[index - 1], "x", op[index + 1]);
      op.splice(index + 1, 1);
      op.splice(index - 1, 1);
    }

    if (op[index] == "/") {
      op[index] = calc(op[index - 1], "/", op[index + 1]);
      op.splice(index + 1, 1);
      op.splice(index - 1, 1);
    }
  }

  return op;
}

function realizarOperacao() {
  if (!isNaN(numConcat) && numConcat != "") {
    operations.push(numConcat);
  }

  if (isNaN(operations[operations.length - 1])) {
    operations.pop();
  }

  operations = respeiTaOpe(operations);

  let total = 0;
  let currentNum = null;
  let action = null;

  if (operations.length > 1) {
    operations.forEach((item) => {
      if (!isNaN(item) && !currentNum) {
        currentNum = item;
      } else if (isNaN(item)) {
        action = item;
      } else if (action && currentNum) {
        total = calc(currentNum, action, item);
        action = null;
      }

      if (total > 0) {
        if (!isNaN(item) && currentNum) {
          currentNum = total;
        } else if (isNaN(item)) {
          action = item;
        } else if (action && currentNum) {
          total = calc(currentNum, action, item);
        }
      }
    });
  } else {
    total = operations[operations.length - 1];
  }

  totalDom.innerHTML = `${total}`;
  totalDom.removeAttribute("hidden");
}

function calc(currentNum, action, ultNum) {
  switch (action) {
    case "+":
      return Number(currentNum) + Number(ultNum);
      break;
    case "-":
      return Number(currentNum) - Number(ultNum);
      break;
    case "x":
      return Number(currentNum) * Number(ultNum);
      break;
    case "/":
      return Number(currentNum) / Number(ultNum);
      break;

    default:
      return false;
      break;
  }
}

clear.addEventListener("click", () => {
  totalDom.innerHTML = ``;
  totalDom.setAttribute("hidden", "");
  acumulador.innerHTML = "";
  concaDom = "";
  numConcat = "";
  operations = [];
});
