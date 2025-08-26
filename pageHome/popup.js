const popup = document.getElementById("namePopup");
const input = document.getElementById("username");
const saveBtn = document.getElementById("saveName");
const closeBtn = document.querySelector(".closePopup");

// Funktion: Speichern und weiterleiten
function saveName() {
  let name = input.value.trim();

  // Wenn nichts eingegeben wurde → Standardname
  if (!name) {
    name = "Witzeliste";
  }

  // Im Browser speichern
  localStorage.setItem("moodlistName", name);

  // Weiterleiten zur nächsten Seite
  window.location.href = "pageListe/liste.html";
}

// Öffnen des Popups
document.getElementById("openPopup").addEventListener("click", () => {
  popup.style.display = "flex";
  input.focus(); // Cursor direkt ins Eingabefeld setzen
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
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});
