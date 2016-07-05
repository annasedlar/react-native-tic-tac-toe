import React from 'react';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import {movement} from './actions.js';

class TicTacToe extends React.Component {
    constructor(props){
        super(props);
        this.store = props.store;
        this.state = this.store.getState();
    }
    componentWillMount() {
        let store = this.store;
        let self = this;
        store.subscribe(() => self.setState(
            store.getState()
        ));
    }
    clickButton(row, col) {
        this.store.dispatch(movement(row, col));
    }
    getColor() {
        let currentPlayer = this.state.nextPlayer == "X" ? "O" : "X"
        let colorMapping = {
            "X": "player-x",
            "O": "player-o",
        }
        return this.state.winner ?
            colorMapping[currentPlayer] : colorMapping[this.state.nextPlayer]
    }
    render() {
        return (
            <div className="center-block game-container">
                <div className="row">
                  <div className="col-xs-12 text-center">
                    <h1>React - Tic Tac Toe</h1>
                  </div>
                </div>
                <Board
                    board={this.state.board}
                    gameOver={this.state.gameOver}
                    onClick={this.clickButton.bind(this)}
                />
                <div className={"row text-center player-info " + this.getColor()}>
                    <GameStatus
                        nextPlayer={this.state.nextPlayer}
                        gameOver={this.state.gameOver}
                        winner={this.state.winner}
                    />
                </div>
            </div>
        )
    }
}

export default TicTacToe;
