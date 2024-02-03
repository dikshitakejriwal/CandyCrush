let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"]
let board = [];
const rows = 9;
const columns = 9;
let score = 0;

var currTile;
var otherTile;


window.onload = () => {
    startGame();

    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100)
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

//Generate random candies and place them on the board
function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <img id = "0-0">
            let tile = document.createElement('img')
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            // DRAG FUNCTIONALITY
            tile.addEventListener('dragstart', dragStart); // click on the candy, initialize the drag process
            tile.addEventListener('dragover', dragOver); // clicking on the candy, moving mouse to drag the candy
            tile.addEventListener('dragenter', dragEnter);//dragging the candy onto another candy
            tile.addEventListener('dragleave', dragLeave); //leave candy over another candy
            tile.addEventListener('drop', dragDrop); // dropping candy over another candy
            tile.addEventListener('dragend', dragEnd); // after drag process is completed we swap the candies

            document.getElementById("board").append(tile);
            row.push(tile);

        }
        board.push(row)
    }
    console.log(board)

}

function dragStart() {
    //this refers to the tile that was clicked on initially
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    //this refers to the target tile that was dropped on
    otherTile = this;
}

function dragEnd() {

    //dont swap candy with any blank candy
    if (currTile.src.includes('blank') || otherTile.src.includes("blank")) {
        return;
    }

    let currCoord = currTile.id.split('-')
    let r1 = parseInt(currCoord[0])
    let c1 = parseInt(currCoord[1])

    let otherCoord = otherTile.id.split('-')
    let r2 = parseInt(otherCoord[0])
    let c2 = parseInt(otherCoord[1])

    let moveLeft = c2 == c1 - 1 && r2 == r1;
    let moveRight = c2 == c1 + 1 && r2 == r1;
    let moveUp = r2 == r1 - 1 && c2 == c1;
    let moveDown = r2 == r1 + 1 && c2 == c1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
    }

    let validMove = checkValid();
    if (!validMove) {
        //if not a valid move then I swap back again
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
    }
}


function crushCandy() {
    //crushFive()
    //crushFour()
    crushThree()
    document.getElementById('score').innerText = score;
}

function crushThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c]
            let candy2 = board[r][c + 1]
            let candy3 = board[r][c + 2]
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                candy1.src = './images/blank.png';
                candy2.src = './images/blank.png';
                candy3.src = './images/blank.png';
                score += 30;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c]
            let candy2 = board[r + 1][c]
            let candy3 = board[r + 2][c]
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                candy1.src = './images/blank.png';
                candy2.src = './images/blank.png';
                candy3.src = './images/blank.png';
                score += 30;
            }
        }
    }
}

function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c]
            let candy2 = board[r][c + 1]
            let candy3 = board[r][c + 2]
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                return true
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c]
            let candy2 = board[r + 1][c]
            let candy3 = board[r + 2][c]
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                return true
            }
        }
    }
    
    return false
}


function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns - 1; r >= 0; r--){
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r --) {
            board[r][c].src = './images/blank.png'
        }
    }
}

function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes('blank')) {
            board[0][c].src = './images/' + randomCandy() + '.png';
        }
    }
}