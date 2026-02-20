document.addEventListener("DOMContentLoaded", () => {

    const colorPicker = document.getElementById("colorPicker");
    const resultMessage = document.getElementById("resultMessage");

    const removeBtn = document.getElementById("removeImage");
    const marker = document.getElementById("marker");
    const colorPreview = document.getElementById("colorPreview");
    const colorValues = document.getElementById("colorValues");

    const resultCard = document.getElementById("resultCard");

    colorPicker.addEventListener("input", () => {

    const hex = colorPicker.value;
    const { r, g, b } = hexToRgb(hex);

    const allowed = isColorAllowed(r, g, b);

    updateResultUI(allowed);
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

            removeBtn.style.display = "inline-block";
            marker.style.display = "none";
            colorPreview.style.backgroundColor = "transparent";
            colorValues.textContent = "";
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

    // 🎯 Move marcador
    marker.style.left = x + "px";
    marker.style.top = y + "px";
    marker.style.display = "block";

    // 🎨 Mostra cor capturada
    const rgbString = `rgb(${r}, ${g}, ${b})`;
    colorPreview.style.backgroundColor = rgbString;
    colorValues.textContent = rgbString;

    const allowed = isColorAllowed(r, g, b);

    if (allowed) {
    resultMessage.textContent = "DENTRO DA PALETA ✅";
    resultMessage.style.color = "#2e7d32";
    resultCard.classList.remove("result-blocked");
    resultCard.classList.add("result-allowed");
} else {
    resultMessage.textContent = "FORA DA PALETA ❌";
    resultMessage.style.color = "#c62828";
    resultCard.classList.remove("result-allowed");
    resultCard.classList.add("result-blocked");
}
});

function updateResultUI(allowed) {

    if (allowed) {
        resultMessage.textContent = "DENTRO DA PALETA ✅";
        resultMessage.style.color = "#2e7d32";
        resultCard.classList.remove("result-blocked");
        resultCard.classList.add("result-allowed");
    } else {
        resultMessage.textContent = "FORA DA PALETA ❌";
        resultMessage.style.color = "#c62828";
        resultCard.classList.remove("result-allowed");
        resultCard.classList.add("result-blocked");
    }
}

removeBtn.addEventListener("click", function () {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = "none";

    marker.style.display = "none";
    removeBtn.style.display = "none";

    colorPreview.style.backgroundColor = "transparent";
    colorValues.textContent = "";

    imageUpload.value = "";
    resultMessage.textContent = "Selecione uma opção acima";
    resultMessage.style.color = "#1c2b39";
});

});