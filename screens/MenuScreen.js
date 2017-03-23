import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationStyles, withNavigation } from '@expo/ex-navigation';
import Prompt from 'react-native-prompt';
import Colors from '../constants/Colors';
import BoardHeader from '../components/BoardHeader';
import MenuButton from '../components/MenuButton';
import LoadingIndicator from '../components/LoadingIndicator';
import { createOfflineBoard, createOnlineBoard, loadOnlineBoard } from '../state/actions';

@withNavigation
class MenuScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      promptVisible: false
    };

    this.joinOfflineBoard = this.joinOfflineBoard.bind(this);
    this.createOnlineBoard = this.createOnlineBoard.bind(this);
    this.joinOnlineGame = this.joinOnlineGame.bind(this);
    this.loadOnlineGame = this.loadOnlineGame.bind(this);
  }

  joinOfflineBoard() {
    this.props.createOfflineBoard();
    this.props.navigator.push('board');
  }

  createOnlineBoard() {
    this.props.createOnlineBoard();
    this.props.navigator.push('board');
  }

  joinOnlineGame() {
    this.setState({ promptVisible: true });
  }

  loadOnlineGame(boardId) {
    this.setState({ promptVisible: false });
    this.props.loadOnlineBoard(boardId);
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
          onPress={this.joinOfflineBoard}
          marginBottom={15}
        />

        <MenuButton
          text={this.props.game.newBoard ? `Create online game: ${this.props.game.newBoard}` : 'Create online game'}
          icon={'globe'}
          iconColor={Colors.warning}
          onPress={this.createOnlineBoard}
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
          onSubmit={this.loadOnlineGame}
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
    renderTitle: () => <BoardHeader headerText="Rmotr - Tic Tac Toe" />,
    backgroundColor: Colors.primary700,
    tintColor: '#FFF'
  },
  styles: NavigationStyles.FloatHorizontal
};

MenuScreen.propTypes = {
  navigator: PropTypes.object,
  game: PropTypes.object,
  createOfflineBoard: PropTypes.func,
  createOnlineBoard: PropTypes.func,
  loadOnlineBoard: PropTypes.func
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
  {
    createOfflineBoard,
    createOnlineBoard,
    loadOnlineBoard
  }
)(MenuScreen);
