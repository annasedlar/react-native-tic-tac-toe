import {MOVEMENT} from './actions';

import _ from 'lodash';

function moveReducer(state, action) {
    let updateBoard = function(currentBoard) {
        let newBoard = [
            [currentBoard[0][0], currentBoard[0][1], currentBoard[0][2]],
            [currentBoard[1][0], currentBoard[1][1], currentBoard[1][2]],
            [currentBoard[2][0], currentBoard[2][1], currentBoard[2][2]]
        ]
        newBoard[action.rowNum][action.colNum] = state.nextPlayer
        return newBoard
    }
    let checkBoardIsFull = function(board) {
        /*
        Returns true if all positions in the board are already fulfilled
        with a value different to null, or false otherwise.
        */
        let isFull = true;
        [0, 1, 2].map((row) => {
            [0, 1, 2].map((col) => {
                if (board[row][col] === null) {
                    isFull = false;
                }
            })
        })
        return isFull;
    }
    let isWinningCombination = function(combinationValues) {
        /*
        Returns true if given combinationValues
        is ["X", "X", "X"] or ["O", "O", "O"], or false otherwise.
        */
        let xWins = !_.without(combinationValues, "X").length;
        let oWins = !_.without(combinationValues, "O").length;
        return xWins || oWins;
    }
    let checkWinningCombination = function(board) {
        let combinations = [
            // horizontals
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],

            // verticals
            [[0,0], [1,0], [2,0]],
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],

            // diagonals
            [[0,0], [1,1], [2,2]],
            [[0,2], [1,1], [2,0]]
        ]
        let foundWinningCombination = false;
        _.forEach(combinations, (combination) => {
            let combinationValues = [];
            _.forEach(combination, (position) => {
                let row = position[0];
                let col = position[1];
                combinationValues.push(board[row][col]);
            });
            if (isWinningCombination(combinationValues)) {
                foundWinningCombination = true;
            }
        });
        return foundWinningCombination;
    }
    let checkGameOver = function(board) {
        if (checkWinningCombination(board)) {
            return state.nextPlayer
        }
        if (checkBoardIsFull(board)) {
            return null
        }
        return false
    }
    if (action.type == 'MOVEMENT') {
        let player = state.nextPlayer == 'X' ? 'O' : 'X'
        let board = updateBoard(state.board)
        let result = checkGameOver(board)
        let winner;
        let gameOver;
        if (result === false) {
            winner = null;
            gameOver = false;
        } else {
            winner = result;
            gameOver = true;
        }
        return {
            winner: winner,
            nextPlayer: player,
            gameOver: gameOver,
            board: board
        }
    } else {
        return {
            winner: null,
            nextPlayer: "X",
            gameOver: false,
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ]
        };
    }
}

export {moveReducer};
