// Funkcja która pozwala na zrobienie CZEGOŚ gdy uzytkownik na stronie będzie scrollował
// By to zrobić potrzebne są dwie rzeczy
// Najpierw ogarnąć w którą stronę uzytkownik chciałby scrollować. Na dół lub do góry
// Potem gdy komputer będzie znał tą informację to przejdzie do następnej sekcji automatycznie

document.lastScrollPosition = 0;
document.lastCentered = 0;
document.onWayTo = null;

document.addEventListener("scroll", () => {
  // Getting direction. Do do this the current scroll position has to be compared with previous scroll position

  //   If pageYOffset (current position where we are on a page) is bigger than a document.lastScrollPosition (position where we were before) that means we're going down, otherwise up
  const direction =
    window.pageYOffset - document.lastScrollPosition > 0 ? "down" : "up";
  console.log(direction);

  //   Getting to know on what section is current user right now
  const sections = [...document.querySelectorAll("section")];
  console.log(sections);

  //   Mamy juz cos takiego jak zwracanie up/down, gdy uzytkownik scrolluje na dół i do góry. Teraz, jeśli scrolluje do góry, to doc.lastCentered, czyli aktualny numer sekcji będzie miał wartość o 1 mniejszą (czyli wartość poprzedniej sekcji)
  const destIndex =
    direction === "up" ? document.lastCentered - 1 : document.lastCentered + 1;

  // Jeśli wykonywana jest funkcja scrollowania (np. na dół) to wystarczy ze działa ona raz, nie 100 razy na sekundę
  if (document.onWayTo === null) {
    // Jeśli numer sekcji do której ma być przejście jest większy od 0 (bo przeciez nie moze być mniejszy), oraz mniejszy od ilości sekcji (bo nie moze być większy) to wtedy
    if (destIndex >= 0 && destIndex < sections.length) {
      document.onWayTo = destIndex;

      //Zastosowana jest funkcja scrollowania na daną sekcję
      window.scroll(0, sections[destIndex].offsetTop);
    }
  }

  sections.forEach((section, index) => {
    //   offsetTop returns the top position (in pixels) of a section
    // So if the current scroll position is in the same position as the beginning of certain section
    if (window.pageYOffset === section.offsetTop) {
      // That means our variable (lastCentered) will have a index number of the section
      document.lastCentered = index;
      console.log(document.lastCentered);

      //   Dla kazdej sekcji, gdy juz tam będziemy, wartość zostaje ustawiona na 'active'. Pozwoli to w css na ustawienie napisów które pojawiają się w kazdej sekcji dopiero wtedy, gdy cała sekcja obejmie wielkość ekranu.
      section.className = "active";

      //   Jeśli wylądowaliśmy w danej sekcji i zadanie zostało wykonane, to zmienna 'onWayTo' powinna być ustawiona na null
      if (document.onWayTo === index) {
        document.onWayTo = null;
      }
    } else {
      section.className = "";
    }
  });

  // There will be data about position scrolled last
  document.lastScrollPosition = window.pageYOffset;
  console.log(document.lastScrollPosition);
});
