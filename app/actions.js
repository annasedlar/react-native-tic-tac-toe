export const MOVEMENT = 'MOVEMENT';

let movement = (rowNum, colNum) => {
    return {
        type: 'MOVEMENT',
        rowNum: rowNum,
        colNum: colNum
    }
};

export {movement};
