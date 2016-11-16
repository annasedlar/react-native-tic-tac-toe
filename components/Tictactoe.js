import React, { PropTypes } from 'react';
import { View, Text, StyleSheet,
         TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Components } from 'exponent';
import { FontAwesome } from '@exponent/vector-icons';
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
    return (
      <View style={styles.container}>
        <View style={styles.gameContainer}>
          <Components.LinearGradient
            colors={[Colors.primary, Colors.primary700]}
            style={styles.gameContainerGradient}
          >
            <Board
              board={this.props.game.board}
              gameOver={this.props.game.gameOver}
              onClick={this.clickMovement}
            />
          </Components.LinearGradient>
        </View>

        <View style={[styles.gameStatus, { backgroundColor: this.getColor() }]}>
          <GameStatus
            nextPlayer={this.props.game.nextPlayer}
            gameOver={this.props.game.gameOver}
            winner={this.props.game.winner}
          />
        </View>

        <OptionItem
          text={'Restart!'}
          icon={'refresh'}
          iconColor={Colors.warning}
          onPress={this.clickRestart}
        />
      </View>
    );
  }
}

TicTacToe.propTypes = {
  game: PropTypes.object,
  movement: PropTypes.func,
  restart: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },

  gameContainer: {
    height: windowWidth,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.primary300,
    marginTop: 30,
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
