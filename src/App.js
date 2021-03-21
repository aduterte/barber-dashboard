import React, {useEffect} from 'react';
import API from "./api"
import {userAtom} from "./atoms"
import {useRecoilState} from "recoil"
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom"
import AccountSettingsContainer from "./containers/AccountSettingsContainer"
import PortfolioSettings from './components/PortfolioSettings';
import LoginContainer from "./containers/LoginContainer"
import NavBar from './components/NavBar';
import DashboardContainer from './containers/DashboardContainer';

function App() {

  const [user,setUser] = useRecoilState(userAtom)

  // useEffect(()=>{
  //   API.get("/barbers/4")
  //   .then(res => setUser(res.data))
  // }, [setUser])

    // token authentication on refresh
    useEffect(()=>{
      if (localStorage.token){
      let options = {headers: {'Authenticate': localStorage.token, 'User': localStorage.type}}
      API.get(`/logins`, options)
      .then(res => {
        
        setUser(res.data)
      })
      }  
    }, [setUser])

  return (
    <div className="App">
      <NavBar/>
      <div id="main-bottom">
      
     
      <Switch>
        <Route exact path="/dashboard">
          {user.username ? <DashboardContainer/> : <Redirect to="/login"/>}
        </Route>
        <Route exact path="/login">
            {user.username ? <Redirect to="/dashboard"/> : <LoginContainer/>}
        </Route>
        <Route exact path="/account-settings">
          {!user.username ? <Redirect to="/login"/> : <AccountSettingsContainer/>}
        </Route>
        <Route exact path="/portfolio-settings">
          {!user.username ? <Redirect to="/login"/> : <PortfolioSettings/>}
        </Route>
      </Switch>
      
      </div>
    </div>
  );
}

export default App;
