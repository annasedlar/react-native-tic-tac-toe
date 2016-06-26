import React from 'react';
import Row from './Row';

class Board extends React.Component {
    render() {
        return (
            <div className="row board-container">
                <Row number="0" onClick={this.props.onClick} row={this.props.board[0]}/>
                <Row number="1" onClick={this.props.onClick} row={this.props.board[1]}/>
                <Row number="2" onClick={this.props.onClick} row={this.props.board[2]}/>
            </div>
        )
    }
}

export default Board;
