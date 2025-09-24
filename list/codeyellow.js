    window.addEventListener("DOMContentLoaded", () => {
        const savedName = localStorage.getItem("moodlistName");
        const specialMode = localStorage.getItem("specialMode") === "true";
        const buttonCount = parseInt(localStorage.getItem("buttonCount")) || 18;

        const heading = document.getElementById("moodHeading");
        const calendar = document.getElementById("calendar");

        if (savedName) {
            heading.innerText = savedName;
            document.title = "Minimood " + savedName;
        } else {
            heading.innerText = "Witzeliste";
            document.title = "Minimood Witzeliste";
        }

        if (specialMode) {
            document.body.classList.add("secret-theme");
        }

        // Buttons dynamisch erzeugen
        const buttons = [];
        for (let i = 1; i <= buttonCount; i++) {
            const button = document.createElement("button");
            button.className = "day-btn";
            button.innerText = i;
            calendar.appendChild(button);
            buttons.push(button);
        }



        // Klick-Logik
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("day-btn") && e.target.classList.contains("active")) {
                const currentIndex = buttons.indexOf(e.target);

                // Geklickter Button → grün
                e.target.style.backgroundColor = "green";
                e.target.classList.remove("active");
                e.target.classList.add("clicked");

                // Witz anzeigen
                generateWitz();

                // Nach 5 Minuten nächsten Button gelb machen

            }
        });
    });