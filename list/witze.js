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

  // Hilfsfunktion: aktiviert den nächsten Button nach 5min und setzt die Kette fort
  function aktiviereNaechstenButton(index) {
    const nextIndex = index + 1;
    if (nextIndex < buttons.length) {
      setTimeout(() => {
        if (!buttons[nextIndex].classList.contains("clicked")) {
          buttons[nextIndex].style.backgroundColor = "hsla(50, 85%, 50%, 1.00)";
          buttons[nextIndex].classList.add("active");

          // NACHDEM dieser Button gelb wurde, Timer für den nächsten starten
          aktiviereNaechstenButton(nextIndex);
        }
      }, 300000); // 5 Minuten = 300.000 ms
    }
  }

  // **Ersten Button jetzt erst nach 5min aktivieren**
  setTimeout(() => {
    if (!buttons[0].classList.contains("clicked")) {
      buttons[0].style.backgroundColor = "hsla(50, 85%, 50%, 1.00)";
      buttons[0].classList.add("active");

      // Kette von diesem Button aus starten
      aktiviereNaechstenButton(0);
    }
  }, 300000); // 5 Minuten

  // Klick-Logik
  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) {
        btn.style.backgroundColor = "hsl(143, 85%, 50%)"; // grün
        btn.classList.remove("active");
        btn.classList.add("clicked");

        zeigeZufallsWitz();
      }
    });
  });
}



// ==== Start ====
ladeWitzeDatei().then(() => {
  setupButtons();
});
