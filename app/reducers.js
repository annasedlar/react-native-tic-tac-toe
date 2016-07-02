import {MOVEMENT} from './actions';

function moveReducer(state, action) {
    // action.rowNum
    // action.colNum
    // action.player
    let updateBoard = function(currentBoard) {
        let newBoard = [
            [currentBoard[0][0], currentBoard[0][1], currentBoard[0][2]],
            [currentBoard[1][0], currentBoard[1][1], currentBoard[1][2]],
            [currentBoard[2][0], currentBoard[2][1], currentBoard[2][2]]
        ]
        newBoard[action.rowNum][action.colNum] = action.player
        return newBoard
    }
    if (action.type == 'MOVEMENT') {
        return {
            winner: null,
            nextPlayer: action.player == "X" ? "O" : "X",
            board: updateBoard(state.board)
        }
    } else {
        return {
            winner: null,
            nextPlayer: "X",
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ]
        };
    }
}

export {moveReducer};
