import { createRouter } from '@exponent/ex-navigation';
import BoardScreen from '../screens/BoardScreen';
import MenuScreen from '../screens/MenuScreen';

const Router = createRouter(() =>
   ({
     board: () => BoardScreen,
     menu: () => MenuScreen
   })
);

export default Router;
