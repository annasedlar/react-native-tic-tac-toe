import { Constants } from 'expo';

export const initialState = () => ({
  boardId: null,
  creator: Constants.deviceId,
  winner: null,
  nextPlayer: 'X',
  gameOver: false,
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  newBoard: null,
  loading: false
});
