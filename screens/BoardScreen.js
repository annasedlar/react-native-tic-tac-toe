import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationStyles } from '@exponent/ex-navigation';
import Colors from '../constants/Colors';
import BoardHeader from '../components/BoardHeader';
import TicTacToe from '../components/Tictactoe';

const BoardScreen = props => (
  <View style={styles.container}>
    <TicTacToe />
  </View>
);

BoardScreen.route = {
  navigationBar: {
    visible: true,
    renderTitle: params => <BoardHeader headerText="React Native - Tic Tac Toe" />,
    backgroundColor: Colors.primary700,
    tintColor: '#FFF'
  },
  styles: NavigationStyles.FloatHorizontal
};

BoardScreen.propTypes = {
  route: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  }
});

export default BoardScreen;
