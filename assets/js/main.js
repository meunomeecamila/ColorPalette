document.addEventListener("DOMContentLoaded", () => {

    const colorPicker = document.getElementById("colorPicker");
    const resultMessage = document.getElementById("resultMessage");

    function handleColorSelection() {
        const hex = colorPicker.value;

        if (!hex) return;

        const { r, g, b } = hexToRgb(hex);

        resultMessage.textContent = `RGB: ${r}, ${g}, ${b}`;
    }

    colorPicker.addEventListener("input", handleColorSelection);
    colorPicker.addEventListener("change", handleColorSelection);

});