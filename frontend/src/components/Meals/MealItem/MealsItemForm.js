import { useEffect, useRef, useState, useContext } from 'react';
import { Fragment } from 'react';
import classes from './MealsItemForm.module.css';
import Input from '../../UI/Input';
import Modal from '../../UI/Modal';
import long_description from '../AvailableMeals';
import AuthContext, { UserType } from '../../../store/auth-contex';
import { Link, useHistory } from 'react-router-dom';
import dataSource from '../../../dataSource';

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef();
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const isLoggedIn=authCtx.isLoggedIn;
    const userType = authCtx.userType;

    useEffect(()=>{
        console.log(props);
    },[])
    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;


        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false)
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    };
    

    const deleteHandler = async () => {
        const response = window.confirm(`Are you sure you want to delete ${props.name}`);
        if(response){
            await dataSource.delete({ source: "meal", options: { id: props.id }});
            // Force update. TODO: Make a better way to update parent list
            window.location.reload();
        }
    }

    return (
        <Fragment>
        <form className={classes.form} onSubmit={submitHandler}>
           {isLoggedIn && userType == UserType.User && <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />}
           {isLoggedIn &&  userType == UserType.User && <button className={classes.add}>+ Add</button>}
            {!amountIsValid && <p>Please enter a valid amount (1-5). </p>}
            <div className={classes.buttons}>
            <Link to={{ pathname: `/mealDetails/${props.id}` }}>
               {isLoggedIn && <button className={classes.viewDetails}>Details </button>}
                {!isLoggedIn && <button className={classes.viewDetailsLogIn}>Details </button>}
            </Link>
           </div>
            {isLoggedIn && userType == UserType.Admin && <button className={classes.delete} onClick={deleteHandler}>Delete</button>}
        </form>
            </Fragment>
    );
}

export default MealItemForm;