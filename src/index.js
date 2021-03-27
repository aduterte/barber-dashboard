import React, { createContext } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import { RecoilRoot } from 'recoil';
// import { ActionCableProvider } from "react-actioncable-provider"
import actionCable from "actioncable"

const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable') // change to whatever port your server uses
export const ActionCableContext = createContext()

ReactDOM.render(
  <Router>
    <RecoilRoot>
      <ActionCableContext.Provider value={CableApp.cable}>
        <App />
      </ActionCableContext.Provider>  
    </RecoilRoot>
  </Router>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
