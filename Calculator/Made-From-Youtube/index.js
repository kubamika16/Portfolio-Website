////////////////////////////////////////////////////////////////
// DOM Elements
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const valueEl = document.querySelector(".value");

////////////////////////////////////////////////////////////////
// Szare przyciski
const acEl = document.querySelector(".ac");
const pmEl = document.querySelector(".pm");
const percentEl = document.querySelector(".percent");

////////////////////////////////////////////////////////////////
// Pomarańczowe przyciski
const additionEl = document.querySelector(".addition");
const substractionEl = document.querySelector(".substraction");
const multiplicationEl = document.querySelector(".multiplication");
const divisionEl = document.querySelector(".division");
const equalEl = document.querySelector(".equal");

////////////////////////////////////////////////////////////////
// Cyfy
const decimalEl = document.querySelector(".decimal");
const number0El = document.querySelector(".number-0");
const number1El = document.querySelector(".number-1");
const number2El = document.querySelector(".number-2");
const number3El = document.querySelector(".number-3");
const number4El = document.querySelector(".number-4");
const number5El = document.querySelector(".number-5");
const number6El = document.querySelector(".number-6");
const number7El = document.querySelector(".number-7");
const number8El = document.querySelector(".number-8");
const number9El = document.querySelector(".number-9");
const numberElArray = [
  number0El,
  number1El,
  number2El,
  number3El,
  number4El,
  number5El,
  number6El,
  number7El,
  number8El,
  number9El,
];

////////////////////////////////////////////////////////////////
// Zmienne

// Ta zmienna pozwala na zapisanie w pamięci rezultatu z poprzedniego działania, gdy np. ponownie klikalibyśmy kolejny operand
let valueStrInMemory = null;
// Zmienna operatora którą wcisnęliśmy
let operatorInMemory = null;

////////////////////////////////////////////////////////////////
// Funkcje

//Funkcja która zwraca rezultat z ekranu
const getValueAsStr = () => {
  const currentValueStr = valueEl.textContent;
  // Zwracanie rezultatu. Najpierw liczba zostaje podzielona przecinkami i wrzucona do tablicy, a potem połączona. Pozwala to na usunięcie przecinków. Koniec końców przecinki zostaną dodane na ekran przez kod kilka linijek niżej (tam gdzie jest .toLocaleString() )
  return currentValueStr.split(",").join("");
};

// Funkcja która pozwala zamienić zmienną typu String na zmienną typu liczbowego
const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

// Funkcja która pozwala na ustawienie wartości rezultatu, zmieniając go jednocześnie na liczbę, dodając przecinki
const setStrAsValue = (valueStr) => {
  // Jeśli ostatnim wyrazem który wcisnęliśmy był przecinek
  if (valueStr[valueStr.length - 1] === ".") {
    // Do wyniku doda się przecinek
    valueEl.textContent += ".";
    return;
  }

  // Praca na działaniu po przecinku (.toLocaleString() działa dziwnie po przecinku, więc trzeba to naprawić)
  const [wholeNumStr, decimalStr] = valueStr.split(".");
  if (decimalStr) {
    valueEl.textContent =
      parseFloat(wholeNumStr).toLocaleString() + "." + decimalStr;
  } else {
    valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

// Funkcja która działa po wciśnięciu cyfr 0-9
const handleNumberClick = (numStr) => {
  // Przy każdymm kliknięciu w daną cyfrę, cyfra zapisywana jest do zmiennej 'currentValueStr'
  const currentValueStr = getValueAsStr();

  // Jeśli rezultat na ekranie zawiera tylko cyfrę 0
  if (currentValueStr === "0") {
    // To usuwa się to zero i zamienia na wciśniętą cyfrę
    setStrAsValue(numStr);
  } else {
    // Zamiana wartości rezultatu. Wynik w rezultacie, dodać 'numStr' czyli cyfrę która została wciśnięta
    // parseFloat() zamienia string na liczbę, dzięki temu .toLocaleString() dodaje przecinek po każdych 3 cyfrach
    setStrAsValue(currentValueStr + numStr);
  }
};

// Funkcja która wykonuje obliczenia dwóch liczb
const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNum();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === "addition") {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === "substraction") {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === "multiplication") {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === "division") {
    newValueNum = valueNumInMemory / currentValueNum;
  }

  return newValueNum.toString();
};

// Funkcja która pomaga na pracy przy dzieleniu, mnożeniu, odejmowaniu i dodawaniu
const handleOperatorClick = (operation) => {
  const currentValueStr = getValueAsStr();

  // Gdy wciśniemy znak operandu, a nie było jeszcze żadnej zapisanej wartości (gdy nie było zapisanej pierwszej liczby)
  if (!valueStrInMemory) {
    // Pobieramy liczbę z rezultatu i zapisujemy ją w zmiennej 'valueStrInMemory'
    valueStrInMemory = currentValueStr;
    // Zapisanie danego wciśniętego operatora
    operatorInMemory = operation;
    // Ustawienie w rezultacie znaku zero (jest to znak że możemy teraz wpisać drugą liczbę do działania)
    setStrAsValue("0");
    return;
  }

  // Zapisanie naszego działania (zamiana go na string)
  valueStrInMemory = getResultOfOperationAsStr();
  // Ustawienie operatora
  operatorInMemory = operation;
  // Zresetowanie wyświetlanego wyniku
  setStrAsValue("0");
};

////////////////////////////////////////////////////////////////
// Praca na Event Listenerach

// Praca na przycisku 'AC' (resetowanie danych )
acEl.addEventListener("click", () => {
  setStrAsValue("0");
  valueStrInMemory = null;
  operatorInMemory = null;
});

// Praca na przycisku plus/minus
pmEl.addEventListener("click", () => {
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();

  if (currentValueStr === "-0") {
    setStrAsValue("0");
    return;
  }

  if (currentValueNum >= 0) {
    setStrAsValue("-" + currentValueStr);
  } else {
    setStrAsValue(currentValueStr.substring(1));
  }
});

// Praca na przycisku procenta
percentEl.addEventListener("click", () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());

  valueNumInMemory = null;
  operatorInMemory = null;
});

////////////////////////////////////////////////////////////////
// Praca na Operatorach (pomarańczowe przyciski)

// Praca na operatorze dodawania
additionEl.addEventListener("click", () => {
  handleOperatorClick("addition");
});

// Praca na operatorze odejmowania
substractionEl.addEventListener("click", () => {
  handleOperatorClick("substraction");
});

// Praca na operatorze mnożenia
multiplicationEl.addEventListener("click", () => {
  handleOperatorClick("multiplication");
});

// Praca na operatorze dzielenia
divisionEl.addEventListener("click", () => {
  handleOperatorClick("division");
});

// Praca na operatorze znaku 'równa się'
equalEl.addEventListener("click", () => {
  // Gdy posiadamy już zapisane wartości, wykonujemy działania (dodawanie, odejmowanie, itd.)
  if (valueStrInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null;
    operatorInMemory = null;
  }
});

// Dodanie funkcji 'addEventListener' do każdego przycisku cyfr
for (let i = 0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];

  numberEl.addEventListener("click", () => {
    handleNumberClick(i.toString());
  });
}

// Praca na przycisku przecinka
decimalEl.addEventListener("click", () => {
  const currentValueStr = getValueAsStr();

  if (!currentValueStr.includes(".")) {
    setStrAsValue(currentValueStr + ".");
  }
});

////////////////////////////////////////////////////////////////
// Czas
// Funkcja która ustawia czas dla kalkulatora
const updateTime = () => {
  const currentTime = new Date();

  // Wyciągnięcie godziny i minuty z obiektu czasu
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  //   Gdybyśmy chcieli zamienić czas z 24h na 12h
  // if (currentHour > 12) {
  //   currentHour -= 12;
  // }

  hourEl.textContent = currentHour.toString();
  // funkcja padStart działa tak: jeśli string posiada mniej niż 2 wyrazy, należy wtedy dodać 0 na początku stringu.
  minuteEl.textContent = currentMinute.toString().padStart(2, "0");
};

// Funkcja setInterval pozwala na powtarzanie się danego zadania co jakiś czas. W naszym przypadku co sekundę
setInterval(updateTime, 1000);

// Należy wywołać funkcję 'updateTime' przed 'setInterval', ponieważ 'setInterval' działa DOPIERO po jednej sekundzie
updateTime();

// Rozwiązanie działań poprzez klawiaturę
document.addEventListener("keydown", (e) => {
  console.log(e.key);
  // Gdy na klawiaturze wciśnie się znaki od 1 do 9
  const numberEl = Number(e.key);
  if (numberEl >= 0 && numberEl <= 9) {
    console.log(numberEl);
    handleNumberClick(numberEl.toString());
  }

  // BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG
  // Dokończyć działania w kalkulatorze za pomocą klawiatury

  // Gdy na klawiaturze wciśnie się poszczególne znaki (operatorów itd.)
  switch (e.key) {
    case "Enter":
      if (valueStrInMemory) {
        setStrAsValue(getResultOfOperationAsStr());
        valueStrInMemory = null;
        operatorInMemory = null;
      }
      break;
    case "Backspace":
      setStrAsValue("0");
      valueStrInMemory = null;
      operatorInMemory = null;
      break;
    case "+":
      console.log("Wcisnąłeś plus");
      break;
    case "-":
      console.log("Wcisnąłeś minus");
      break;
    case "*":
      console.log("Wcisnąłeś mnożenie");
      break;
    case "/":
      console.log("Wcisnąłeś dzielenie");
      break;
  }
});
