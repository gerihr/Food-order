import Meals from '../components/Meals/Meals';
import mealsImage from '../assets/meals.jpg';
import classes from './HomePage.module.css';

const HomePage = () => {
   return  (
      <div className="homePage">
         <div className={classes['main-image']}>
      <img src={mealsImage} alt='A table full of delicious food!' />
    </div>
      <Meals/>
    </div>
 )
  };
  
  export default HomePage;
  