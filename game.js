let buds = 0;
let cursors = 0;

const cookieDisplay = document.getElementById('bud-count');
const cursorDisplay = document.getElementById('cursor-count');

document.getElementById('cookie').addEventListener('click', () => {
  buds++;
  updateDisplay();
});

function buyCursor() {
  if (buds >= 10) {
    buds -= 10;
    cursors += 1;
    updateDisplay();
  }
}

setInterval(() => {
  buds += cursors;
  updateDisplay();
}, 1000);

function updateDisplay() {
  cookieDisplay.textContent = cookies;
  cursorDisplay.textContent = cursors;
}
