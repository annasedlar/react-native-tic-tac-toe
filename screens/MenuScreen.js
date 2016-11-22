import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationStyles, withNavigation } from '@exponent/ex-navigation';
import Prompt from 'react-native-prompt';
import Colors from '../constants/Colors';
import BoardHeader from '../components/BoardHeader';
import MenuButton from '../components/MenuButton';
import LoadingIndicator from '../components/LoadingIndicator';
import { createBoard, loadBoard, restart } from '../state/actions';

@withNavigation
class MenuScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      promptVisible: false
    };

    this.goToBoard = this.goToBoard.bind(this);
    this.loadBoard = this.loadBoard.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.joinOnlineGame = this.joinOnlineGame.bind(this);
    this.checkOnlineGame = this.checkOnlineGame.bind(this);
  }

  goToBoard() {
    this.props.restart();
    this.props.navigator.push('board');
  }

  createBoard() {
    this.props.createBoard();
  }

  loadBoard(board) {
    this.props.loadBoard(board);
  }

  joinOnlineGame() {
    this.setState({ promptVisible: true });
  }

  checkOnlineGame(boardId) {
    this.setState({ promptVisible: false });
    this.loadBoard(boardId);
    this.props.navigator.push('board');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Choose your destiny
          </Text>
        </View>

        <MenuButton
          text={'Offline play'}
          icon={'gamepad'}
          iconColor={Colors.O}
          onPress={this.goToBoard}
          marginBottom={15}
        />

        <MenuButton
          text={this.props.game.newBoard ? `Create online game: ${this.props.game.newBoard}` : 'Create online game'}
          icon={'globe'}
          iconColor={Colors.warning}
          onPress={this.createBoard}
          marginBottom={15}
        />

        <MenuButton
          text={'Join online game'}
          icon={'group'}
          iconColor={Colors.X}
          onPress={this.joinOnlineGame}
          marginBottom={15}
        />

        <Prompt
          title="Enter a valid board code"
          placeholder="Board code"
          visible={this.state.promptVisible}
          onCancel={() => this.setState({ promptVisible: false })}
          onSubmit={this.checkOnlineGame}
        />

        <LoadingIndicator
          visible={this.props.game.loading}
          message={'Just a moment...'}
          size={'large'}
        />
      </View>
    );
  }
}

MenuScreen.route = {
  navigationBar: {
    visible: true,
    renderTitle: () => <BoardHeader headerText="React Native - Tic Tac Toe" />,
    backgroundColor: Colors.primary700,
    tintColor: '#FFF'
  },
  styles: NavigationStyles.FloatHorizontal
};

MenuScreen.propTypes = {
  navigator: PropTypes.object,
  game: PropTypes.object,
  restart: PropTypes.func,
  createBoard: PropTypes.func,
  loadBoard: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  },

  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30
  },

  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600'

  }
});

const mapStateToProps = state => ({
  game: state.game
});

export default connect(
  mapStateToProps,
  { createBoard, loadBoard, restart }
)(MenuScreen);
