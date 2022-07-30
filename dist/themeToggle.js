var themeSwitch = document.getElementById('theme-switch');
var themes;
(function (themes) {
    themes["LIGHT"] = "light";
    themes["DARK"] = "dark";
})(themes || (themes = {}));
var loadTheme = function () {
    var storedTheme = localStorage.getItem('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: light)').matches
            ? "light"
            : "dark");
    document.documentElement.setAttribute('data-theme', storedTheme);
    themeSwitch.checked = storedTheme === "dark";
};
themeSwitch.onclick = function () {
    var currentTheme = document.documentElement.getAttribute('data-theme');
    var newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('data-theme', newTheme);
};
export default loadTheme;
