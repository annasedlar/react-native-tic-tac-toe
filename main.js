import Expo, { AppLoading } from 'expo';
import React, { PropTypes } from 'react';
import { Platform, StatusBar, StyleSheet,
         View } from 'react-native';
import { NavigationProvider, StackNavigation } from '@expo/ex-navigation';
import { Provider as ReduxProvider } from 'react-redux';
import store from './state/store';
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
        <ReduxProvider store={store}>
          <View style={styles.container}>
            <NavigationProvider router={Router}>
              <StackNavigation
                id="root"
                initialRoute={Router.getRoute('menu')}
              />
            </NavigationProvider>

            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          </View>
        </ReduxProvider>
      );
    }

    return <AppLoading />;
  }
}

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

Expo.registerRootComponent(AppContainer);
