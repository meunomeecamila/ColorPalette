document.addEventListener("DOMContentLoaded", () => {

    const colorPicker = document.getElementById("colorPicker");
    const resultMessage = document.getElementById("resultMessage");

    colorPicker.addEventListener("input", () => {

        const hex = colorPicker.value;
        const { r, g, b } = hexToRgb(hex);

        const allowed = isColorAllowed(r, g, b);

        if (allowed) {
            resultMessage.textContent = "DENTRO DA PALETA ✅";
            resultMessage.style.color = "green";
        } else {
            resultMessage.textContent = "FORA DA PALETA ❌";
            resultMessage.style.color = "red";
        }

    });

});