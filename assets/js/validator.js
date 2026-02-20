function isColorAllowed(r, g, b) {
    const { h, s, l } = rgbToHsl(r, g, b);

    // ❌ Bloqueia preto
    if (l < 15) return false;

    // ❌ Bloqueia neon
    if (s > CONFIG.saturationMax) return false;

    // ✅ Branco e cinza (mas não preto)
    if (s < CONFIG.saturationNeutral && l > 15) return true;

    const { blue, green, yellow, beige } = CONFIG.hueRanges;

    // ✅ Azul (mais amplo)
    if (h >= 170 && h <= 260) return true;

    if (h >= green[0] && h <= green[1]) return true;
    if (h >= yellow[0] && h <= yellow[1]) return true;
    if (h >= beige[0] && h <= beige[1] && s <= 65) return true;

    return false;
}