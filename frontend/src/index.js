import HomeScreen from "./srceens/HomeScreen.js";
import ProductScreen from './srceens/ProductScreen.js';
import Error404Screen from './srceens/Error404Screen.js';

import { parseRequestUrl} from './utils.js';

const routes = {
    '/': HomeScreen,
    // '/product/:id/edit': ProductEditScreen,
    '/product/:id': ProductScreen,
    // '/order/:id': OrderScreen,
    // '/cart/:id': CartScreen,
    // '/cart': CartScreen,
    // '/signin': SigninScreen,
    // '/register': RegisterScreen,
    // '/profile': ProfileScreen,
    // '/shipping': ShippingScreen,
    // '/payment': PaymentScreen,
    // '/placeorder': PlaceOrderScreen,
    // '/dashboard': DashboardScreen,
    // '/productlist': ProductListScreen,
    // '/orderlist': OrderListScreen,
  };

  const router = async () => {
    const request = parseRequestUrl();
    const parseUrl =
        (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '');
    console.log('request', request);
    console.log('routes[parseUrl]', routes[parseUrl]);
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    if (screen.after_render) await screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
