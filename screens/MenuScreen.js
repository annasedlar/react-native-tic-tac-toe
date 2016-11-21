import { Constants } from 'exponent';
import React, { PropTypes } from 'react';
import { View, Text, StyleSheet,
         Alert } from 'react-native';
import { NavigationStyles, withNavigation } from '@exponent/ex-navigation';
import Prompt from 'react-native-prompt';
import firebaseApp from '../constants/Firebase';
import Colors from '../constants/Colors';
import BoardHeader from '../components/BoardHeader';
import MenuButton from '../components/MenuButton';

const firebaseRef = firebaseApp.database().ref();

@withNavigation
class MenuScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newBoard: null,
      promptVisible: false
    };

    this.goToBoard = this.goToBoard.bind(this);
    this.joinOnlineGame = this.joinOnlineGame.bind(this);
    this.checkOnlineGame = this.checkOnlineGame.bind(this);
    this.createOnlineGame = this.createOnlineGame.bind(this);
  }

  goToBoard() {
    this.props.navigator.push('board');
  }

  createOnlineGame() {
    const randomNum = Math.floor(Math.random() * 9000) + 1000;

    const onlineBoard = {
      boardId: randomNum,
      creator: Constants.deviceId,
      winner: null,
      nextPlayer: 'X',
      gameOver: false,
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
    };

    firebaseRef.child('boards').child(randomNum)
    .set(onlineBoard)
    .then(() => {
      this.setState({ newBoard: randomNum });

      Alert.alert(
        `Your board code is: ${randomNum}`,
        'Share it with your rival!'
      );
    });
  }

  joinOnlineGame() {
    this.setState({ promptVisible: true });
  }

  checkOnlineGame(value) {
    this.setState({ promptVisible: false });

    firebaseRef.child('boards').child(value)
    .once('value', (snapshot) => {
      const onlineBoard = snapshot.val();

      if (onlineBoard) {
        this.props.navigator.push('board', { boardId: onlineBoard.boardId });
      } else {
        Alert.alert('That board code doesn\'t exist');
      }
    }, (err) => {
      Alert.alert('That board code doesn\'t exist');
    });
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
          text={this.state.newBoard ? `Create online game: ${this.state.newBoard}` : 'Create online game'}
          icon={'globe'}
          iconColor={Colors.warning}
          onPress={this.createOnlineGame}
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
  route: PropTypes.object,
  navigator: PropTypes.object
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

export default MenuScreen;
