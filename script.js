// Ваш оригинальный код
let score = 0;
let energy = 500;
let tapPower = 1;
let energyRegen = 1;
let autoClicker = 0;

const scoreEl = document.getElementById("score");
const energyEl = document.getElementById("energy");
const puzzleContainer = document.getElementById("puzzle-container");

const grid = [
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [2, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 3, 3],
    [0, 4, 4, 4, 0, 0],
    [0, 0, 0, 0, 0, 0],
];

function tap(event) {
    if (energy > 0) {
        score += tapPower;
        energy -= 1;
        scoreEl.innerText = score;
        energyEl.innerText = energy;
        saveGameData(); // Сохраняем данные
    } else {
        alert("Энергия закончилась! Подождите восстановления.");
    }
}

setInterval(() => {
    if (energy < 500) {
        energy += energyRegen;
        if (energy > 500) energy = 500;
        energyEl.innerText = energy;
        saveGameData(); // Сохраняем данные
    }
    score += autoClicker;
    scoreEl.innerText = score;
    saveGameData(); // Сохраняем данные
}, 1000);

// Скрытие экрана загрузки после загрузки страницы
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    document.body.classList.add("loading"); // Блокируем прокрутку

    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            document.body.classList.remove("loading"); // Разблокируем прокрутку
        }, 500); // Убираем экран через 500 мс после начала скрытия
    }, 5000); // Задержка в 5 секунд
});

function openShop() {
    document.getElementById("shop-modal").style.display = "flex";
}

function closeShop() {
    document.getElementById("shop-modal").style.display = "none";
}

//Скрытие экрана загрузки после загрузки страницы
// Скрытие экрана загрузки после загрузки страницы
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    document.body.classList.add("loading"); // Блокируем прокрутку

    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            document.body.classList.remove("loading"); // Разблокируем прокрутку
        }, 500); // Убираем экран через 500 мс после начала скрытия
    }, 5000); // Задержка в 5 секунд
});


function buyUpgrade(power, cost, energyCost) {
    if (score >= cost && energy >= energyCost) {
        score -= cost;
        energy -= energyCost;
        tapPower += power;
        scoreEl.innerText = score;
        energyEl.innerText = energy;
        saveGameData(); // Сохраняем данные
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
        saveGameData(); // Сохраняем данные
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
        saveGameData(); // Сохраняем данные
        alert("Автокликер куплен!");
    } else {
        alert("Недостаточно очков!");
    }
}

function openPuzzle() {
    document.getElementById("puzzle-modal").style.display = "flex";
    renderPuzzle();
}

function closePuzzle() {
    document.getElementById("puzzle-modal").style.display = "none";
}

function renderPuzzle() {
    puzzleContainer.innerHTML = "";
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] !== 0) {
                const car = document.createElement("div");
                car.className = "car";
                if (grid[row][col] === 1) car.classList.add("red");
                if (grid[row][col] === 2) car.classList.add("blue");
                if (grid[row][col] === 3) car.classList.add("green");
                car.onclick = () => moveCar(row, col);
                puzzleContainer.appendChild(car);
            }
        }
    }
}

function moveCar(row, col) {
    const car = grid[row][col];
    if (car === 1) {
        if (col < grid[row].length - 1 && grid[row][col + 1] === 0) {
            grid[row][col] = 0;
            grid[row][col + 1] = car;
            if (col + 1 === grid[row].length - 1) {
                alert("Вы выиграли! +100 очков!");
                score += 100;
                scoreEl.innerText = score;
                saveGameData(); // Сохраняем данные
            }
        }
    } else {
        if (row < grid.length - 1 && grid[row + 1][col] === 0) {
            grid[row][col] = 0;
            grid[row + 1][col] = car;
        }
    }
    renderPuzzle();
}

// Новые функции для сохранения и загрузки данных
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

// Загружаем данные при загрузке страницы
document.addEventListener("DOMContentLoaded", loadGameData);