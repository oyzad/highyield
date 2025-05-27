// variables 

let buds = 0;
let cursors = 0;
let cursorPrice = 10;
let strainNum = 0;
let strainPrice = 500;
let lights = 0;
let lightPrice = 50;
let clickstrength = 1;
let previousBudCount = 0;
let calculatedBPS = 0;



const strains = ["Sour Diesel","Purple Urkle","Blue Dream","Northern Lights"]
const strainFile = ["Bud_SD.png", "Bud_PU.png", "Bud_BB.png", "Bud_NL.png"]
const strainPrices = [500,2000,5000,15000,50000,100000]
const strainClick = [0,10,15,20,25,40]
let budFile = "bud_SD.png"; 

const budDisplay = document.getElementById('bud-count');
const cursorDisplay = document.getElementById('cursor-count');
const lightDisplay = document.getElementById('light-count');
const strainDisplay = document.getElementById('strain-type');

const clickSound = new Audio('assets/click.mp3');
clickSound.volume = 0.3;
const buySound = new Audio('assets/buy.mp3');
const strainSound = new Audio('assets/strain-change.mp3');




const bud = document.getElementById('bud');

bud.addEventListener('click', () => {
  bud.classList.remove('wobble');
  void bud.offsetWidth;
  bud.classList.add('wobble');
  clickSound.currentTime = 0; 
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
    cursorPrice = Math.floor(cursorPrice * 1.5);
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
    clickstrength += 1;
    lightPrice = Math.floor(lightPrice * 1.25);
    updateShop();
    updateStats();
    updateDisplay();
  }
}
function upgradeStrain(){
  if (buds >= strainPrices[strainNum]) {
    strainSound.currentTime = 0;
    strainSound.play();
    buds -= strainPrice;
    strainNum += 1;
    clickstrength += strainClick[strainNum];
    updateTooltips();
    updateShop();
    updateBudImage();
    updateDisplay();
    
  }
}

setInterval(() => {
  buds += cursors;
  updateDisplay();
}, 1000);

function updateStats() {
  document.getElementById("buds-per-click").textContent = clickstrength;
  document.getElementById("auto-harvest").textContent = cursors;
}

function updateDisplay() {
  budDisplay.textContent = buds;
  cursorDisplay.textContent = cursors;
  lightDisplay.textContent = lights;
  strainDisplay.textContent = strains[strainNum];
  updateStats();
  updateTooltips();
}
function updateBudImage () {
  const budImage = document.getElementById("bud");
  budFile = strainFile[strainNum]
  budImage.src = `assets/${budFile}`;
}

setInterval(() => {
  const budDiff = buds - previousBudCount;
  calculatedBPS = budDiff;
  previousBudCount = buds;
  document.getElementById("buds-per-second").textContent = calculatedBPS;
}, 1000);

function updateTooltips() {


  // Strain tooltip
  document.getElementById("strain-tooltip").setAttribute(
    "data-tooltip",
    `Upgrades to a new strain, increases strain click bonus. Current strain bonus: ${strainClick[strainNum+1]}`
  );
}




document.addEventListener("DOMContentLoaded", function () {
  updateShop(); // Run after DOM is ready
});

