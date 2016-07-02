import React from 'react';
import Board from './components/Board';


class TicTacToe extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nextPlayer: "X",
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            solutions: [
                [[0,0], [0,1], [0,2]],
                [[1,0], [1,1], [1,2]],
                [[2,0], [2,1], [2,2]],
                [[0,0], [1,0], [2,0]],
                [[0,1], [1,1], [2,1]],
                [[0,2], [1,2], [2,2]],
                [[0,0], [1,1], [2,2]],
                [[0,2], [1,1], [2,0]],
            ]
        };
    }
    changePlayer(currentPlayer){
        let res = currentPlayer === "X" ? "X" : "O"
        return res
    }
    checkSolution(board){
        console.log("TODO: CHECK SOLUTION")
    }
    clickButton(row, col){
        // Update Board
        let board = this.state.board
        board[row][col] = this.state.nextPlayer

        // Update Player
        let nextPlayer = this.state.nextPlayer
        nextPlayer = (nextPlayer == "X") ? "O" : "X"

        this.setState({
            nextPlayer: nextPlayer,
            board: board
        }, () => {
            this.checkSolution(board);
        });
    }
    render() {
        return (
            <div className="center-block game-container">
                <div className="row">
                  <div className="col-xs-12 text-center">
                    <h1>React - Tic Tac Toe</h1>
                  </div>
                </div>
                <Board board={this.state.board} onClick={this.clickButton.bind(this)}/>
                <div className="row text-center player-info">
                    <p>Next player: <span>{this.state.nextPlayer}</span></p>
                </div>
            </div>
        )
    }
}

export default TicTacToe;
