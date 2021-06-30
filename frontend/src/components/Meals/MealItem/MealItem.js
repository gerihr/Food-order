import { useContext } from 'react';

import classes from './MealItem.module.css';
import MealItemForm from './MealsItemForm';
import CartContext from '../../../store/cart-context'

const MealItem = props => {
    const cartCtx = useContext(CartContext);

    if(props == undefined || props == null){
        return <p>Loading...</p>
    }
    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price

        });
    };


    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.long_description}>{props.long_description}</div>
                <div>{price}</div>
            </div>
            <div>
                <MealItemForm {...props} onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
};

export default MealItem;