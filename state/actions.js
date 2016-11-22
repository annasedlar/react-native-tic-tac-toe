import { Alert } from 'react-native';
import { merge } from 'lodash';
import firebaseApp from '../constants/Firebase';
import { initialState } from './initialState';

const firebaseRef = firebaseApp.database().ref();

export const MOVEMENT = 'MOVEMENT';
export const RESTART = 'RESTART';
export const LOAD_BOARD = 'LOAD_BOARD';
export const CREATE_BOARD = 'CREATE_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';

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

export const restart = () => (dispatch) => {
  dispatch({
    type: RESTART,
    game: initialState()
  });
};

export const createBoard = () => (dispatch) => {
  const newGame = initialState();
  newGame.boardId = Math.floor(Math.random() * 9000) + 1000;

  firebaseRef.child('boards').child(newGame.boardId)
  .set(newGame)
  .then(() => {
    dispatch({
      type: CREATE_BOARD
    });

    Alert.alert(
      `Your board code is: ${newGame.boardId}`,
      'Share it with your rival!'
    );
  });
};

export const loadBoard = boardId => (dispatch) => {
  if (boardId) {
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
          type: LOAD_BOARD,
          game
        });
      } else {
        // play offline
        restart();
        Alert.alert('That board code doesn\'t exist');
      }
    }, (err) => {
      // play offline
      restart();
      Alert.alert('That board code doesn\'t exist');
    });
  }
};
