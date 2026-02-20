document.addEventListener("DOMContentLoaded", () => {

    const colorPicker = document.getElementById("colorPicker");
    const resultMessage = document.getElementById("resultMessage");
    const resultCard = document.getElementById("resultCard");

    const removeBtn = document.getElementById("removeImage");
    const marker = document.getElementById("marker");
    const colorPreview = document.getElementById("colorPreview");
    const colorValues = document.getElementById("colorValues");

    const imageUpload = document.getElementById("imageUpload");
    const canvas = document.getElementById("imageCanvas");
    const ctx = canvas.getContext("2d");

    /* =========================
       RESULT UI
    ========================== */

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

    /* =========================
       COLOR PICKER
    ========================== */

    function handleColorSelection() {
    const hex = colorPicker.value;

    const { r, g, b } = hexToRgb(hex);
    const hsl = rgbToHsl(r, g, b);

    resultMessage.textContent =
        `H:${Math.round(hsl.h)} S:${Math.round(hsl.s)} L:${Math.round(hsl.l)}`;

    const allowed = isColorAllowed(r, g, b);
    updateResultUI(allowed);
}

    colorPicker.addEventListener("input", handleColorSelection);
    colorPicker.addEventListener("change", handleColorSelection);

    /* =========================
       UPLOAD DE IMAGEM
    ========================== */

    imageUpload.addEventListener("change", function (event) {

        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();

            img.onload = function () {

                const maxWidth = 500;
                const scale = maxWidth / img.width;

                canvas.width = maxWidth;
                canvas.height = img.height * scale;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.style.display = "block";
                removeBtn.style.display = "block";

                marker.style.display = "none";
                colorPreview.style.backgroundColor = "transparent";
                colorValues.textContent = "";
            };

            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    });

    /* =========================
       CAPTURA DE PIXEL
    ========================== */

    canvas.addEventListener("click", function (event) {

        const rect = canvas.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const pixel = ctx.getImageData(x, y, 1, 1).data;

        const r = pixel[0];
        const g = pixel[1];
        const b = pixel[2];

        marker.style.left = x + "px";
        marker.style.top = y + "px";
        marker.style.display = "block";

        const rgbString = `rgb(${r}, ${g}, ${b})`;
        colorPreview.style.backgroundColor = rgbString;
        colorValues.textContent = rgbString;

        const allowed = isColorAllowed(r, g, b);
        updateResultUI(allowed);
    });

    /* =========================
       REMOVER IMAGEM
    ========================== */

    removeBtn.addEventListener("click", function () {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = "none";

        marker.style.display = "none";
        removeBtn.style.display = "none";

        colorPreview.style.backgroundColor = "transparent";
        colorValues.textContent = "";

        imageUpload.value = "";

        resultMessage.textContent = "Selecione uma opção acima";
        //resultMessage.textContent = `H:${Math.round(hsl.h)} S:${Math.round(hsl.s)} L:${Math.round(hsl.l)}`;
        resultMessage.style.color = "#1c2b39";
        resultCard.classList.remove("result-allowed", "result-blocked");
    });

});