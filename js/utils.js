'use strict'

function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}



// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getTime() {
    return new Date().toString().split(' ')[4];
}

// function runGeneration(board) {
//     var newBoard = copyMat(board)

//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {

//             var numOfNeighbors = countNeighbors(i, j, board)

//             if ((numOfNeighbors > 2) && (numOfNeighbors < 6)) {
//                 if (board[i][j] === '') newBoard[i][j] = LIFE;
//             }
//             else if (board[i][j] === LIFE) newBoard[i][j] = '';
//         }
//     }
//     return newBoard;
// }


// function countNeighbors(cellI, cellJ, mat) {
//     var neighborsCount = 0;

//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= mat.length) continue;

//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (i === cellI && j === cellJ) continue;
//             if (j < 0 || j >= mat[i].length) continue;
//             if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) neighborsCount++;
//         }
//     }
//     return neighborsCount;
// }
// 


// setTimeout(() => alert('Times up!'), 3000)

// players.sort((p1, p2) => p1.score - p2.score)

function printPrimaryDiagonal(squareMat) {
	for (var d = 0; d < squareMat.length; d++) {
		var item = squareMat[d][d]
		console.log(item)
	}
}

function printSecondaryDiagonal(squareMat) {
	for (var d = 0; d < squareMat.length; d++) {
		var item = squareMat[d][squareMat.length - d - 1]
		console.log(item)
	}
}

function countFoodAround(board, rowIdx, colIdx) {
	var foodCount = 0
	for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
		if (i < 0 || i >= board.length) continue
		for (var j = colIdx - 1; j <= colIdx + 1; j++) {
			if (j < 0 || j >= board[0].length) continue
			var currCell = board[i][j]
			if (currCell === FOOD) foodCount++
		}
	}
return foodCount
}

function findBestPos(board) {
	var maxFoodCount = 0
	var bestPos = null
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			if (board[i][j] === FOOD) continue
			var count = countFoodAround(board, i, j)
			if (count > maxFoodCount) {
				maxFoodCount = count
				bestPos = { i: i, j: j }
			}
		}
	}
return bestPos
}

function countActiveNegs(board, rowIdx, colIdx) {
	var count = 0
	for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
		if (i < 0 || i >= board.length) continue
		for (var j = colIdx - 1; j <= colIdx + 1; j++) {
			if (i === rowIdx && j === colIdx) continue
			if (j < 0 || j >= board[0].length) continue
			var currCell = board[i][j]
			if (currCell.isActive) count++
		}
	}
return count
}
