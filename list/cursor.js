// Code für list.html - Custom Cursor Setup
let customCursor = null;
let lastX = 0;
let lastY = 0;
let currentX = 0;
let currentY = 0;
let cursorX = 0;
let cursorY = 0;
let animationFrameId = null;

const DELAY = 0.1; // Verzögerungsfaktor (0-1, kleiner = mehr delay)

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
        `;
        document.body.appendChild(customCursor);
    }
}

// Funktion: Animation Loop für smoothes Folgen
function animateCursor() {
    // Interpolation zur Mausposition
    cursorX += (currentX - cursorX) * DELAY;
    cursorY += (currentY - cursorY) * DELAY;

    // Cursor Position aktualisieren
    customCursor.style.left = cursorX + 'px';
    customCursor.style.top = cursorY + 'px';

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

    animationFrameId = requestAnimationFrame(animateCursor);
}

// Funktion: Mausbewegung behandeln
function handleMouseMove(e) {
    currentX = e.clientX;
    currentY = e.clientY;
}

// Funktion: Custom Cursor aktivieren
function enableCustomCursor() {
    createCustomCursor();
    document.body.style.cursor = 'none';
    customCursor.style.display = 'block';
    
    // Initiale Position setzen
    cursorX = currentX;
    cursorY = currentY;
    
    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();
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