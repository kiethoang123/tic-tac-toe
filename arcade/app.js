const cells = document.querySelectorAll(".cell");
const turnText = document.querySelector("#turnText");
const restart = document.querySelector("#restart");
//checking rows, columns, and diagonals for winning outcome
const winningConditions=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];

let choices = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
let running = false;

startGame();

function startGame(){
    //each time a cell is clicked it calls the clickedBox function
    cells.forEach(cell => cell.addEventListener("click",clickedBox));
    //calls the restartGame function when restart button is clicked
    restart.addEventListener("click",restartGame);
    turnText.textContent = `${currPlayer}'s turn`;
    running = true;
}
function clickedBox(){
    //gets the index number
    const cellIndex = this.getAttribute("cellIndex");

    //if index at cellIndex is empty or game not running do nothing
    if(choices[cellIndex] != ""|| !running){
        return;
    }
    //otherwise run the functions update, and checkWinner
    update(this,cellIndex);
    checkWinner();

}
//updating the placeholder and changing the content in the cell
function update(cell, index){
    choices[index] = currPlayer;
    cell.textContent = currPlayer;

}
//if current player is x, reassign current player to O, otherwise X
function playerChange(){
    currPlayer = (currPlayer == "X") ? "O" : "X";
    turnText.textContent = `${currPlayer}'s turn`;
}
function checkWinner(){

    //looping through all of the winning conditions array
    let roundWon = false;

    for(let i = 0; i < winningConditions.length; i++){
        const condition = winningConditions[i];
        const cellA = choices[condition[0]];
        const cellB = choices[condition[1]];
        const cellC = choices[condition[2]];


        //check if there's empty spaces
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        //check if its the same player
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        turnText.textContent = `${currPlayer} wins!`;
        running = false;
    }
    else if(!choices.includes("")){
        turnText.textContent = `tie!`;
        running = false;
    }
    else{
        playerChange();
    }
}
// Restart the game by clearing out the tiles
function restartGame(){
    currPlayer = "X";
    choices = ["", "", "", "", "", "", "", "", ""];
    turnText.textContent = `${currPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
