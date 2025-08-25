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

function setupButtons() {
  const buttons = document.querySelectorAll(".day-btn");

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("active")) {
        // === Aktivieren ===
        if (index === 0 || buttons[index - 1].classList.contains("active")) {
          btn.classList.add("active");
          zeigeZufallsWitz(); // nur beim Aktivieren
        } else {
          console.log("Bitte erst den vorherigen Button anklicken!");
        }
      } else {
        // === Deaktivieren ===
        if (index === buttons.length - 1 || !buttons[index + 1].classList.contains("active")) {
          btn.classList.remove("active");
        } else {
          console.log("Bitte erst die folgenden Buttons deaktivieren!");
        }
      }
    });
  });
}



    ladeWitzeDatei().then(() => {
      setupButtons();
    });