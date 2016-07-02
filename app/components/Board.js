import React from 'react';
import Row from './Row';

class Board extends React.Component {
    render() {
        return (
            <div className="row board-container">
                <Row onClick={this.props.onClick} rowNum={0} boardRow={this.props.board[0]}/>
                <Row onClick={this.props.onClick} rowNum={1} boardRow={this.props.board[1]}/>
                <Row onClick={this.props.onClick} rowNum={2} boardRow={this.props.board[2]}/>
            </div>
        )
    }
}

export default Board;
