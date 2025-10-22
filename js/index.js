document.addEventListener("DOMContentLoaded", () => {
    const circleText = document.getElementById("circleText");

    function renderCircleText() {
        let text = circleText.getAttribute("data-text") || circleText.textContent.trim();
        text = text.trim() + " ";
        circleText.innerHTML = "";

        // Ambil radius responsif dari CSS
        const rootStyles = getComputedStyle(document.documentElement);
        const radiusValue = rootStyles.getPropertyValue("--circle-radius").trim();

        // Ubah clamp() → pixel (dengan elemen dummy)
        const temp = document.createElement("div");
        temp.style.position = "absolute";
        temp.style.width = radiusValue;
        document.body.appendChild(temp);
        const radius = temp.offsetWidth;
        document.body.removeChild(temp);

        const characters = text.split("");
        const deg = 360 / characters.length;

        characters.forEach((char, i) => {
            const span = document.createElement("span");
            span.innerText = char === " " ? "\u00A0" : char;
            span.style.position = "absolute";
            span.style.transformOrigin = "0 100%";
            span.style.transform = `
                rotate(${i * deg}deg)
                translate(${radius}px)
                rotate(90deg)
            `;
            circleText.appendChild(span);
        });
    }

    // Jalankan pertama kali
    renderCircleText();

    // Render ulang setiap kali ukuran layar berubah
    window.addEventListener("resize", () => {
        renderCircleText();
    });
});

const btnStart = document.getElementById("start");

function nextPage() {
    window.location.href = "ambilfoto.html";
}

btnStart.addEventListener("click", nextPage);