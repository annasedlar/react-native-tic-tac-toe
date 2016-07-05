import React from 'react';
import Row from './Row';

class Board extends React.Component {
    render() {
        let gameRows = [0, 1, 2].map((val) => {
            return <Row
            onClick={this.props.onClick}
            rowNum={val}
            boardRow={this.props.board[val]}
            gameOver={this.props.gameOver}
            key={val}
            />
        })
        return (
            <div className="row board-container">
                <div className="col-xs-12">
                    {gameRows}
                </div>
            </div>
        )
    }
}

export default Board;
