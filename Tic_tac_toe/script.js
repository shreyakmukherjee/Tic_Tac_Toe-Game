const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.getElementById('resetButton');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modalMessage');
const modalResetButton = document.getElementById('modalResetButton');
const closeButton = document.getElementById('closeButton');
const turnIndicator = document.getElementById('turnIndicator'); // Turn indicator element
let isOTurn = false;

// Initialize the board
const initializeGame = () => {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    isOTurn = false;
    updateTurnIndicator();
    closeModal();
};

// Handle cell click
const handleClick = (e) => {
    const cell = e.target;
    const currentClass = isOTurn ? 'o' : 'x';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        showModal(`${currentClass.toUpperCase()} Wins!`);
    } else if (isDraw()) {
        showModal("It's a Draw!");
    } else {
        swapTurns();
    }
};

// Place mark on the cell
const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();
};

// Swap turns
const swapTurns = () => {
    isOTurn = !isOTurn;
    updateTurnIndicator();
};

// Update the turn indicator
const updateTurnIndicator = () => {
    turnIndicator.textContent = isOTurn ? "O's Turn" : "X's Turn";
};

// Check for win
const checkWin = (currentClass) => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
};

// Check for draw
const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
};

// Show modal with message
const showModal = (message) => {
    modalMessage.textContent = message;
    modal.style.display = 'flex';
};

// Close modal
const closeModal = () => {
    modal.style.display = 'none';
};

// Change background color smoothly
const changeBackgroundColor = (color) => {
    document.body.style.backgroundColor = color;
};

// Example usage: Change background color when game is reset
resetButton.addEventListener('click', () => {
    initializeGame();
    changeBackgroundColor('#7c4dff'); // Default color
});

// Modal reset button
modalResetButton.addEventListener('click', () => {
    initializeGame();
    changeBackgroundColor('#7c4dff'); // Default color
});

// Close button for modal
closeButton.addEventListener('click', closeModal);

// Initialize the game on page load
initializeGame();
