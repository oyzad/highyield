// variables 

let buds = 0;
let cursors = 0;
let cursorPrice = 10;
let strainNum = 0;
let strainPrice = 500;
let lights = 0;
let lightPrice = 50;
let clickstrength = 1;

const strains = ["Sour Diesel","Purple Urkle","Blue Dream","Northern Lights"]
const strainFile = ["Bud_SD.png", "Bud_PU.png", "Bud_BB.png", "Bud_NL.png"]
const strainPrices = [500,750,1000,1500,2000,5000]
let budFile = "bud_SD.png"; 

const budDisplay = document.getElementById('bud-count');
const cursorDisplay = document.getElementById('cursor-count');
const lightDisplay = document.getElementById('light-count');
const strainDisplay = document.getElementById('strain-type');

const clickSound = new Audio('assets/click.mp3');
clickSound.volume = 0.3;
const buySound = new Audio('assets/buy.mp3');
const strainSound = new Audio('assets/strain-change.mp3');




document.getElementById("bud").addEventListener('click', () => {
  clickSound.currentTime = 0; // rewind 
  clickSound.play();
  buds += clickstrength
  updateDisplay();
});

function updateShop(){
  document.getElementById("buy-cursor").innerText = `Buy Cursor (${cursorPrice} bud)`;
  document.getElementById("buy-light").innerText = `Buy Light (${lightPrice} bud)`;
  document.getElementById("upgrade-strain").innerText = `Upgrade Strain (${strainPrices[strainNum]} bud)`;
}

function buyCursor() {
  if (buds >= cursorPrice) {
    buySound.currentTime = 0;
    buySound.play();
    buds -= cursorPrice;
    cursors += 1;
    cursorPrice = Math.floor(cursorPrice * 1.15);
    updateShop();
    updateDisplay();
  }
}
function buyLight(){
  if (buds >= lightPrice) {
    buySound.currentTime = 0;
    buySound.play();
    buds -= lightPrice;
    lights += 1;
    clickstrength += 1
    lightPrice = Math.floor(lightPrice * 1.15);
    updateShop();
    updateDisplay();
  }
}
function upgradeStrain(){
  if (buds >= strainPrices[strainNum]) {
    strainSound.currentTime = 0;
    strainSound.play();
    buds -= strainPrice;
    strainNum += 1;
    updateShop();
    updateBudImage();
    updateDisplay();
    
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
  strainDisplay.textContent = strains[strainNum];
}
function updateBudImage () {
  const budImage = document.getElementById("bud");
  budFile = strainFile[strainNum]
  budImage.src = `assets/${budFile}`;
}


document.addEventListener("DOMContentLoaded", function () {
  updateShop(); // Run after DOM is ready
});

