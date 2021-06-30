import AuthContext from '../../store/auth-contex';
import classes from './ResetPassword.module.css';
import {useRef, useContext} from 'react';
import {useHistory} from 'react-router-dom'

const ResetPassword = () => {
  const history=useHistory();
const newPasswordInputRef=useRef();
const authCtx=useContext(AuthContext);

const submitHandler=(event)=>{
  event.preventDefault();
const enteredNewPassword=newPasswordInputRef.current.value;
fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCYJ4GFQejeKLyisyGupkYspKom8obqix4',{
  method: 'POST',
  body: JSON.stringify({
    idToken: authCtx.token,
    password: enteredNewPassword,
    returnSecuretToken: false
  }),
  headers:{
    'Content-Type':'application/json'
  }
}).then(res=>{
  //assumption:always succeeds!
  //message!
history.replace('/')
})
};
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <h4 className={classes.password}>Change password</h4>
        <hr className={classes.line}/>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ResetPassword;
