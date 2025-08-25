const popup = document.getElementById("namePopup");
const input = document.getElementById("username");
const saveBtn = document.getElementById("saveName");

function saveName() {
  let name = input.value.trim();

  // Wenn nichts eingegeben wurde, setze "Witzeliste"
  if (!name) {
    name = "Witzeliste";
  }

  localStorage.setItem("moodlistName", name); // Im Browser speichern
  window.location.href = "liste.html";        // Weiterleiten
}

// Öffnen des Popups
document.getElementById("openPopup").addEventListener("click", () => {
  popup.style.display = "flex";
  input.focus(); // Cursor direkt im Feld
});

// Klick auf Speichern
saveBtn.addEventListener("click", saveName);

// Enter im Input-Feld
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    saveName();
  }
});

  // Exit-Button schließt Popup
  document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("namePopup");
    const closeBtn = document.querySelector(".closePopup");

    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  });