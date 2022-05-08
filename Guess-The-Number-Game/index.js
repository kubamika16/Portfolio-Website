const checkButton = document.getElementById("checkButton");

const randomNumber = () => Math.floor(Math.random() * 20) + 1;

let random = randomNumber();
console.log(random);
let userValue;
let score = 20;

const scoreDown = () => {
  if (score > 1) {
    score--;
    document.querySelector(".score").textContent = score;
    document.querySelector(".input").value = "";
  } else {
    document.body.style.backgroundColor = "red";
    document.querySelector(".score").textContent = 0;
    checkButton.setAttribute("disabled", "disabled");
  }
};

const focusFunction = () => {
  document.querySelector(".input").focus();
};

const getVal = () => {
  userValue = Number(document.querySelector("input").value);

  //Wygrana
  if (random === userValue) {
    document.querySelector(".start_guessing").textContent = "Great!";
    document.body.style.backgroundColor = "green";

    const highScore = Number(document.querySelector(".highscore").textContent);
    if (score > highScore)
      document.querySelector(".highscore").textContent = score;
  }

  //Liczba za mała
  if (userValue < random) {
    document.querySelector(
      ".start_guessing"
    ).textContent = `Number ${userValue} is too small!`;
    scoreDown();

    focusFunction();
  }

  //Liczba za duża
  if (userValue > random) {
    document.querySelector(
      ".start_guessing"
    ).textContent = `Number ${userValue} is too big!`;
    scoreDown();

    focusFunction();
  }
};

// Gdy wciśnie się klawisz Enter
function enterValue(element) {
  if (event.key === "Enter") {
    getVal();
  }
}

const newGame = () => {
  document.body.style.backgroundColor = "black";
  document.querySelector(".score").textContent = 20;
  score = 20;
  document.querySelector(".input").value = "";
  document.querySelector(".start_guessing").textContent = "Start guessing...";
  random = randomNumber();
  console.log(random);

  focusFunction();
};
