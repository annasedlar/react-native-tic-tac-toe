import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';

class Row extends React.Component {
  renderRow() {
    return [0, 1, 2].map(val =>
      <Button
        rowNum={this.props.rowNum}
        colNum={val}
        gameOver={this.props.gameOver}
        buttonValue={this.props.boardRow[val]}
        onClick={this.props.onClick}
        key={val}
      />
    );
  }

  render() {
    const row = this.renderRow();

    return (
      <View style={styles.container}>
        { row }
      </View>
    );
  }
}

Row.propTypes = {
  rowNum: PropTypes.number,
  gameOver: PropTypes.bool,
  boardRow: PropTypes.array,
  onClick: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default Row;
