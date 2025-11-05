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
      
      // Special Mode: Link öffnen
      const specialMode = localStorage.getItem("specialMode") === "true";
      if (specialMode) {
        // Nach kurzer Verzögerung Link öffnen (damit Konfetti sichtbar ist)
        setTimeout(() => {
          window.open("https://youtu.be/St7ny38gLp4?si=946zGBk1AKYJHmZX&t=11", "_blank");
          // Oder für gleichen Tab: window.location.href = "https://...";
        }, 0);
      }
    } else {
      console.log("Noch nicht alle Buttons geklickt.");
    }
  }

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (index === lastClickedIndex + 1) {
        // Vorwärts klicken
        btn.style.backgroundColor = "hsla(150, 100%, 50%, 1.00)"; // grün
        btn.classList.remove("active");
        btn.classList.add("clicked");
        lastClickedIndex = index;
        zeigeZufallsWitz();

        handleButtonClick(btn);

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

function handleButtonClick(button) {
  const specialMode = localStorage.getItem("specialMode") === "true";
  
  if (specialMode) {
    // GIF Container erstellen und anzeigen
    const gifContainer = document.createElement('div');
    gifContainer.style.position = 'absolute';
    gifContainer.style.top = '50%';
    gifContainer.style.left = '50%';
    gifContainer.style.transform = 'translate(-50%, -50%)';
    gifContainer.style.zIndex = '1000';
    
    const gif = document.createElement('img');
    gif.src = '../img/boom.gif'; // Hier dein GIF-Pfad
    gif.style.width = '200px'; // Anpassen nach Bedarf
    gif.style.height = 'auto';
    
    gifContainer.appendChild(gif);
    button.style.position = 'relative';
    button.appendChild(gifContainer);
    
    // Nach GIF-Dauer (z.B. 2 Sekunden) zum Bild wechseln
    setTimeout(() => {
      gifContainer.remove(); // GIF entfernen
      
      // Bild anzeigen
      const imageContainer = document.createElement('div');
      imageContainer.style.position = 'absolute';
      imageContainer.style.top = '50%';
      imageContainer.style.left = '50%';
      imageContainer.style.transform = 'translate(-50%, -50%)';
      imageContainer.style.zIndex = '1000';
      
      const image = document.createElement('img');
      image.src = '../img/speed-moon.png'; // Hier dein Bild-Pfad
      image.style.width = '70px'; // Anpassen nach Bedarf
      image.style.height = 'auto';
      
      imageContainer.appendChild(image);
      button.appendChild(imageContainer);

    }, 1000); // GIF für 2 Sekunden (Dauer anpassen!)
  }
}

// ==== Start ====
ladeWitzeDatei().then(() => {
  setupButtons();
});