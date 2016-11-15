import _ from 'lodash';
import { MOVEMENT, RESTART } from './actions';
import { initialState } from './initialState';

const moveReducer = (state = initialState, action) => {
  const updateBoard = (currentBoard) => {
    console.log('UPDATE BOARD');
    console.log(action.rowNum, action.colNum);
    const newBoard = [
            [currentBoard[0][0], currentBoard[0][1], currentBoard[0][2]],
            [currentBoard[1][0], currentBoard[1][1], currentBoard[1][2]],
            [currentBoard[2][0], currentBoard[2][1], currentBoard[2][2]]
    ];
    newBoard[action.rowNum][action.colNum] = state.nextPlayer;
    return newBoard;
  };

  const checkBoardIsFull = (board) => {
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
      });
    });
    return isFull;
  };

  const isWinningCombination = (combinationValues) => {
        /*
        Returns true if given combinationValues
        is ["X", "X", "X"] or ["O", "O", "O"], or false otherwise.
        */
    const xWins = !_.without(combinationValues, 'X').length;
    const oWins = !_.without(combinationValues, 'O').length;
    return xWins || oWins;
  };

  const checkWinningCombination = (board) => {
    const combinations = [
            // horizontals
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],

            // verticals
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],

            // diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
    ];
    let foundWinningCombination = false;
    _.forEach(combinations, (combination) => {
      const combinationValues = [];
      _.forEach(combination, (position) => {
        const row = position[0];
        const col = position[1];
        combinationValues.push(board[row][col]);
      });
      if (isWinningCombination(combinationValues)) {
        foundWinningCombination = true;
      }
    });
    return foundWinningCombination;
  };

  const checkGameOver = (board) => {
    if (checkWinningCombination(board)) {
      return state.nextPlayer;
    }
    if (checkBoardIsFull(board)) {
      return null;
    }
    return false;
  };

  switch (action.type) {
    case MOVEMENT:
      const player = state.nextPlayer === 'X' ? 'O' : 'X';
      const board = updateBoard(state.board);
      const result = checkGameOver(board);
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
        winner,
        nextPlayer: player,
        gameOver,
        board
      };
    case RESTART:
      return initialState;
    default:
      return state;
  }
};

export { moveReducer };
