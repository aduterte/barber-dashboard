import React, {useEffect} from 'react';
import API from "./api"
import {userAtom, reviewsAtom, appointmentsAtom, conversationsAtom, portfolioAtom} from "./atoms"
import {useRecoilState, useSetRecoilState} from "recoil"
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom"
import AccountSettingsContainer from "./containers/AccountSettingsContainer"
import PortfolioSettings from './components/PortfolioSettings';
import LoginContainer from "./containers/LoginContainer"
import NavBar from './components/NavBar';
import DashboardContainer from './containers/DashboardContainer';
import WSSubscriptions from './Services/WSSubcriptions';
import MessagesView from './Messages/MessagesView';



function App() {

  const [user, setUser] = useRecoilState(userAtom),
        setReviews = useSetRecoilState(reviewsAtom),
        setAppointments  = useSetRecoilState(appointmentsAtom),
        setConversations = useSetRecoilState(conversationsAtom),
        setPortfolio = useSetRecoilState(portfolioAtom)

    

    // token authentication on refresh
    
    useEffect(()=>{
      if (localStorage.token){
      let options = {headers: {'Authenticate': localStorage.token, 'User': localStorage.type}}
      API.get(`/logins`, options)
      .then(res => {
        
        let user = {username: res.data.username, id: res.data.id, first_name: res.data.first_name, last_name: res.data.last_name, email: res.data.email, photo: res.data.photo}
        setUser(user)
        // setUser(res.data)
        setReviews(res.data.barber_reviews)
        setAppointments(res.data.appointments)
        setConversations(res.data.conversations)
        setPortfolio(res.data.photos)
      })
      } 
      //eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

  return (
    <div className="App">
      <WSSubscriptions/>
      <MessagesView/>
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
