const mazeContainer = document.getElementById("maze");
const startCell = document.createElement("div");
const endCell = document.createElement("div");
let playerPosition = [0, 0];
const mazeSize = 10;

function createMaze() {
    for (let row = 0; row < mazeSize; row++) {
        for (let col = 0; col < mazeSize; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (row === 0 && col === 0) {
                cell.classList.add("start");
                startCell.innerHTML = "S";
                cell.appendChild(startCell);
            } else if (row === mazeSize - 1 && col === mazeSize - 1) {
                cell.classList.add("end");
                endCell.innerHTML = "E";
                cell.appendChild(endCell);
            }
            mazeContainer.appendChild(cell);
        }
    }
}

createMaze();

document.addEventListener("keydown", (event) => {
    movePlayer(event.key);
});

function movePlayer(direction) {
    const [row, col] = playerPosition;
    let newRow = row;
    let newCol = col;

    if (direction === "ArrowUp" && row > 0) {
        newRow--;
    } else if (direction === "ArrowDown" && row < mazeSize - 1) {
        newRow++;
    } else if (direction === "ArrowLeft" && col > 0) {
        newCol--;
    } else if (direction === "ArrowRight" && col < mazeSize - 1) {
        newCol++;
    }

    if (!isWall(newRow, newCol)) {
        const currentCell = mazeContainer.children[row * mazeSize + col];
        currentCell.removeChild(startCell);

        const newCell = mazeContainer.children[newRow * mazeSize + newCol];
        newCell.appendChild(startCell);

        playerPosition = [newRow, newCol];
    }

    if (playerPosition[0] === mazeSize - 1 && playerPosition[1] === mazeSize - 1) {
        alert("Congratulations! You've reached the end.");
        playerPosition = [0, 0];
        createMaze();
    }
}

function isWall(row, col) {
    const cell = mazeContainer.children[row * mazeSize + col];
    return cell.classList.contains("cell");
}
