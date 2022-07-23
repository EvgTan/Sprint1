'use strict'

const MINE = '💣'
const FLAG = ' 🚩'
const EMPTY = ' '
const BOOM = '💥'
const LIFE = '💖'
var countLife = 3
const SMILE_NORMAL = '😄'
const SMILE_LOSE = '😥'
const SMILE_WIN = '😎'
const HINT = '💡'
var countHint = 3
var countFlag 

var gBoard
var gBoardSize
var mineCount = 0
var gStartTime
var gTimer = 0
var gLive = 3
var elLive = document.querySelector('.live')
var elSmile = document.querySelector('.smile')
var elHint = document.querySelector('.hint')
var elRes = document.querySelector('.result')
var elTimer = document.querySelector('.timer')


var gCell = {
    gameElement: EMPTY,
    isShown: false,
    minesAroundCount: 0,
    isMarked: false,
    isMine: false
}

var gLevel = {
    SIZE: 4,
    MINES: 2,
    FLAGS: 2,
};

countFlag = gLevel.FLAGS

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    countLife = 3
    if (gTimer) clearInterval(gTimer)

    elTimer.innerText = `Game time: 00:00:00`
    elLive.innerText = LIFE.repeat(countLife)
    elRes.innerText = ''

    gBoardSize = +document.querySelector('input:checked').value
    gBoard = buildBoard(gBoardSize)
    console.log(gBoard)
    renderBoard(gBoard, '.board')

    elSmile.innerText = SMILE_NORMAL
    elHint.innerText = HINT.repeat(countHint)
}
    
function buildBoard(boardSize) {

    var size = Math.sqrt(boardSize)
        
    if (size === 4) gLevel.MINES = gLevel.FLAGS = 2
    if (size === 8) gLevel.MINES = gLevel.FLAGS = 12
    if (size === 12) gLevel.MINES = gLevel.FLAGS = 30

    var board = []
    board = createMat(size,size)
        
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = gCell.gameElement
        }
    }
    for (var i = 0; i < gLevel.MINES; i++) {
            
        var mineIdxI = getRandomIntInclusive(0, size-1)
        var mineIndJ = getRandomIntInclusive(0, size-1)
        board[mineIdxI][mineIndJ] = MINE
        
    }
    return board
}
    
function renderBoard(board, selector) {
        
    var strHTML = ''
    for(var i = 0; i < board.length; i++){
        
        strHTML += '<tr>\n'
        
        for(var j = 0; j < board[i].length; j++){
            const cell = board[i][j]
            var className = `cell cell-${i}-${j}`
        
            strHTML += `
            \t<td 
            class="${className}" 
            oncontextmenu="cellMarked(this,${i}, ${j})"
            onclick="cellClicked(this,${i}, ${j})">
            ${cell}
            </td>\n
            `
        }
        strHTML += '</tr>\n'
    }
    var elTable = document.querySelector(selector)
    elTable.innerHTML = strHTML
}

function cellClicked(elCell, i, j) {
    
    gGame.isOn = true
    gCell.isShown = true
    gStartTime = new Date().getTime()
    if (gGame.isOn === true) gTimer = setInterval(timer, 31) 
    
    var minesCount = setMinesNegsCount(i, j, gBoard)
    
    if (gBoard[i][j] === MINE) {
        console.log('end')
        countLife--
        elSmile.innerText = SMILE_LOSE
        elLive.innerText = LIFE.repeat(countLife)
        console.log(countLife)

        if (countLife === 0) {
        console.log('Game over')
        gameOver()
        }
    } else {
        elCell.innerText = minesCount
    }
    gCell.minesAroundCount = minesCount
}

function gameOver() {
    elRes.innerText = `Game over`
    elSmile.innerText = SMILE_LOSE
    gGame.isOn = false
}

function setMinesNegsCount(cellI, cellJ, mat) {
    var minesAroundCount = 0;

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j] === MINE) minesAroundCount++;
        }
    }
    return minesAroundCount;
}

function cellMarked(elCell) {
    elCell.innerText = FLAG
    countFlag--
    
    if (countFlag === 0) checkGame()
}

function checkGame() {
    console.log('CHECK!')
}

function timer() {
    var currTime = new Date().getTime()
    var timePassed = new Date(currTime - gStartTime)

    var mins = timePassed.getMinutes() < 10 ? '0' : ''
    var secs = timePassed.getSeconds() < 10 ? '0' : ''

    var milSecs = timePassed.getMilliseconds() < 100 ? (timePassed.getMilliseconds() < 10 ? '00' : '0') : ''

    elTimer.innerText = `Game time: ${mins + timePassed.getMinutes()}:${secs + timePassed.getSeconds()}:${timePassed.getMilliseconds() + milSecs}`
}
