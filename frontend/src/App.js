import{ useContext} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import classes from './App.module.css';
import HomePage from './pages/HomePage';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import MeetupList  from "./components/meetups/MeetupList";
import  MeetupItem  from "./components/meetups/MeetupItem";
import  NewMeetupForm  from "./components/meetups/NewMeetupForm";
import AdminProfile from './components/Profile/AdminProfile';
import UserProfile from './pages/ProfilePage';
import AuthContext, { UserType } from './store/auth-contex';
import MealDetails from './components/Meals/MealItem/MealsDetails';

function App() {
  const authCtx = useContext(AuthContext);
  const userType = authCtx.userType;

  return (
    <Layout>
       <Switch>
          <Route path='/' exact>
            <HomePage />
         </Route>
          {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
          )}
        
         <Route path='/profile'>
         { authCtx.isLoggedIn && userType == UserType.User  && <UserProfile />}
          {authCtx.isLoggedIn && userType == UserType.Admin && <AdminProfile/> }
         {!authCtx.isLoggedIn && <Redirect to = '/auth'/>}
         </Route>
          <Route path="/meetupsList" component={MeetupList}/>
          <Route path="/mealDetails/:id" component={MealDetails}/>
          <Route path="/NewMeetupForm" component={NewMeetupForm}/>
         <Route path = '*'>
           <Redirect to = '/'/>
         </Route>
        </Switch>
     </Layout>
  );
}

export default App;
