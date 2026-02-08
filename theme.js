const DEFAULT_THEME = {
    colors: {
        backgroundStart: "#f9a8b5",
        backgroundEnd: "#ffd8b1",
        buttonBackground: "#d64062",
        buttonHover: "#ea6a87",
        textColor: "#922640"
    },
    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    }
};

// Update CSS variables from configuration
function applyTheme() {
    const config = window.VALENTINE_CONFIG || {};
    const root = document.documentElement;

    const colors = {
        ...DEFAULT_THEME.colors,
        ...(config.colors || {})
    };

    const animations = {
        ...DEFAULT_THEME.animations,
        ...(config.animations || {})
    };

    // Apply colors
    root.style.setProperty("--background-color-1", colors.backgroundStart);
    root.style.setProperty("--background-color-2", colors.backgroundEnd);
    root.style.setProperty("--button-color", colors.buttonBackground);
    root.style.setProperty("--button-hover", colors.buttonHover);
    root.style.setProperty("--text-color", colors.textColor);

    // Apply animation settings
    root.style.setProperty("--float-duration", animations.floatDuration);
    root.style.setProperty("--float-distance", animations.floatDistance);
    root.style.setProperty("--bounce-speed", animations.bounceSpeed);
    root.style.setProperty("--heart-explosion-size", animations.heartExplosionSize);
}

// Apply theme when the page loads
window.addEventListener('DOMContentLoaded', applyTheme); 
