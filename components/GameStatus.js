import React from 'react';

class GameStatus extends React.Component {
    render() {
        if (this.props.gameOver) {
            if (this.props.winner) {
                return <p>Game Over: <span>{this.props.winner} wins!</span></p>
            } else {
                return <p>Game Over: <span>Game is tied!</span></p>
            }
        }
        return <p>Next player: <span>{this.props.nextPlayer}</span></p>
    }
}

export default GameStatus;
