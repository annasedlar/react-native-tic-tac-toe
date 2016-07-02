import {moveReducer} from './reducers.js';
import {movement} from './actions.js';

import expect from 'expect';

describe('moveReducer() > ', () => {
    let emptyBoard;
    let defaultState;
    beforeEach(() => {
        emptyBoard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
        defaultState = {
            winner: null,
            nextPlayer: "X",
            board: emptyBoard
        }
    })
    it("should return updated board when ...", () => {
        let expected = {
            winner: null,
            nextPlayer: "O",
            board: [
                ["X", null, null],
                [null, null, null],
                [null, null, null]
            ]
        }
        expect(moveReducer(defaultState, movement(0, 0, "X"))).toEqual(expected);
    })
});
