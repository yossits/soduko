//    ***********************************************
//    * WELCOME TO ANDREI AND YOSSI'S SODOKU GAME   *
//    ***********************************************


// www


var andrei;
var steps=0;
var board =[[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]];



//*****************************************************************************************************************
//   *********************************************************
//   * Functions for finding duplicate numbers in the board  *
//   *********************************************************

const hasErrorInRow=(row,col,num) => {
    for(let i=0;i<9;i++){
        if(board[row][i] === num && col !== i){
            return [true, i];
        }
    }
    return [false];
}

const hasErrorInColumn=(row,col,num) => {
    for(let i=0;i<9;i++){
        if(board[i][col] === num && row !== i){
            return [true,i];
        }
    }
    return [false];
}

const hasErrorInSmallMat=(row,col,num) => {
    const firstCubeIndex = {
        0: 0,
        1: 0,
        2: 0,
        3: 3,
        4: 3,
        5: 3,
        6: 6,
        7: 6,
        8: 6,
    }
    let i = firstCubeIndex[row];
    let j = firstCubeIndex[col];
    let maxj=j+3;
    let maxi=i+3;

    for (i; i<maxi; i++) {
        for (j; j<maxj; j++) {
            if (board[i][j] === num) {
                return [true, i, j];
            }
        }
        j = firstCubeIndex[col];
    }
    return [false];
}

//*****************************************************************************************************************

const hasError=(row, col, num) => {
    return hasErrorInRow(row,col,num)[0] || hasErrorInColumn(row,col,num)[0] || hasErrorInSmallMat(row,col,num)[0];
}

const rollNewNumber=() => {

    steps++;
    return Math.floor(Math.random()*9)+1;
}

const rollByPercent=() => {

    return Math.floor(Math.random()*100)+1;
}

const rollNumberForReveal=() => {

    return Math.floor(Math.random()*9);
}

//*****************************************************************************************************************
//   ***********************************************
//   * A function that builds an entire game board *
//   ***********************************************

const fillBoard=() => {
    let count = 0;

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            num=rollNewNumber();
           
            while (hasError(row, col, num)) {
                while (count<50 && hasError(row, col, num)){
                    num=rollNewNumber();
                    count++;
                }
                if(count==50){
                    col = 0;
                    board[row]=[0,0,0,0,0,0,0,0,0];
                    row--;
                    board[row]=[0,0,0,0,0,0,0,0,0];
                }
                count=0;
            }
            board[row][col]=num;
        }
    }
    console.log(board);
    return board;
}


//*****************************************************************************************************************

const logInUser=(userName, password) => {
    const subscribers = [{userName:'abcd',password:1234},
                       {userName:'yossi',password:1234},
                       {userName:'andrei',password:1234}]

let inputUserName = 
let 
}

//*****************************************************************************************************************
//   ***********************************************
//   * A function that selects a difficulty level  *
//   ***********************************************


const selectionOfDifficultyLevel=() => {

    fillBoard();
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if(rollByPercent() < 26){
                board[row][col] = 0;
            }
        }
    }


}


const reveal=(dificulty) => {
    let flag =0,col,row;
    for(let i=0;i<dificulty;i++){
        flag =0;
        while(flag==0){
            col = rollNumberForReveal();
            row = rollNumberForReveal();
            if(board[row][col]==0){
                continue;
            }
            else{
                flag=1;
                board[row][col]=0;
            }
        }
    }
}
const fillHtml=() => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(board[i][j]!=0){
                document.getElementById('div'+i+''+j).innerHTML = board[i][j];
            }
        }
    }
}

fillBoard();
reveal(80);
fillHtml();

//*****************************************************************************************************************


const openPopup = () => {
    const popup = document.getElementById('popup2');
    popup.style.display = "block";
}

const closePopup = () => {
    const popup = document.getElementById('popup2');
    popup.style.display = "none";
}

const selectNumberForCell = function (e) {
    andrei = e.target.id;
    e.stopPropagation();
    // e.stopP
    var x = e.clientX,
        y = e.clientY;
    
    // tool.style.top = (y-70)+'px';
    // tool.style.left = (x-70)+'px';
    openPopup();
}

const insertNum = (num) => {
    document.getElementById(andrei).innerHTML = num;
    closePopup();
}

window.onclick = closePopup;
