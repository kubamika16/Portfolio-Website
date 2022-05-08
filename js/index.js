const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");

navToggle.addEventListener("click", () => {
  // Gdy klikniemy w klasę nav-toggle (przycisk  prawym górnym rogu) doda się do niej klasa 'nav-open'
  document.body.classList.toggle("nav-open");
});

// Gdy przyciśniemy na daną rzecz w rozwiniętym panelu (Home/My Services/About Me/My Work) to strona przesuwa się do danego miejsca a panel rozwinięty znika
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});
