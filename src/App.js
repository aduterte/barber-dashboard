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

import {barbersState,
  clientsState,
  userState} from './atoms'

function App() {

  const [user,setUser] = useRecoilState(userState)

  useEffect(() => {
    API.get('http://localhost:3000/barbers')
    .then(res => setBarbers(res.data))
    
    API.get('http://localhost:3000/clients')
    .then(res => setClients(res.data))
    
  
  },[setBarbers, setClients])

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
        <Route exact path ="/clients/:clientID"
        component={ClientDetail}/>
        
        <Route exact path="/portfolio-settings">
          <PortfolioSettings/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
