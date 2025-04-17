// Глобальные переменные
let puzzleModal = document.getElementById("puzzle-modal");
let carPuzzleModal = document.getElementById("car-puzzle-modal");
let openPuzzleBtn = document.getElementById("open-puzzle-btn");
let closePuzzleBtn = document.getElementById("close-puzzle");
let puzzleContainer = document.getElementById("puzzle-container");
let puzzleTimer = document.getElementById("timer");
let puzzleLevels = document.getElementById("puzzle-levels");
let puzzleCars = [];

// Проверка на существование элементов, чтобы не было ошибок при загрузке
if (openPuzzleBtn) {
    openPuzzleBtn.addEventListener("click", openPuzzle); // Кнопка для открытия головоломки
}
if (closePuzzleBtn) {
    closePuzzleBtn.addEventListener("click", closePuzzle); // Кнопка для закрытия головоломки
}

// Функция для открытия головоломки
function openPuzzle() {
    if (puzzleModal) puzzleModal.style.display = "block";
    const mainContent = document.getElementById("main-content");
    if (mainContent) mainContent.style.display = "none";
    resetPuzzle();  // Сбросить настройки головоломки перед её открытием
}

// Функция для закрытия головоломки
function closePuzzle() {
    if (puzzleModal) puzzleModal.style.display = "none";
    const mainContent = document.getElementById("main-content");
    if (mainContent) mainContent.style.display = "block";
}

// Функция для запуска головоломки с определённым уровнем сложности
function startPuzzle(level) {
    // Открытие контейнера для машин
    if (!puzzleContainer) return;
    puzzleContainer.innerHTML = "";
    createPuzzle(level);
    startTimer();
}

// Функция для создания головоломки
function createPuzzle(level) {
    // В зависимости от уровня сложности, создаются разные количества машин
    let cars = [];
    if (level === "easy") {
        cars = ["red", "blue", "green"];
    } else if (level === "medium") {
        cars = ["red", "blue", "green", "yellow"];
    } else if (level === "hard") {
        cars = ["red", "blue", "green", "yellow", "purple", "orange"];
    }

    // Рендерим машины
    cars.forEach((color, index) => {
        let car = document.createElement("div");
        car.classList.add("car", color);
        car.setAttribute("data-id", index);
        car.style.left = "0px"; // начальная позиция
        puzzleContainer.appendChild(car);

        // Добавить обработчик перемещения
        car.addEventListener("click", (event) => {
            let carElement = event.target;
            let currentPosition = carElement.style.left || "0px";
            let newPosition = parseInt(currentPosition) + 50 + "px";
            carElement.style.left = newPosition;
        });
    });

    // Добавление анимации с подсветкой
    addCarGlowEffect();
    activateRGBGlowEffect();
}

// Функция для запуска таймера
let timerInterval;
function startTimer() {
    let timeLeft = 60; // Время в секундах
    if (puzzleTimer) puzzleTimer.textContent = timeLeft;

    // Запускаем таймер
    timerInterval = setInterval(() => {
        timeLeft--;
        if (puzzleTimer) puzzleTimer.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Время вышло!");
            closePuzzle();
        }
    }, 1000);
}

// Функция для сброса головоломки
function resetPuzzle() {
    clearInterval(timerInterval); // Останавливаем старый таймер, если был
    if (puzzleTimer) puzzleTimer.textContent = 60; // Сбросить таймер
    if (puzzleContainer) puzzleContainer.innerHTML = ""; // Очистить контейнер
}

// --- Расширение с головоломкой машинок (оставляем старое) ---
function openCarPuzzle() {
    if (carPuzzleModal) carPuzzleModal.style.display = "block";
    const mainContent = document.getElementById("main-content");
    if (mainContent) mainContent.style.display = "none";
}

function closeCarPuzzle() {
    if (carPuzzleModal) carPuzzleModal.style.display = "none";
    const mainContent = document.getElementById("main-content");
    if (mainContent) mainContent.style.display = "block";
}

// Функция для начала игры с машинками
let carPuzzleStartBtn = document.getElementById("start-car-puzzle-btn");
if (carPuzzleStartBtn) {
    carPuzzleStartBtn.addEventListener("click", () => {
        alert("Начинаем головоломку с машинками!");
        closeCarPuzzle();
    });
}

// Функция для добавления эффекта подсветки на машины
function addCarGlowEffect() {
    const cars = document.querySelectorAll(".car");
    cars.forEach(car => {
        car.classList.add("animate"); // Добавляем анимацию с подсветкой
    });
}

// Функция для активации RGB подсветки для машины
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



// Открытие головоломки
function openPuzzle() {
    puzzleModal.style.display = "block";
    document.getElementById("main-content").style.display = "none";
}

// Закрытие головоломки
function closePuzzle() {
    puzzleModal.style.display = "none";
    document.getElementById("main-content").style.display = "block";
}

// Подключение кнопок
if (openPuzzleBtn) openPuzzleBtn.addEventListener("click", openPuzzle);
if (closePuzzleBtn) closePuzzleBtn.addEventListener("click", closePuzzle);