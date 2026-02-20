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

    const imageUpload = document.getElementById("imageUpload");
const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d");

// Quando o usuário seleciona uma imagem
imageUpload.addEventListener("change", function (event) {

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();

        img.onload = function () {

            // Ajusta o tamanho do canvas proporcionalmente
            const maxWidth = 500;
            const scale = maxWidth / img.width;

            canvas.width = maxWidth;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.style.display = "block";
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
});

canvas.addEventListener("click", function (event) {

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const pixel = ctx.getImageData(x, y, 1, 1).data;

    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

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