import Exponent from 'exponent';
import React, { PropTypes } from 'react';
import { Platform, StatusBar, StyleSheet,
         View } from 'react-native';
import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation';
import Router from './navigation/Router';
import cacheAssetsAsync from './utils/cacheAssetsAsync';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { appIsReady: false };
  }

  componentWillMount() {
    this.loadAssetsAsync();
  }

  async loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [
          require('./assets/images/tictactoe.png')
        ],
        fonts: [
          { meriendaOne: require('./assets/fonts/MeriendaOne-Regular.ttf') }
        ]
      });
    } catch (e) {
      console.warn('There was an error caching assets (see: main.js), perhaps due to a network timeout, so we skipped caching. Reload the app to try again.');
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <View style={styles.container}>
          <NavigationProvider router={Router}>
            <StackNavigation
              id="root"
              initialRoute={Router.getRoute('board')}
            />
          </NavigationProvider>

          {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        </View>
      );
    }

    return <Exponent.Components.AppLoading />;
  }
}

AppContainer.propTypes = {
  exp: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
});

Exponent.registerRootComponent(AppContainer);
