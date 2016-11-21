import firebaseApp from '../constants/Firebase';

const firebaseRef = firebaseApp.database().ref();

export const MOVEMENT = 'MOVEMENT';
export const RESTART = 'RESTART';
export const LOAD_BOARD = 'LOAD_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';

export const movement = (rowNum, colNum, boardId) => (dispatch, getState) => {
  dispatch({
    type: MOVEMENT,
    rowNum,
    colNum,
    boardId
  });

  if (getState().game.boardId) {
    firebaseRef.child('boards').child(getState().game.boardId)
    .set(getState().game);
  }
};

export const restart = () => (dispatch) => {
  dispatch({
    type: RESTART
  });
};

export const loadBoard = board => (dispatch) => {
  dispatch({
    type: LOAD_BOARD,
    onlineGame: board
  });
};
