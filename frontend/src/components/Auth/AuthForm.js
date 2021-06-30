import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-contex';
import {useHistory} from 'react-router-dom'

import classes from './AuthForm.module.css';
import dataSource from '../../dataSource';

const AuthForm = () => {
  const history=useHistory();
   const emailInputRef = useRef();
   const passwordInutRef = useRef();

   const authCtx=useContext(AuthContext)

   const [isLogin, setIsLogin] = useState(true);
   const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInutRef.current.value;

    setIsLoading(true);
    let typeOfRequest = "login";
    if(isLogin) {
      // url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYJ4GFQejeKLyisyGupkYspKom8obqix4';
      typeOfRequest = "login"
    } else {
        // url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYJ4GFQejeKLyisyGupkYspKom8obqix4';
      typeOfRequest = "register";
    }
        dataSource[typeOfRequest]({ email: enteredEmail, password: enteredPassword })
        .then((data)=>{
          setIsLoading(false);
          const expirationTime = new Date((new Date().getTime()+(+data.expiration * 1000)));
          authCtx.login(data.token, expirationTime.toISOString(), data.user.type);//add message
          history.replace("/");
        })
        .catch((e)=>{
          setIsLoading(false);
          console.error(e);
          alert("Authentication failed!");
        })
//        fetch(url,
//         {
//           method: 'POST',
//           body: JSON.stringify({
//               email: enteredEmail,
//               password: enteredPassword,
//               returnSecureToken: true
//           }),
//           headers: {
//               'Content-Type': 'application/json'
//           }
//       }
//     ).then(res => {
//         setIsLoading(false);
//         if(res.ok){
//           return res.json();
//         } else {
//           res.json().then(data => {
//               let errorMessage = 'Authentication failed!';
//               // if(data && data.error && data.error.message) {  <=възможност да се почвяват повече видове съобщения при грешка
//               // errorMessage = data.error.message;
//               // }
//               alert(errorMessage);
//               throw new Error(errorMessage);
//           });
//         }
//     }).then((data)=>{
//       const expirationTime = new Date((new Date().getTime()+(+data.expiresIn * 1000)));
//       authCtx.login(data.idToken, expirationTime.toISOString());//add message
//       history.replace('/') //redirect the user to the starting page 
//  }).catch(err => {
//       alert(err.message);
//     });
    
        
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Create account'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInutRef}/>
        </div>
        <div className={classes.actions}>
         {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
         {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
