let alleWitze = [];   
let restWitze = [];   

// ==== Witze-Datei laden ====
async function ladeWitzeDatei() {
  try {
    const response = await fetch("witze.txt");
    const text = await response.text();
    alleWitze = text.split("\n").filter(line => line.trim() !== "");
    restWitze = [...alleWitze]; // Kopie für Start
  } catch (error) {
    console.error(error);
    alleWitze = ["Kein Witz verfügbar"];
    restWitze = [...alleWitze];
  }
}

// ==== Zufallswitz anzeigen ====
function zeigeZufallsWitz() {
  if (restWitze.length === 0) {
    // Alle durch → neu starten
    restWitze = [...alleWitze];
  }
  const randomIndex = Math.floor(Math.random() * restWitze.length);
  const [witz] = restWitze.splice(randomIndex, 1); // zieht und entfernt
  document.getElementById("witz-container").innerText = witz;
}

// ==== Ablaufsteuerung ====
function setupButtons() {
  const buttons = document.querySelectorAll(".day-btn");

  // Timer-Funktion für gelb-Färbung
  function aktiviereNaechstenButton(index) {
    const nextIndex = index + 1;
    if (nextIndex < buttons.length) {
      setTimeout(() => {
        if (!buttons[nextIndex].classList.contains("clicked")) {
          buttons[nextIndex].style.backgroundColor = "hsla(50, 85%, 50%, 1.00)";
          buttons[nextIndex].classList.add("active");
        }
        aktiviereNaechstenButton(nextIndex);
      }, 300000); // 5 Minuten
    }
  }

  // Timer-Kette starten
  aktiviereNaechstenButton(-1); // beginnt vor dem ersten Button

  let lastClickedIndex = -1; // Index des letzten geklickten Buttons

  // Funktion, um zu prüfen, ob alle Buttons geklickt wurden
  function checkAllButtonsClicked() {
    const allClicked = Array.from(buttons).every(btn => btn.classList.contains("clicked"));
    if (allClicked) {
      console.log("Alle Buttons wurden geklickt! Test erfolgreich.");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      console.log("Noch nicht alle Buttons geklickt.");
    }
  }

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (index === lastClickedIndex + 1) {
        // Vorwärts klicken
        btn.style.backgroundColor = "hsl(143, 85%, 50%)"; // grün
        btn.classList.remove("active");
        btn.classList.add("clicked");
        lastClickedIndex = index;
        zeigeZufallsWitz();
        checkAllButtonsClicked(); // Prüfen nach jedem Klick
      } else if (index === lastClickedIndex) {
        // Rückgängig in Reihenfolge
        btn.style.backgroundColor = ""; // Standardfarbe oder zurück zu gelb, wenn Timer schon abgelaufen
        btn.classList.remove("clicked");
        btn.classList.remove("active"); // falls Timer noch nicht gelb war
        lastClickedIndex = index - 1;
        checkAllButtonsClicked(); // Prüfen nach jedem Rückgängig
      } else {
        // Optional: Meldung, dass man nur vorwärts oder rückwärts klicken darf
        console.log("Bitte den nächsten Button vorwärts oder rückwärts klicken!");
      }
    });
  });
}

// ==== Start ====
ladeWitzeDatei().then(() => {
  setupButtons();
});