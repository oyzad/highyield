// variables 

let buds = 0;
let cursors = 0;
let cursorPrice = 10;
let strainNum = 0;
let strainPrice = 500;
let lights = 0;
let lightPrice = 50;
let racks = 0;
let rackPrice = 1000;
let clickstrength = 1;
let previousBudCount = 0;
let calculatedBPS = 0;

// strains 
const strains = ["Sour Diesel","Purple Urkle","Strawberry Milkshake", "Blue Dream","Pink Runtz", "Northern Lights", "Golden Ganja"]
const strainFile = ["Bud_SD.png", "Bud_PU.png","Bud_SM.png", "Bud_BB.png","Bud_PR.png", "Bud_NL.png", "Bud_G.png"]
const strainPrices = [500,2000,5000,15000,50000,100000]
const strainClick = [0,10,15,20,25,40,60]
let budFile = "bud_SD.png"; 


//text display 
const budDisplay = document.getElementById('bud-value');
const cursorDisplay = document.getElementById('cursor-count');
const lightDisplay = document.getElementById('light-count');
const strainDisplay = document.getElementById('strain-type');
const rackDisplay = document.getElementById('rack-count');

// sounds 
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
function buyRack(){
  if (buds >= rackPrice) {
    buySound.currentTime = 0;
    buySound.play();
    buds -= rackPrice;
    racks += 1;
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

function upgradeStrain() {
  if (strainNum < strains.length - 1) {
    strainNum++;
    document.getElementById('strain-type').textContent = strains[strainNum];
    strainSound.currentTime = 0;
    strainSound.play();
    buds -= strainPrice;
    clickstrength += strainClick[strainNum];
    updateTooltips();
    updateShop();
    updateBudImage();
    updateDisplay();
  }

  // remove button at last strain
  if (strainNum === strains.length - 1) {     
    const button = document.getElementById('upgrade-strain');
    if (button) {
     // button.remove();
      button.style.display = 'none';
    }
  }
}


setInterval(() => {
  buds += cursors;
  buds += 10 * racks;
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
  rackDisplay.textContent = racks;
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
  updateBudImage();
});

