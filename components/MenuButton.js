import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity,
         StyleSheet } from 'react-native';
import { FontAwesome } from '@exponent/vector-icons';

const MenuButton = props => (
  <TouchableOpacity
    style={[styles.optionsContainer, { marginBottom: props.marginBottom }]}
    onPress={props.onPress}
  >
    <View style={[styles.iconContainer, { backgroundColor: props.iconColor }]}>
      <FontAwesome
        style={styles.icon}
        name={props.icon}
      />
    </View>

    <Text style={styles.option}>
      {props.text}
    </Text>
  </TouchableOpacity>
);

MenuButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  marginBottom: PropTypes.number,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },

  iconContainer: {
    width: 75,
    alignItems: 'center',
    padding: 3
  },

  icon: {
    color: '#FFF',
    fontSize: 36,
    margin: 10
  },

  option: {
    fontSize: 16,
    fontWeight: '400',
    paddingLeft: 15
  }
});

export default MenuButton;
