let cookies = 0;
let cursors = 0;

const cookieDisplay = document.getElementById('cookie-count');
const cursorDisplay = document.getElementById('cursor-count');

document.getElementById('cookie').addEventListener('click', () => {
  cookies++;
  updateDisplay();
});

function buyCursor() {
  if (cookies >= 10) {
    cookies -= 10;
    cursors += 1;
    updateDisplay();
  }
}

setInterval(() => {
  cookies += cursors;
  updateDisplay();
}, 1000);

function updateDisplay() {
  cookieDisplay.textContent = cookies;
  cursorDisplay.textContent = cursors;
}
