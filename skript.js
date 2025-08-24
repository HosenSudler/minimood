const audio = new Audio("sounds/sound.wav");
audio.load(); // Laden vorbereiten

document.body.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().then(() => {
            audio.pause();
            audio.currentTime = 0;
        }).catch(() => {});
    }
}, { once: true }); // nur einmal



document.querySelectorAll('.day-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    ladeWitz();
  });
});

