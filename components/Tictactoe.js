import React, { PropTypes } from 'react';
import { View, Text, StyleSheet,
         Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Components, Constants } from 'exponent';
import Colors from '../constants/Colors';
import Board from './Board';
import GameStatus from './GameStatus';
import OptionItem from './OptionItem';
import { movement, restart } from '../state/actions';

const windowWidth = Dimensions.get('window').width;

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);

    this.clickMovement = this.clickMovement.bind(this);
    this.clickRestart = this.clickRestart.bind(this);
  }

  getColor() {
    const currentPlayer = this.props.game.nextPlayer === 'X' ? 'O' : 'X';
    const colorMapping = {
      X: Colors.X,
      O: Colors.O
    };

    return this.props.game.winner ?
            colorMapping[currentPlayer] : colorMapping[this.props.game.nextPlayer];
  }

  clickMovement(row, col) {
    this.props.movement(row, col);
  }

  clickRestart() {
    this.props.restart();
  }

  render() {
    let reload;
    let nextPlayer = this.props.game.nextPlayer;

    if (this.props.game.boardId) {
      // change nextPlayer on online game
      if (Constants.deviceId === this.props.game.creator) {
        if (nextPlayer === 'X') {
          nextPlayer = 'Me';
        } else if (nextPlayer === 'O') {
          nextPlayer = 'Rival';
        }
      } else if (nextPlayer === 'X') {
        nextPlayer = 'Rival';
      } else if (nextPlayer === 'O') {
        nextPlayer = 'Me';
      }
    }

    if (!this.props.game.boardId || this.props.game.gameOver) {
      reload = (
        <OptionItem
          text={'Restart!'}
          icon={'refresh'}
          iconColor={Colors.warning}
          onPress={this.clickRestart}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.game.boardId ? 'Online' : 'Offline'} play!
          {this.props.game.boardId ? ` - board: ${this.props.game.boardId}` : ''}
        </Text>

        <View style={styles.gameContainer}>
          <Components.LinearGradient
            colors={[Colors.primary, Colors.primary700]}
            style={styles.gameContainerGradient}
          >
            <Board
              board={this.props.game.board}
              gameOver={this.props.game.gameOver}
              onClick={nextPlayer === 'Rival' ? () => {} : this.clickMovement}
            />
          </Components.LinearGradient>
        </View>

        <View style={[styles.gameStatus, { backgroundColor: this.getColor() }]}>
          <GameStatus
            boardId={this.props.game.boardId}
            creator={this.props.game.creator}
            nextPlayer={nextPlayer}
            gameOver={this.props.game.gameOver}
            winner={this.props.game.winner}
          />
        </View>

        {reload}
      </View>
    );
  }
}

TicTacToe.propTypes = {
  boardId: PropTypes.number,
  game: PropTypes.object,
  movement: PropTypes.func,
  restart: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },

  title: {
    color: '#FFF',
    fontSize: 14,
    fontStyle: 'italic',
    marginHorizontal: 10
  },

  gameContainer: {
    height: windowWidth,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.primary300,
    marginTop: 0,
    margin: 10
  },

  gameContainerGradient: {
    flex: 1
  },

  gameStatus: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => ({
  game: state.game
});

export default connect(
  mapStateToProps,
  { movement, restart }
)(TicTacToe);
