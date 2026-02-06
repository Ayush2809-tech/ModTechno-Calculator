function applyTheme(themeName) {
    document.body.className = themeName;
    localStorage.setItem("siteTheme", themeName);
}

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("siteTheme");
    if (savedTheme) {
        document.body.className = savedTheme;
    } else {
        document.body.className = "theme-light";
    }
});
