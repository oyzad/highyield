// variables 

let buds = 0;
let cursors = 0;
let cursorPrice = 10;
let lights = 0;
let lightPrice = 50;
let clickstrength = 1;


const budDisplay = document.getElementById('bud-count');
const cursorDisplay = document.getElementById('cursor-count');
const lightDisplay = document.getElementById('light-count');

document.getElementById("bud").addEventListener('click', () => {
  buds += clickstrength
  updateDisplay();
});

function updateShop(){
  document.getElementById("buy-cursor").innerText = `Buy Cursor (${cursorPrice} bud)`;
  document.getElementById("buy-light").innerText = `Buy Light (${lightPrice} bud)`;
}

function buyCursor() {
  if (buds >= cursorPrice) {
    buds -= cursorPrice;
    cursors += 1;
    cursorPrice = Math.floor(cursorPrice * 1.15);
    updateShop();
    updateDisplay();
  }
}
function buyLight(){
  if (buds >= lightPrice) {
    buds -= lightPrice;
    lights += 1;
    clickstrength += 1
    lightPrice = Math.floor(lightPrice * 1.15);
    updateShop();
    updateDisplay()
  }
}

setInterval(() => {
  buds += cursors;
  updateDisplay();
}, 1000);

function updateDisplay() {
  budDisplay.textContent = buds;
  cursorDisplay.textContent = cursors;
  lightDisplay.textContent = lights;
}

document.addEventListener("DOMContentLoaded", function () {
  updateShop(); // Run after DOM is ready
});

