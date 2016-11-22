import { Alert } from 'react-native';
import { merge } from 'lodash';
import firebaseApp from '../constants/Firebase';
import { initialState } from './initialState';

const firebaseRef = firebaseApp.database().ref();

export const MOVEMENT = 'MOVEMENT';
export const RESTART = 'RESTART';
export const LOADING = 'LOADING';
export const CREATE_OFFLINE_BOARD = 'CREATE_OFFLINE_BOARD';
export const CREATE_ONLINE_BOARD = 'CREATE_ONLINE_BOARD';
export const CLEAN_ONLINE_BOARD = 'CLEAN_ONLINE_BOARD';
export const LOAD_ONLINE_BOARD = 'LOAD_ONLINE_BOARD';

export const movement = (rowNum, colNum) => (dispatch, getState) => {
  dispatch({
    type: MOVEMENT,
    rowNum,
    colNum
  });

  const { game } = getState();
  const { boardId } = game;

  if (boardId) {
    firebaseRef.child('boards').child(boardId)
    .set(game);
  }
};

export const restart = () => (dispatch, getState) => {
  const { game } = getState();
  const { boardId } = game;
  const emptyBoard = initialState().board;

  if (boardId) {
    dispatch({
      type: CLEAN_ONLINE_BOARD,
      winner: null,
      nextPlayer: game.nextPlayer,
      gameOver: false,
      board: emptyBoard
    });
  } else {
    dispatch({
      type: RESTART,
      game: initialState()
    });
  }
};

export const createOfflineBoard = () => (dispatch) => {
  dispatch({
    type: CREATE_OFFLINE_BOARD,
    game: initialState()
  });
};

export const createOnlineBoard = () => (dispatch) => {
  dispatch({
    type: LOADING,
    loading: true
  });

  const newGame = initialState();
  newGame.boardId = Math.floor(Math.random() * 9000) + 1000;

  firebaseRef.child('boards').child(newGame.boardId)
  .set(newGame)
  .then(() => {
    dispatch({
      type: CREATE_ONLINE_BOARD,
      game: newGame,
      newBoard: newGame.boardId,
      loading: false
    });

    Alert.alert(
      `Your board code is: ${newGame.boardId}`,
      'Share it with your rival!'
    );
  });
};

export const loadOnlineBoard = boardId => (dispatch) => {
  if (boardId) {
    dispatch({
      type: LOADING,
      loading: true
    });

    firebaseRef.child('boards').child(boardId)
    .on('value', (snapshot) => {
      const game = snapshot.val();

      if (game) {
        const emptyBoard = initialState().board;

        if (!game.board) {
          game.board = emptyBoard;
        } else {
          game.board = merge(emptyBoard, game.board);
        }

        dispatch({
          type: LOAD_ONLINE_BOARD,
          game,
          loading: false
        });
      } else {
        // play offline
        dispatch({
          type: RESTART,
          game: initialState()
        });

        Alert.alert('That board code doesn\'t exist', 'don\'t worry, let\'s play offline');
      }
    }, (err) => {
      // play offline
      dispatch({
        type: RESTART,
        game: initialState()
      });

      Alert.alert('That board code doesn\'t exist', 'don\'t worry, let\'s play offline');
    });
  } else {
    // play offline
    dispatch({
      type: RESTART,
      game: initialState()
    });
  }
};
