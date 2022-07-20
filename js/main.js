'use strict'

var gBoard
var gBoardSize
var mine = '*'
var mine_img = '<img src="img/mine.png">';
var mineCount = 0

var gCell = {
	minesAroundCount: 4,
	isShown: true,
	isMine: false,
	isMarked: true,
}

var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function initGame() {
	gBoardSize = +document.querySelector('input:checked').value
	gBoard = buildBoard(gBoardSize)
	console.log(gBoard)
	renderBoard(gBoard, '.board')
}




function buildBoard(boardSize) {
	var size = Math.sqrt(boardSize)
	var board = []
	board = createMat(size,size)

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {

				board[i][j] = ''
		}
    }
	board[1][1] = mine
	board[2][2] = mine
    return board
}

function renderBoard(board) {
    console.table(board)

    var strHTML = ''
    for(var i = 0; i < board.length; i++){

        strHTML += '<tr>\n'
        
        for(var j = 0; j < board[i].length; j++){
            var strClass = board[i][j] ? 'marked' : ''
            strHTML += `
                \t<td 
                    class="${strClass}"
                    data-i="${i}" data-j="${j}"
                    onclick="cellClicked(this,${i}, ${j})">
                        ${board[i][j]}
                </td>\n
            `
        }
        strHTML += '</tr>\n'
    }
    var elTable = document.querySelector('.board')
    elTable.innerHTML = strHTML
}
