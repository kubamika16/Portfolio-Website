// DOM Elements
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");

// Szare przyciski
const acEl = document.querySelector(".ac");
const pmEl = document.querySelector(".pm");
const percentEl = document.querySelector(".percent");

// Pomarańczowe przyciski
const additionEl = document.querySelector(".addition");
const substractionEl = document.querySelector(".substraction");
const multiplicationEl = document.querySelector(".multiplication");
const divisionEl = document.querySelector(".division");
const equalEl = document.querySelector(".equal");

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

// Funkcja która ustawia czas dla kalkulatora
const updateTime = () => {
  const currentTime = new Date();

  // Wyciągnięcie godziny i minuty z obiektu czasu
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  //   Gdybyśmy chcieli zamienić czas z 24h na 12h
  if (currentHour > 12) {
    currentHour -= 12;
  }

  hourEl.textContent = currentHour.toString();
  // funkcja padStart działa tak: jeśli string posiada mniej niż 2 wyrazy, należy wtedy dodać 0 na początku stringu.
  minuteEl.textContent = currentMinute.toString().padStart(2, "0");
};

// Funkcja setInterval pozwala na powtarzanie się danego zadania co jakiś czas. W naszym przypadku co sekundę
setInterval(updateTime, 1000);

// Należy wywołać funkcję 'updateTime' przed 'setInterval', ponieważ 'setInterval' działa DOPIERO po jednej sekundzie
updateTime();
