// Объявление переменных
let score = 0;
let energy = 500;
let tapPower = 1;
let energyRegen = 1;
let autoClicker = 0;

const scoreEl = document.getElementById("score");
const energyEl = document.getElementById("energy");

document.body.style.overflow = 'hidden';

// Засекаем, когда началась загрузка
const startTime = Date.now();
document.body.classList.add('loading');

window.addEventListener('load', () => {
    loadGameData();

    const loadingScreen = document.getElementById('loading-screen');
    const minDuration = 4000;
    const timePassed = Date.now() - startTime;
    const delay = Math.max(0, minDuration - timePassed);

    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            document.body.classList.remove('loading');
            document.getElementById("main-content").style.display = "block";
        }, 500);
    }, delay);
});

function tap(event) {
    if (energy > 0) {
        score += tapPower;
        energy -= 1;
        scoreEl.innerText = score;
        energyEl.innerText = energy;
        saveGameData();
    } else {
        alert("Энергия закончилась! Подождите восстановления.");
    }
}

setInterval(() => {
    if (energy < 500) {
        energy += energyRegen;
        if (energy > 500) energy = 500;
        energyEl.innerText = energy;
    }
    score += autoClicker;
    scoreEl.innerText = score;
    saveGameData();
}, 1000);

function openShop() {
    document.getElementById("shop-modal").style.display = "flex";
}

function closeShop() {
    document.getElementById("shop-modal").style.display = "none";
}

function buyUpgrade(power, cost, energyCost) {
    if (score >= cost && energy >= energyCost) {
        score -= cost;
        energy -= energyCost;
        tapPower += power;
        scoreEl.innerText = score;
        energyEl.innerText = energy;
        saveGameData();
        alert("Улучшение куплено!");
    } else {
        alert("Недостаточно очков или энергии!");
    }
}

function buyEnergyRegen(amount, cost) {
    if (score >= cost) {
        score -= cost;
        energyRegen += amount;
        scoreEl.innerText = score;
        saveGameData();
        alert("Скорость восстановления энергии увеличена!");
    } else {
        alert("Недостаточно очков!");
    }
}

function buyAutoClicker(amount, cost) {
    if (score >= cost) {
        score -= cost;
        autoClicker += amount;
        scoreEl.innerText = score;
        saveGameData();
        alert("Автокликер куплен!");
    } else {
        alert("Недостаточно очков!");
    }
}

function saveGameData() {
    localStorage.setItem("score", score);
    localStorage.setItem("energy", energy);
    localStorage.setItem("tapPower", tapPower);
    localStorage.setItem("energyRegen", energyRegen);
    localStorage.setItem("autoClicker", autoClicker);
}

function loadGameData() {
    const savedScore = localStorage.getItem("score");
    const savedEnergy = localStorage.getItem("energy");
    const savedTapPower = localStorage.getItem("tapPower");
    const savedEnergyRegen = localStorage.getItem("energyRegen");
    const savedAutoClicker = localStorage.getItem("autoClicker");

    if (savedScore !== null) score = parseInt(savedScore, 10);
    if (savedEnergy !== null) energy = parseInt(savedEnergy, 10);
    if (savedTapPower !== null) tapPower = parseInt(savedTapPower, 10);
    if (savedEnergyRegen !== null) energyRegen = parseInt(savedEnergyRegen, 10);
    if (savedAutoClicker !== null) autoClicker = parseInt(savedAutoClicker, 10);

    scoreEl.innerText = score;
    energyEl.innerText = energy;
}

document.getElementById("kraken").addEventListener("error", () => {
    alert("❌ Ошибка: Картинка кракена не загрузилась!");
});

// Убедитесь, что у вас есть такой код для открытия головоломки
document.getElementById("start-puzzle-btn").addEventListener("click", () => {
    openPuzzleModal(); // Это функция из puzzle.js для открытия окна головоломки
});