import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import dataSource from '../../dataSource';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmitting] = useState(false);

  
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    //    fetch('https://foodorder-cc1c6-default-rtdb.europe-west1.firebasedatabase.app/order.json',{
    //   method: 'POST',
    //   body: JSON.stringify({
    //     user: userData,
    //     orderItems: cartCtx.items
    //   })
    // });

    

    dataSource.post({ source: "order", options: {
        object: {
          purchaserName: userData.name,
          postalNumber: userData.postalCode,
          city: userData.city,
          street: userData.street
        }
      }
    })
    setIsSubmitting(false);
    setDidSubmitting(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

      const modalActions = (
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>
      )

    const cartModalContent = <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
     {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />}
     {!isCheckout && modalActions}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = 
   ( <React.Fragment>
    <p>Successfully sent the order!</p>
    <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>)

  return (
    <Modal onClose={props.onClose}>
     {!isSubmitting && !didSubmit && cartModalContent}
     {isSubmitting && isSubmittingModalContent}
     {didSubmit && !isSubmitting && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
