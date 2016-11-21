import { Constants } from 'exponent';
import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';

class GameStatus extends React.Component {
  render() {
    let nextPlayer = this.props.nextPlayer;

    // change nextPlayer on online game
    if (this.props.boardId) {
      if (Constants.deviceId === this.props.creator) {
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

    if (this.props.gameOver) {
      if (this.props.winner) {
        return (
          <Text style={styles.text}>
            Game Over: {this.props.winner} wins!
          </Text>
        );
      }

      return (
        <Text style={styles.text}>
          Game Over: Game is tied!
        </Text>
      );
    }

    return (
      <Text style={styles.text}>
        Next player: {nextPlayer}
      </Text>
    );
  }
}

GameStatus.propTypes = {
  boardId: PropTypes.number,
  creator: PropTypes.string,
  nextPlayer: PropTypes.string,
  gameOver: PropTypes.bool,
  winner: PropTypes.string
};

const styles = StyleSheet.create({
  text: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600'
  }
});

export default GameStatus;
