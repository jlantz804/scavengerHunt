const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('pink-theme')) {
        body.classList.replace('pink-theme', 'red-theme');
        themeToggle.textContent = 'Switch to Pink Theme';
    } else {
        body.classList.replace('red-theme', 'pink-theme');
        themeToggle.textContent = 'Switch to Red Theme';
    }
});
