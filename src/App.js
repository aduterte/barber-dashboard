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

function App() {

  const [user,setUser] = useRecoilState(userAtom)

  useEffect(()=>{
    API.get("/barbers/4")
    .then(res => setUser(res.data))
  }, [setUser])

  return (
    <div className="App">
      <NavBar/>
      {user.username && 
      <div>
        {user.username}
      </div>}
      <Switch>
      <Route exact path="/login">
            {user.username ? <Redirect to="/"/> :  
            <LoginContainer/>}
        </Route>
      <Route exact path="/account-settings">
          <AccountSettingsContainer/>
        </Route>
        <Route exact path="/portfolio-settings">
          <PortfolioSettings/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
