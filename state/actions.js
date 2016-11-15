export const MOVEMENT = 'MOVEMENT';
export const RESTART = 'RESTART';

const movement = (rowNum, colNum) => ({
  type: 'MOVEMENT',
  rowNum,
  colNum
});

const restart = () => ({
  type: 'RESTART'
});


export { movement, restart };
