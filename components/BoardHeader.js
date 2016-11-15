import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Font } from 'exponent';

const BoardHeader = props => (
  <View style={styles.viewStyle}>
    <Text style={[styles.textStyle, Font.style('meriendaOne')]}>
      { props.headerText}
    </Text>
  </View>
);

BoardHeader.propTypes = {
  headerText: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  viewStyle: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textStyle: {
    color: '#EEE',
    fontSize: 17,
    fontWeight: '900'
  }
});

export default BoardHeader;
