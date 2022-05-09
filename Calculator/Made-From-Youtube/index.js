// DOM Elements
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");

// Szare przyciski
const acEl = document.querySelector(".ac");
const pmEl = document.querySelector(".pm");
const percentEl = document.querySelector(".percent");

// BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG
// BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG
//https://www.youtube.com/watch?v=h6UPzVj1ncI&t=1476s
// Zakończyłem na 52:27
// Przepisać resztę przycisków

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
