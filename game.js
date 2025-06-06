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
let budFile = "Bud_SD.png"; 

// meth types 
const meths = ["Meth", "Red meth","Green Gem","Chilli P","Heisenburg"]
const crystalFiles = ["Meth_W.png", "Meth_P.png","Meth_G.png", "Meth_R.png", "Meth_B.png"]
const crystalPrices = [500,2000,5000,15000,50000]
const crystalClick = [9,14,19,24,49]
let crystalFile = "Meth_W.png";
let crystalNum = 0;
let crystalPrice = 500;
let crystalClickStrength = 1;

//text display 
const budDisplay = document.getElementById('bud-value');
const cursorDisplay = document.getElementById('cursor-count');
const lightDisplay = document.getElementById('light-count');
const strainDisplay = document.getElementById('strain-type');
const rackDisplay = document.getElementById('rack-count');
const crystalDisplay = document.getElementById('crystal-count');

// sounds 
const clickSound = new Audio('assets/click.mp3');
clickSound.volume = 0.3;
const buySound = new Audio('assets/buy.mp3');
const strainSound = new Audio('assets/strain-change.mp3');
const errorSound = new Audio('assets/error.mp3');
errorSound.volume = 0.5;
const breakSound = new Audio('assets/breaking.mp3')
breakSound.volume = 0.3;

let crystals = 0;

const crystal = document.getElementById('crystal');
if (crystal) {
  crystal.addEventListener('click', () => {
    crystal.classList.remove('wobble');
    void crystal.offsetWidth;
    crystal.classList.add('wobble');
    //buds += 100; 
    breakSound.currentTime = 0;
    breakSound.play();
    crystals += crystalClickStrength;
    updateDisplay(); // update your UI
  });
}


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
  document.getElementById("buy-cursor").innerText = `Buy Trimmers (${cursorPrice} bud)`;
  document.getElementById("buy-light").innerText = `Buy Light (${lightPrice} bud)`;
  document.getElementById("buy-rack").innerText = `Buy Rack (${rackPrice} bud)`;
  document.getElementById("upgrade-strain").innerText = `Upgrade Strain (${strainPrices[strainNum]} bud)`;
  document.getElementById("upgrade-meth").innerText = `Upgrade Meth (${crystalPrices[crystalNum]} crystals)`;
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
  }else{
    errorSound.currentTime = 0;
    errorSound.play();
  }
}


function buyRack(){
  if (buds >= rackPrice) {
    buySound.currentTime = 0;
    buySound.play();
    buds -= rackPrice;
    racks += 1;
    rackPrice = Math.floor(rackPrice * 1.15)
    updateShop();
    updateTooltips();
    updateDisplay();
  }else{
    errorSound.currentTime = 0;
    errorSound.play();
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
  }else{
    errorSound.currentTime = 0;
    errorSound.play();
  }
}


function upgradeStrain() {
  if (strainNum < strains.length - 1) {
    if (buds >= strainPrice){
    strainNum++;
    document.getElementById('strain-type').textContent = strains[strainNum];
    strainSound.currentTime = 0;
    strainSound.play();
    buds -= strainPrice;
    strainPrice = strainPrices[strainNum]
    clickstrength += strainClick[strainNum];
    updateTooltips();
    updateShop();
    updateBudImage();
    updateDisplay();
    }else{
      errorSound.currentTime = 0;
      errorSound.play();
    }
}

  // After updating strainNum, check if at final strain
  if (strainNum === strains.length - 1) {
    const button = document.getElementById('upgrade-strain');
    if (button) button.style.display = 'none';

    const crystal = document.getElementById('crystal');
    let hidden = crystal.getAttribute("hidden");
    crystal.removeAttribute("hidden");
    const buyingCrystal = document.getElementById('upgrade-meth');
    if (buyingCrystal) buyingCrystal.style.display = 'inline';
    document.querySelector('.image-wrapper').style.width = '400px';
  }
}


function buyCrystal(){
  console.log("activated crytsal upgrade")
  if (crystalNum < meths.length - 1) {
    if (crystals >= crystalPrice){
      crystalClickStrength += crystalClick[crystalNum]
      crystalNum++
      // update strain type need line 
      // play sound 
      document.getElementById('crystal-type').textContent = meths[crystalNum];
      crystals -= crystalPrice;
      crystalPrice = crystalPrices[crystalNum]
      updateTooltips();
      updateShop();
      updateCrystalImage();
      updateDisplay();

    }else{
      errorSound.currentTime = 0;
      errorSound.play();
    }
  // After updating strainNum, check if at final strain
  if (crystalNum === meths.length - 1) {
    const button = document.getElementById('upgrade-meth');
    if (button) button.style.display = 'none';
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
  document.getElementById("auto-harvest").textContent = cursors + (racks * 10);
}

function updateDisplay() {
  budDisplay.textContent = buds;
  cursorDisplay.textContent = cursors;
  lightDisplay.textContent = lights;
  strainDisplay.textContent = strains[strainNum];
  rackDisplay.textContent = racks;
  crystalDisplay.textContent = crystals;
  updateStats();
  updateTooltips();
}
function updateBudImage () {
  const budImage = document.getElementById("bud");
  budFile = strainFile[strainNum]
  budImage.src = `assets/${budFile}`;
}
function updateCrystalImage(){
  const crystalImage = document.getElementById("crystal");
  crystalFile = crystalFiles[crystalNum]
  crystalImage.src = `assets/${crystalFile}`;
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
  // meth tooltip
  document.getElementById("meth-tooltip").setAttribute(
    "data-tooltip",
    `Upgrades to new meth crystal, increases meth click bonus. Current crystal bonus: ${crystalClick[crystalNum+1]}`
  );  
}


document.addEventListener("DOMContentLoaded", function () {
  updateShop(); // Run after DOM is ready
  updateBudImage();
  updateCrystalImage();
});

