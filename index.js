import React from 'react';
import {createStore} from 'redux'
import {render} from 'react-dom'

import TicTacToe from './app/tictactoe'
import {moveReducer} from './app/reducers'

let store = createStore(moveReducer);

render(
  <TicTacToe store={store} />,
  document.getElementById('app')
);
