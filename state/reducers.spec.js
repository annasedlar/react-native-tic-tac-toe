import { moveReducer } from './reducers.js';
import { movement } from './actions.js';

import expect from 'expect';

describe('moveReducer() > ', () => {
  let emptyBoard;
  let defaultState;
  beforeEach(() => {
    emptyBoard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
    ];
    defaultState = {
      winner: null,
      nextPlayer: 'X',
      gameOver: false,
      board: emptyBoard
    };
  });
  it('should return updated board when making a movement', () => {
    const expected = {
      winner: null,
      nextPlayer: 'O',
      gameOver: false,
      board: [
                ['X', null, null],
                [null, null, null],
                [null, null, null]
      ]
    };
    expect(moveReducer(defaultState, movement(0, 0))).toEqual(expected);
  });
  it('should get player X as winner when finding a winning combination', () => {
    const state = {
      winner: null,
      nextPlayer: 'X',
      gameOver: false,
      board: [
                ['X', 'O', null],
                ['X', 'O', null],
                [null, null, null]
      ]
    };
    const expected = {
      winner: 'X',
      nextPlayer: 'O',
      gameOver: true,
      board: [
                ['X', 'O', null],
                ['X', 'O', null],
                ['X', null, null]
      ]
    };
    expect(moveReducer(state, movement(2, 0))).toEqual(expected);
  });
  it('should get tied game when board is full and there is no winner', () => {
    const state = {
      winner: null,
      nextPlayer: 'X',
      gameOver: false,
      board: [
                ['X', 'O', 'X'],
                ['X', 'O', 'O'],
                ['O', 'X', null]
      ]
    };
    const expected = {
      winner: null,
      nextPlayer: 'O',
      gameOver: true,
      board: [
                ['X', 'O', 'X'],
                ['X', 'O', 'O'],
                ['O', 'X', 'X']
      ]
    };
    expect(moveReducer(state, movement(2, 2))).toEqual(expected);
  });
});
