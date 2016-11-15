import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationStyles } from '@exponent/ex-navigation';
import BoardHeader from '../components/BoardHeader';

const BoardScreen = props => (
  <View style={styles.container}>
    <Text style={{ color: 'red' }}>
      BOARD SCREEN
    </Text>
  </View>
);

BoardScreen.route = {
  navigationBar: {
    visible: true,
    renderTitle: params => <BoardHeader headerText="React Native - Tic Tac Toe" />,
    backgroundColor: '#222',
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
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
});

export default BoardScreen;
