const popup = document.getElementById("namePopup");
const input = document.getElementById("username");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const saveBtn = document.getElementById("saveName");
const closeBtn = document.querySelector(".closePopup");

// Funktion: Zeitdifferenz in 5-Minuten-Schritten berechnen
function calculateButtonCount(startTime, endTime) {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const diffMinutes = (end - start) / 1000 / 60; // Differenz in Minuten
    return Math.max(0, Math.floor(diffMinutes / 5)); // Anzahl der 5-Minuten-Schritte
}

// Funktion: Speichern und weiterleiten
function saveName() {
    let name = input.value.trim();
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    // Validierung der Zeit
    if (!startTime || !endTime) {
        alert("Please enter both start and end times.");
        return;
    }

    // Berechne die Anzahl der Buttons
    const buttonCount = calculateButtonCount(startTime, endTime);
    if (buttonCount <= 0) {
        alert("End time must be after start time.");
        return;
    }

    if (!name) {
        // leer → Standardname
        name = "Witzeliste";
        localStorage.setItem("specialMode", "false");
    } else if (name.toLowerCase() === "911" || name === "✈️") {
        // secret → Spezialmodus
        name = "✈️💥🏢🏢";
        localStorage.setItem("specialMode", "true");
    } else {
        // alles andere → normal
        localStorage.setItem("specialMode", "false");
    }

    // Name und Button-Anzahl speichern
    localStorage.setItem("moodlistName", name);
    localStorage.setItem("buttonCount", buttonCount);

    // Weiterleiten
    window.location.href = "list";
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