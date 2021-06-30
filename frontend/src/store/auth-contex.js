import React, {useState} from 'react';

export const UserType ={
    Admin: 0, 
    User: 1 
}

const AuthContext = React.createContext({
token: '',
userType: UserType.User,
isLoggedIn: false,
login:(token)=>{},
logout:()=>{}
});

const calculateRemainingTime = (expirationTime)=>{
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
}

export const AuthContextProvider = (props) => {
    const initialType =localStorage.getItem('userType');
    const initialToken = localStorage.getItem('token');
    const [token,setToken] = useState(initialToken);
    const [type, setType] = useState(initialType);

    const userIsLoggedIn = !!token;   // if token is a string that is empty => false, if it is not => true

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
    };

    const loginHandler = (token, expirationTime, userType) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userType', userType)
   
    const remainingTime = calculateRemainingTime(expirationTime);
    setTimeout(logoutHandler,remainingTime);
    
    setType(userType)
    };

    const contexValue = {
        token:token,
        isLoggedIn:userIsLoggedIn,
        userType: type,
        login: loginHandler,
        logout:logoutHandler,
    }
    return <AuthContext.Provider value={contexValue}>{props.children}</AuthContext.Provider>
}
export default AuthContext;