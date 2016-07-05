import React from 'react';
import Button from './Button';

class Row extends React.Component {
    render() {
        let gameButtons = [0, 1, 2].map((val) => {
            return <Button
                    rowNum={this.props.rowNum}
                    colNum={val}
                    gameOver={this.props.gameOver}
                    buttonValue={this.props.boardRow[val]}
                    onClick={this.props.onClick}
                    key={val}
                    />
        })
        return (
            <div className="row">
                {gameButtons}
            </div>
        )
    }
}

export default Row;
