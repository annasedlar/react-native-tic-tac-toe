import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Row from './Row';

class Board extends React.Component {
  renderRows() {
    return [0, 1, 2].map(val =>
      <Row
        onClick={this.props.onClick}
        rowNum={val}
        boardRow={this.props.board[val]}
        gameOver={this.props.gameOver}
        key={val}
      />
    );
  }

  render() {
    const rows = this.renderRows();

    return (
      <View style={styles.container}>
        { rows }
      </View>
    );
  }
}

Board.propTypes = {
  board: PropTypes.array,
  gameOver: PropTypes.bool,
  onClick: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Board;
