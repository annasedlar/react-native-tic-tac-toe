export const MOVEMENT = 'MOVEMENT';

let movement = (rowNum, colNum, player) => {
    return {
        type: 'MOVEMENT',
        rowNum: rowNum,
        colNum: colNum,
        player: player
    }
};

export {movement};
