export const MOVEMENT = 'MOVEMENT';
export const RESTART = 'RESTART';

let movement = (rowNum, colNum) => {
    return {
        type: 'MOVEMENT',
        rowNum: rowNum,
        colNum: colNum
    }
};

let restart = () => {
    return {
        type: 'RESTART'
    }
};


export {movement, restart};
