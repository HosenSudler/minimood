// Code für list.html - Custom Cursor Setup
let customCursor = null;
let lastX = 0;
let lastY = 0;
let currentX = 0;
let currentY = 0;

// Funktion: Custom Cursor erstellen
function createCustomCursor() {
    if (!customCursor) {
        customCursor = document.createElement('div');
        customCursor.id = 'customCursor';
        customCursor.textContent = '✈️';
        customCursor.style.cssText = `
            position: fixed;
            font-size: 32px;
            pointer-events: none;
            z-index: 9999;
            display: none;
            transform-origin: center center;
            transition: transform 0.4s ease-out;
        `;
        document.body.appendChild(customCursor);
    }
}

// Funktion: Mausbewegung behandeln
function handleMouseMove(e) {
    currentX = e.clientX;
    currentY = e.clientY;

    // Cursor Position aktualisieren
    customCursor.style.left = currentX + 'px';
    customCursor.style.top = currentY + 'px';

    // Richtung berechnen
    const deltaX = currentX - lastX;
    const deltaY = currentY - lastY;

    // Nur bei Bewegung rotieren
    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        customCursor.style.transform = `translate(-50%, -50%) rotate(${angle - -45}deg)`;
        
        lastX = currentX;
        lastY = currentY;
    }
}

// Funktion: Custom Cursor aktivieren
function enableCustomCursor() {
    createCustomCursor();
    document.body.style.cursor = 'none';
    customCursor.style.display = 'block';
    document.addEventListener('mousemove', handleMouseMove);
}

// Special Mode beim Laden prüfen und Cursor aktivieren
window.addEventListener('DOMContentLoaded', () => {
    const specialMode = localStorage.getItem("specialMode") === "true";
    
    if (specialMode) {
        enableCustomCursor();
    }
    
    // Optional: Anzeige des gespeicherten Namens
    const savedName = localStorage.getItem("moodlistName");
    const buttonCount = localStorage.getItem("buttonCount");
    
    console.log("Special Mode:", specialMode);
    console.log("Name:", savedName);
    console.log("Button Count:", buttonCount);
});