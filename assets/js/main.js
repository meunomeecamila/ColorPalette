document.addEventListener("DOMContentLoaded", () => {

    const resultMessage = document.getElementById("resultMessage");
    const resultCard = document.getElementById("resultCard");

    const removeBtn = document.getElementById("removeImage");
    const marker = document.getElementById("marker");
    const colorPreview = document.getElementById("colorPreview");
    const colorValues = document.getElementById("colorValues");

    const imageUpload = document.getElementById("imageUpload");
    const canvas = document.getElementById("imageCanvas");

    if (!canvas) return; // segurança extra

    const ctx = canvas.getContext("2d");

    /* =========================
       RESULT UI
    ========================== */

    function updateResultUI(allowed) {
        if (!resultMessage || !resultCard) return;

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
       UPLOAD DE IMAGEM
    ========================== */

    if (imageUpload) {
        imageUpload.addEventListener("change", function (event) {

            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (e) {
                const img = new Image();

                img.onload = function () {

                    const maxWidth = 500;
                    const scale = img.width > maxWidth ? maxWidth / img.width : 1;

                    canvas.width = img.width * scale;
                    canvas.height = img.height * scale;

                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    canvas.style.display = "block";
                    if (removeBtn) removeBtn.style.display = "block";

                    if (marker) marker.style.display = "none";
                    if (colorPreview) colorPreview.style.backgroundColor = "transparent";
                    if (colorValues) colorValues.textContent = "";
                };

                img.src = e.target.result;
            };

            reader.readAsDataURL(file);
        });
    }

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

        if (marker) {
            marker.style.left = x + "px";
            marker.style.top = y + "px";
            marker.style.display = "block";
        }

        const rgbString = `rgb(${r}, ${g}, ${b})`;

        if (colorPreview) colorPreview.style.backgroundColor = rgbString;
        if (colorValues) colorValues.textContent = rgbString;

        if (typeof isColorAllowed === "function") {
            const allowed = isColorAllowed(r, g, b);
            updateResultUI(allowed);
        }
    });

    /* =========================
       REMOVER IMAGEM
    ========================== */

    if (removeBtn) {
        removeBtn.addEventListener("click", function () {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = "none";

            if (marker) marker.style.display = "none";
            removeBtn.style.display = "none";

            if (colorPreview) colorPreview.style.backgroundColor = "transparent";
            if (colorValues) colorValues.textContent = "";

            if (imageUpload) imageUpload.value = "";

            if (resultMessage) {
                resultMessage.textContent = "Selecione uma opção acima";
                resultMessage.style.color = "#1c2b39";
            }

            if (resultCard) {
                resultCard.classList.remove("result-allowed", "result-blocked");
            }
        });
    }

});