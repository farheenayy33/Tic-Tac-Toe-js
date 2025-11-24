const boxes = Array.from(document.querySelectorAll(".box"));
const resetBtn = document.querySelector("#Reset-btn");
const newGame = document.querySelector("#new-game");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
let turnO = true;
let gameOver = false;
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function resetGame() {
    turnO = true;
    gameOver = false;
    msgContainer.classList.add("hide");
    msg.innerText = "";
    msg.style.color = "";
    enableBoxes();
}
function enableBoxes() {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "";
    });
}
function disableBoxes() {
    boxes.forEach(box => box.disabled = true);
}
function showWinner(winner) {
    msg.innerText = `Congratulations!! Winner is ${winner} ❤️`;
    msg.style.color = "rgb(224, 64, 171)";
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true;
}
function showDraw() {
    msg.innerText = `It's a Draw!`;
    msg.style.color = "orange";
    msgContainer.classList.remove("hide");
    gameOver = true;
}
function checkWin() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const valA = boxes[a].innerText;
        const valB = boxes[b].innerText;
        const valC = boxes[c].innerText;
        if (valA !== "" && valA === valB && valB === valC) {
            showWinner(valA);
            return;
        }
    }
    const allFilled = boxes.every(box => box.innerText !== "");
    if (!gameOver && allFilled) {
        showDraw();
    }
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return;
        if (box.innerText !== "") return;
        if (turnO) {
            box.innerText = "O";
            box.style.color = "green";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "blue";
            turnO = true;
        }
        box.disabled = true;
        checkWin();
    });
});
newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
