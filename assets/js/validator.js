function isColorAllowed(r, g, b) {

    const { h, s, l } = rgbToHsl(r, g, b);

    // ❌ Bloqueia preto real
    if (l < 10) return false;

    // ❌ Bloqueia neon extremo
    if (s > 90) return false;

    // ✅ Branco e cinza
    if (s < 10 && l > 10) return true;

    // ======================
    // PRIORIDADE RGB (mais estável que Hue)
    // ======================

    // Azul: componente azul dominante
    if (b > r && b > g) return true;

    // Verde: componente verde dominante
    if (g > r && g > b) return true;

    // Amarelo: vermelho e verde altos, azul baixo
    if (r > 150 && g > 150 && b < 150) return true;

    // Bege / marrom (tons quentes suaves)
    if (r > g && g > b && s < 70) return true;

    return false;
}