import React, { PropTypes } from 'react';
import { View, Text, StyleSheet,
         Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Components } from 'exponent';
import firebaseApp from '../constants/Firebase';
import Colors from '../constants/Colors';
import Board from './Board';
import GameStatus from './GameStatus';
import OptionItem from './OptionItem';
import { movement, restart, loadBoard } from '../state/actions';

const firebaseRef = firebaseApp.database().ref();
const windowWidth = Dimensions.get('window').width;

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);

    this.clickMovement = this.clickMovement.bind(this);
    this.clickRestart = this.clickRestart.bind(this);
    this.loadBoard = this.loadBoard.bind(this);

    if (props.boardId && !props.game.boardId) {
      firebaseRef.child('boards').child(props.boardId)
      .on('value', (snapshot) => {
        const onlineBoard = snapshot.val();

        this.loadBoard(onlineBoard);
      }, (err) => {
        Alert.alert('That board code doesn\'t exist');
      });
    }
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

  loadBoard(board) {
    this.props.loadBoard(board);
  }

  clickMovement(row, col) {
    this.props.movement(row, col, this.props.boardId);
  }

  clickRestart() {
    this.props.restart();
  }

  render() {
    let reload;

    if (!this.props.boardId) {
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
          {this.props.boardId ? 'Online' : 'Offline'} play!
          {this.props.boardId ? ` - board: ${this.props.boardId}` : ''}
        </Text>

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
            boardId={this.props.game.boardId}
            creator={this.props.game.creator}
            nextPlayer={this.props.game.nextPlayer}
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
  restart: PropTypes.func,
  loadBoard: PropTypes.func
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
  { movement, restart, loadBoard }
)(TicTacToe);
