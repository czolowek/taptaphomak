// Глобальные переменные
let puzzleModal = document.getElementById("puzzle-modal");
let carPuzzleModal = document.getElementById("car-puzzle-modal");
let openPuzzleBtn = document.getElementById("open-puzzle-btn");
let closePuzzleBtn = document.getElementById("close-puzzle");
let puzzleContainer = document.getElementById("puzzle-container");
let puzzleTimer = document.getElementById("timer");
let puzzleLevels = document.getElementById("puzzle-levels");
let puzzleCars = [];

let timerInterval;

// Проверка загрузки DOM перед добавлением событий
document.addEventListener("DOMContentLoaded", function () {
    // Назначаем обработчики кнопок
    if (openPuzzleBtn) {
        openPuzzleBtn.addEventListener("click", openPuzzle);
    }

    if (closePuzzleBtn) {
        closePuzzleBtn.addEventListener("click", closePuzzle);
    }

    const startCarPuzzleBtn = document.getElementById("start-car-puzzle-btn");
    if (startCarPuzzleBtn) {
        startCarPuzzleBtn.addEventListener("click", () => {
            alert("Начинаем головоломку с машинками!");
            closeCarPuzzle();
        });
    }
});

// Функция для открытия головоломки
function openPuzzle() {
    if (puzzleModal) {
        puzzleModal.style.display = "block";
    }
    document.getElementById("main-content").style.display = "none";
    resetPuzzle();
}

// Функция для закрытия головоломки
function closePuzzle() {
    if (puzzleModal) {
        puzzleModal.style.display = "none";
    }
    document.getElementById("main-content").style.display = "block";
}

// Функция для запуска головоломки с определённым уровнем сложности
function startPuzzle(level) {
    puzzleContainer.innerHTML = "";
    createPuzzle(level);
    startTimer();
}

// Функция для создания головоломки
function createPuzzle(level) {
    let cars = [];

    if (level === "easy") {
        cars = ["red", "blue", "green"];
    } else if (level === "medium") {
        cars = ["red", "blue", "green", "yellow"];
    } else if (level === "hard") {
        cars = ["red", "blue", "green", "yellow", "purple", "orange"];
    }

    cars.forEach((color, index) => {
        let car = document.createElement("div");
        car.classList.add("car", color);
        car.setAttribute("data-id", index);
        car.style.left = "0px";
        car.addEventListener("click", () => {
            let currentLeft = parseInt(car.style.left || "0");
            car.style.left = (currentLeft + 50) + "px";
        });
        puzzleContainer.appendChild(car);
    });

    addCarGlowEffect();
    activateRGBGlowEffect();
}

// Функция для запуска таймера
function startTimer() {
    let timeLeft = 60;
    puzzleTimer.textContent = timeLeft;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        puzzleTimer.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Время вышло!");
            closePuzzle();
        }
    }, 1000);
}

// Функция для сброса головоломки
function resetPuzzle() {
    clearInterval(timerInterval);
    puzzleTimer.textContent = 60;
    puzzleContainer.innerHTML = "";
}

// Открытие и закрытие головоломки с машинками
function openCarPuzzle() {
    carPuzzleModal.style.display = "block";
    document.getElementById("main-content").style.display = "none";
}

function closeCarPuzzle() {
    carPuzzleModal.style.display = "none";
    document.getElementById("main-content").style.display = "block";
}

// Подсветка и анимация машинок
function addCarGlowEffect() {
    const cars = document.querySelectorAll(".car");
    cars.forEach(car => {
        car.classList.add("animate");
    });
}

function activateRGBGlowEffect() {
    const cars = document.querySelectorAll(".car");
    cars.forEach(car => {
        car.addEventListener("mouseenter", () => {
            car.style.transition = "box-shadow 0.5s ease-in-out, transform 0.5s";
            car.style.boxShadow = "0 0 25px rgba(255, 0, 255, 1), 0 0 35px rgba(0, 255, 255, 1)";
            car.style.transform = "scale(1.05)";
        });

        car.addEventListener("mouseleave", () => {
            car.style.boxShadow = "none";
            car.style.transform = "scale(1)";
        });
    });
}

window.addEventListener("DOMContentLoaded", function () {
    const openPuzzleBtn = document.getElementById("open-puzzle-btn");
    if (openPuzzleBtn) {
        openPuzzleBtn.addEventListener("click", openPuzzle);
    }
});