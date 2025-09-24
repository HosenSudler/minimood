        // Funktion zum Erkennen von iOS
        function isIOS() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        }

        // Initialisiere iOS-Haptik-Element (nur bei iOS)
        let hapticLabel = null;
        if (isIOS()) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'haptic-checkbox';
            checkbox.setAttribute('switch', '');
            checkbox.style.display = 'none';
            document.body.appendChild(checkbox);

            hapticLabel = document.createElement('label');
            hapticLabel.htmlFor = 'haptic-checkbox';
            hapticLabel.style.display = 'none';
            document.body.appendChild(hapticLabel);
        }

        // Funktion für haptisches Feedback
        function triggerHaptic() {
            if (isIOS() && hapticLabel) {
                hapticLabel.click();
            } else if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        }

        // Event-Listener für den Button (falls benötigt)
        const hapticTestBtn = document.getElementById('hapticTestBtn');
        if (hapticTestBtn) {
            hapticTestBtn.addEventListener('click', triggerHaptic);
            hapticTestBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                triggerHaptic();
            });
        }