// BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG
// Gdy wcisnę cyfrę (np. 9), potem znak minusa, a potem % to wychodzi zła liczba. Nie potrafię poprawić tego problemuz

const allButtons = document.querySelectorAll(".button");

const oneNineNumbers = document.querySelectorAll(".number");
const ac = document.querySelector(".ac");
const plusMinus = document.querySelector(".plus_minus");
const result = document.querySelector(".result__number");
const operands = document.querySelectorAll(".operand");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".ac");
const comma = document.querySelector(".comma");
const percentage = document.querySelector(".percentage");
const zero = document.querySelector(".zero");

let firstNumber = [];
let queryOperand;
let secondNumber = [];
let equation = [];

let nextQueryOperand = [];

let pressed = false;

// Praca na operatorach
operands.forEach((arg) => {
  arg.addEventListener("click", () => {
    if (firstNumber.length > 0) {
      // Ta funkcja pozwala na ustawienie poprzedniego białego pola na pomarańczowe
      operands.forEach((e) => {
        e.style.backgroundColor = "rgb(216, 159, 36)";
        e.style.color = "white";
      });

      arg.style.backgroundColor = "white";
      arg.style.color = "rgb(216, 159, 36)";

      if (arg.textContent === "x") queryOperand = "*";
      else queryOperand = arg.textContent;

      // Dodanie kolejnego operatora (niestety włącznie z pierwszym)
      nextQueryOperand.push(queryOperand);
      console.log("Następny operand:", nextQueryOperand);

      console.log("Operator:", queryOperand);

      // Ten if będzie działał tokładnie tak samo jak znak równości
      if (nextQueryOperand.length > 1) {
        // Rozwiązanie równania

        equation = parseFloat(
          eval(
            [firstNumber.join(""), queryOperand, secondNumber.join("")].join("")
          ).toFixed(4)
        );
        console.log("Rezultat:", equation);

        const resultArray = equation.toString().split("");
        // Jeśli wynik będzie miał więcej niż 12 znaków
        if (resultArray.length > 12) {
          // To wtedy czcionka wyniku się zmniejszy
          result.style.fontSize = "80%";
        }

        // Wypisanie wyniku w kalkulatorze
        result.innerHTML = equation;

        firstNumber = equation.toString().split("");
        secondNumber = [];
      }
    }
  });
});

document.addEventListener(
  "DOMContentLoaded",
  function () {
    var buttons = document.querySelectorAll("DIV.button");

    for (var i = 0, max = buttons.length; i < max; i++) {
      buttons[i].addEventListener("click", addPressedClass);
    }

    function addPressedClass(e) {
      var btn = e.target;
      btn.classList.add("pressed");
      setTimeout(function () {
        btn.classList.remove("pressed");
      }, 200);
    }
  },
  false
);

// Gdy wciśnie się liczby od 1/9
oneNineNumbers.forEach((arg) => {
  arg.addEventListener("click", () => {
    // Jeśli operator jest niezdefiniowany (jeśli jeszcze nie wybraliśmy operatora)
    if (typeof queryOperand === "undefined") {
      if (firstNumber.length < 11) {
        // If poniżej pozwala na dodanie wartości '0.', zamiast samego przecinka ('.').
        if (arg.textContent === "." && firstNumber.length === 0) {
          firstNumber.push("0", ".");
          console.log("Pierwsza liczba:", firstNumber);
        } else {
          // Dodawanie cyfry do tablicy
          firstNumber.push(arg.textContent);
          console.log("Pierwsza liczba:", firstNumber);
        }

        // Wyświetlenie całej liczby z tablicy
        result.innerHTML = firstNumber.join("");
      }
    }
    // Jeśli już zdefiniowaliśmy operator
    else {
      if (secondNumber.length < 11) {
        if (arg.textContent === "." && secondNumber.length === 0) {
          secondNumber.push("0", ".");
          console.log("Druga liczba:", secondNumber);
        } else {
          // Jeśli już zdefiniowaliśmy operator to robimy to samo co z pierwszą liczbą, tylko tym razem robimy to z drugą
          secondNumber.push(arg.textContent);
          console.log("Druga liczba:", secondNumber);
        }
        result.innerHTML = secondNumber.join("");
      }
    }
  });
});

// Praca na znaku 'równa się'
equal.addEventListener("click", () => {
  if (firstNumber.length > 0 && secondNumber.length > 0) {
    // Zniknięcie białego pola operacji gdy kliknie się znak równa się
    operands.forEach((e) => {
      e.style.backgroundColor = "rgb(216, 159, 36)";
      e.style.color = "white";
    });

    // Rozwiązanie równania

    equation = parseFloat(
      eval(
        [firstNumber.join(""), queryOperand, secondNumber.join("")].join("")
      ).toFixed(4)
    );

    console.log("Rezultat:", equation);

    const resultArray = equation.toString().split("");
    // Jeśli wynik będzie miał więcej niż 12 znaków
    if (resultArray.length > 12) {
      // To wtedy czcionka wyniku się zmniejszy
      result.style.fontSize = "80%";
    }

    // Wypisanie wyniku w kalkulatorze
    result.innerHTML = equation;

    // Ustawienie braku operatora, oraz pierwszego numeru jako rezultatu
    queryOperand = undefined;
    firstNumber = equation.toString().split("");
    secondNumber = [];
  }
});

// Praca na znaku AC (usuwanie wartości)
clear.addEventListener("click", () => {
  result.textContent = 0;
  firstNumber = [];
  queryOperand = undefined;
  secondNumber = [];
  equation = [];

  operands.forEach((e) => {
    e.style.backgroundColor = "rgb(216, 159, 36)";
    e.style.color = "white";
  });

  result.style.fontSize = "100%";
});

// let count = 0;

// firstNumber.forEach((element) => {
//   if (element === ".") {
//     count++;
//   }
// });

comma.addEventListener("click", () => {
  if (typeof queryOperand === "undefined") {
    if (!firstNumber.includes(".")) {
      if (firstNumber.length === 0) {
        firstNumber.push("0", ".");
      } else {
        firstNumber.push(".");
      }
    }
    result.innerHTML = firstNumber.join("");
  } else {
    if (!secondNumber.includes(".")) {
      if (secondNumber.length === 0) {
        secondNumber.push("0", ".");
      } else {
        secondNumber.push(".");
      }
    }
    result.innerHTML = secondNumber.join("");
  }
});

// Praca na przycisku który zmienia wartość z dodatniej na ujemną i odwrotnie
plusMinus.addEventListener("click", () => {
  // Praca na pierwszej liczbie
  if (typeof queryOperand === "undefined") {
    // Jeśli istnieje pierwsza liczba (to wtedy dopiero będziemy mogli dodać plus/minus)
    if (firstNumber.length > 0) {
      if (!firstNumber.includes("-")) {
        firstNumber.unshift("-");
        result.innerHTML = firstNumber.join("");
        console.log("Pierwsza liczba:", firstNumber);
      } else {
        firstNumber.shift();
        result.innerHTML = firstNumber.join("");
      }
    }
    // Praca na drugiej liczbie (po wyznaczeniu operatora)
  } else {
    // Jeśli istnieje druga liczba (to wtedy dopiero będziemy mogli dodać plus/minus)
    if (secondNumber.length > 0) {
      if (!secondNumber.includes("-")) {
        secondNumber.unshift("-");
        result.innerHTML = secondNumber.join("");
      } else {
        secondNumber.shift();
        result.innerHTML = secondNumber.join("");
      }
    }
  }
});

percentage.addEventListener("click", () => {
  if (typeof queryOperand === "undefined") {
    if (firstNumber.length !== 0) {
      if (!firstNumber.includes(".")) {
        if (firstNumber.length === 1) {
          firstNumber.unshift("0", ".", "0");
        } else if (firstNumber.length === 2) {
          firstNumber.unshift("0", ".");
        } else if (firstNumber.length > 2) {
          firstNumber.splice(-2, 0, ".");
        }
        result.innerHTML = firstNumber.join("");
      } else {
        if (firstNumber.length === 4) {
          firstNumber.splice(
            firstNumber.indexOf("."),
            firstNumber.indexOf(".")
          );

          firstNumber.unshift("0", ".", "0");
        } else if (
          (firstNumber[0] === "0" &&
            firstNumber[1] === "." &&
            firstNumber[2] === "0") ||
          (firstNumber[0] === "0" && firstNumber[1] === ".")
        ) {
          firstNumber.splice(2, 0, "0");
          firstNumber.splice(2, 0, "0");
        } else if (firstNumber.length === 5) {
          firstNumber.splice(
            firstNumber.indexOf("."),
            firstNumber.indexOf(".") - 1
          );
          firstNumber.unshift("0", ".");
        } else if (firstNumber.length > 5) {
          const comma = firstNumber.indexOf(".");
          // Noice
          firstNumber = firstNumber.filter((value) => value != ".");

          if (comma - 2 === 0) {
            firstNumber.unshift("0");
            firstNumber.splice(comma - 1, 0, ".");
            console.log("AHA");
          } else if (comma - 2 === -1) {
            firstNumber.unshift("0", ".", "0");
          } else {
            firstNumber.splice(comma - 2, 0, ".");
          }
        }
      }

      console.log("Pierwsza liczba", firstNumber);
      result.innerHTML = firstNumber.join("");
    }
  } else {
    if (secondNumber.length !== 0) {
      if (!secondNumber.includes(".")) {
        if (secondNumber.length === 1) {
          secondNumber.unshift("0", ".", "0");
        } else if (secondNumber.length === 2) {
          secondNumber.unshift("0", ".");
        } else if (secondNumber.length > 2) {
          secondNumber.splice(-2, 0, ".");
        }
        result.innerHTML = secondNumber.join("");
      } else {
        if (secondNumber.length === 4) {
          secondNumber.splice(
            secondNumber.indexOf("."),
            secondNumber.indexOf(".")
          );

          secondNumber.unshift("0", ".", "0");
        } else if (
          (secondNumber[0] === "0" &&
            secondNumber[1] === "." &&
            secondNumber[2] === "0") ||
          (secondNumber[0] === "0" && secondNumber[1] === ".")
        ) {
          secondNumber.splice(2, 0, "0");
          secondNumber.splice(2, 0, "0");
        } else if (secondNumber.length === 5) {
          secondNumber.splice(
            secondNumber.indexOf("."),
            secondNumber.indexOf(".") - 1
          );
          secondNumber.unshift("0", ".");
        } else if (secondNumber.length > 5) {
          const comma = secondNumber.indexOf(".");
          // Noice
          secondNumber = secondNumber.filter((value) => value != ".");

          if (comma - 2 === 0) {
            secondNumber.unshift("0");
            secondNumber.splice(comma - 1, 0, ".");
            console.log("AHA");
          } else if (comma - 2 === -1) {
            secondNumber.unshift("0", ".", "0");
          } else {
            secondNumber.splice(comma - 2, 0, ".");
          }
        }

        result.innerHTML = secondNumber.join("");
      }
    }
  }
});

zero.addEventListener("click", () => {
  if (typeof queryOperand === "undefined") {
    if (firstNumber.length !== 0) {
      firstNumber.push("0");
      result.innerHTML = firstNumber.join("");
    }
  } else {
    if (secondNumber.length !== 0) {
      secondNumber.push("0");
      result.innerHTML = secondNumber.join("");
    }
  }
});

let s = "haha string concat go ";
console.log(s);
s = s + "brrrrrr";
console.log(s);
