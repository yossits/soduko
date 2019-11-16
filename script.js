//***********************************************/
//* Welcome to Andrei and Yossi's Sudoku game   */
//***********************************************/

//A function prints an index of a matrix[row][col]
var board =[[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]];

function Auto_fill_table(){
    var count=0;
    for (let y = 0; y < 9; y++) {
        for(let x=0 ;x<9; x++){
            let index=(''+y+x);
            document.getElementById(index).innerHTML=index;
            count++;
        }
    }
}

function hasErrorInRow(row,col,num){
    for(let i=0;i<9;i++){
        if(board[row][i] === num && col !== i){
            return [true, i];
        }
    }
    return [false];
}

function hasErrorInColumn(row,col,num){
    for(let i=0;i<9;i++){
        if(board[i][col] === num && row !== i){
            return [true,i];
        }
    }
    return [false];
}

function hasErrorInSmallMat(row,col,num){
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
                if (!(row === i && col === j)) {
                    return [true, i, j];
                }
            }
        }
    }
    return [false];
}

function hasError(row, col, num) {
    return hasErrorInRow(row,col,num)[0] || hasErrorInColumn(row,col,num)[0] || hasErrorInSmallMat(row,col,num)[0] || typeof num !== 'number';
}

function hasMoreOptions(arr) {  
    return arr.length>0; 
}

function remomveNotWorkingOption(notWorkingOption, remainOptions, notWorkingNumber, notWorkingNumberIndex) {  
    notWorkingOption.push(notWorkingNumber);
    remainOptions.splice(notWorkingNumberIndex,1);
}

function rollNewIndex(arr) {
    return Math.floor(Math.random()*arr.length);
}

function triedAllOption(arr) {
    return arr.length==0
}

function isFirstCell(col) {
    return col === 0;
}
debugger;
function fillboard() {
    let index;
    let remainOptions=[1,2,3,4,5,6,7,8,9];
    let notWorkingOption=[];

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            index=rollNewIndex(remainOptions);
           
            while (hasError(row, col, remainOptions[index])) {
                if (hasMoreOptions(remainOptions)){
                    remomveNotWorkingOption(notWorkingOption, remainOptions, remainOptions[index], index);
                }
                if (triedAllOption(remainOptions) && !isFirstCell(col)){
                    remainOptions=notWorkingOption;
                    notWorkingOption=[];
                    col--;
                    // notWorkingOption.push(board[row][col]);
                    board[row][col]=0;
                }
                if (triedAllOption(remainOptions) && isFirstCell(col)){
                    remainOptions=[1,2,3,4,5,6,7,8,9];
                    notWorkingOption=[];
                    row--;
                    col=8;
                }
                index=rollNewIndex(remainOptions);
            }
            if (remainOptions[index] === undefined) {
            }
            board[row][col]=remainOptions[index];
            remainOptions.splice(index,1);
        }
        remainOptions=[1,2,3,4,5,6,7,8,9];
        notWorkingOption=[];
    }
    console.log(board);
}
fillboard();

