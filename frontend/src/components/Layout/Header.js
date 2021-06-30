import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {useContext} from 'react';
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import AuthContext, {UserType} from '../../store/auth-contex';
import dataSource from '../../dataSource';

const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const userType = authCtx.userType;
  const isLoggedIn=authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    dataSource.logout();
  }

  return (
    <Fragment>
      <header className={classes.header}>
      <Link to='/'> <h1 className={classes.name}>Food-Delivery</h1></Link>
      <nav className={classes.nav}>
      <ul>
          <li><Link to='/'>Home</Link></li>
          <li> {isLoggedIn ? <Link to='/profile'> Profile</Link> : <Link to='/auth'><button>Login</button></Link>}</li>
          <li onClick={logoutHandler}>{isLoggedIn && <Link>Logout </Link>}</li>
          <li>{isLoggedIn && userType == UserType.User && <HeaderCartButton onClick={props.onShowCart} /> }</li>
        </ul>
      </nav>
      </header>
    </Fragment>
  );
};

export default Header;
