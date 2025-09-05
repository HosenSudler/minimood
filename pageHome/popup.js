const popup = document.getElementById("namePopup");
const input = document.getElementById("username");
const saveBtn = document.getElementById("saveName");
const closeBtn = document.querySelector(".closePopup");

// Funktion: Speichern und weiterleiten
function saveName() {
  let name = input.value.trim();

  if (!name) {
    // leer → Standardname
    name = "Witzeliste";
    localStorage.setItem("specialMode", "false");
  } else if (name.toLowerCase() === "911", "✈️") {
    // secret → Spezialmodus
    name = "✈️💥🏢🏢";
    localStorage.setItem("specialMode", "true");
  } else {
    // alles andere → normal
    localStorage.setItem("specialMode", "false");
  }

  // Name merken
  localStorage.setItem("moodlistName", name);

  // Weiterleiten
  window.location.href = "pageListe/liste.html";
}

// Popup öffnen
document.getElementById("openPopup").addEventListener("click", () => {
  popup.style.display = "flex";
  input.focus();
});

// Klick auf Speichern
saveBtn.addEventListener("click", saveName);

// Enter-Taste im Input
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    saveName();
  }
});

// Exit-Button
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});