import React from 'react'
import { Link } from "react-router-dom"
import {userAtom} from "../atoms"
import {useRecoilState} from "recoil"
import MessagesView from '../Messages/MessagesView'


export default function NavBar(){

    const [user, setUser] = useRecoilState(userAtom)

    function handleLogout(){
        localStorage.removeItem("token")
        localStorage.removeItem("type")
        setUser({})
    }
    // debugger
    return(
        <div id="nav-bar">
            <div>
                <Link to={`/`} id="nav-bar-left">
                    <div className="home-icon">
                        QCuts
                    </div>
                </Link>
            </div>
            {user.username ?
            <div id="nav-bar-right">
                <div>               
                    <Link to={`/dashboard`}><img src={user.photo} className="mini-avatar" alt="user avatar"/></Link>
                </div>
                <div>Welcome {user.username}</div>
                <div><Link to={'/account-settings'}> Settings</Link></div>
                <div>Message Icon</div>
                <div onClick={handleLogout}>Logout</div>
            </div>
            :
            <div id="nav-bar-right">
                <Link to={'/login'}>Login</Link>
            </div>
            }
        </div>
    )
}