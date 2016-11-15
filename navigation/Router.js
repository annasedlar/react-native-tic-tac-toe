import { createRouter } from '@exponent/ex-navigation';
import BoardScreen from '../screens/BoardScreen';

const Router = createRouter(() =>
   ({
     board: () => BoardScreen
   })
);

export default Router;
