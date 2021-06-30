import {Fragment, useState } from 'react';
import CartProvider from '../../store/CartProvider';
import Cart from '../../components/Cart/Cart';
import Header from '../../components/Layout/Header';

const Layout = (props) => {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
      setCartIsShown(true);
    };
  
    const hideCartHandler = () => {
      setCartIsShown(false);
    };
  
  return (
     <CartProvider>
        {cartIsShown &&  <Cart onClose={hideCartHandler}/>}
        <Header onShowCart={showCartHandler}/>
     <main>{props.children}</main>
        </CartProvider>
  );
};

export default Layout;
