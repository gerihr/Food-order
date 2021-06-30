import { useEffect, useState, useContext } from "react";
import dataSource from "../../../dataSource";
import AuthContext, {UserType} from '../../../store/auth-contex';
import CartContext from "../../../store/cart-context";
import './MealsDetails.css';

export default function MealDetails(props) {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const cartCtx = useContext(CartContext);
    const userType = authCtx.userType;

    const id = props.match.params.id;
    const [meal, setMeal] = useState([]);
    // const [meals, setMeals] = useState([]);
    

    useEffect(() => {
        // fetch('https://foodorder-cc1c6-default-rtdb.europe-west1.firebasedatabase.app/meals.json')
        //     .then(response => response.json())
        //     .then(meals => setMeals(meals))
        //     .catch(err => console.log(err))
        dataSource.get({ source: "meal" , options: { id }}).then(meal => setMeal(meal))
    }, []);


   const addToCartHandler = () => {
        cartCtx.addItem({
            id: id,
            name: meal.name,
            amount: 1,
            price: meal.price
        })
    }
    
    if(meal == undefined)
        return <p>Loading...</p>

    return  <div className="frame">
    <div className="mealContainer">
        <img className="mealImage" src={meal.image_path} alt={meal.name} />
        <div className="right-column">
            <h1 className="mealName">{meal.name} </h1>
            <div className="mealPrice">${meal.price}</div>
            <p className="mealDescription">{meal.long_description}</p>
           {isLoggedIn && userType == UserType.User &&<button onClick={addToCartHandler} className="add">+ Add</button>}
        </div>
    </div>
    </div>
}
