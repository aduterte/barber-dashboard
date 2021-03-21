import React, {useState} from 'react'
import {userAtom as user} from '../atoms'
import {useRecoilState} from 'recoil'
import API from "../api"
import NewAccountForm from '../components/NewAccountForm'

export default function LoginContainer(){

    const [input, setInput] = useState({email: "", password: "", isBarber: true}),
        [userInfo, setUserinfo] = useRecoilState(user)

    function handleLogin(e){
        e.preventDefault()
        const login = input
        API.post(`logins`, {login})
        .then(res => {
            if(!res.data.error){
               
                setUserinfo(res.data.user)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("type", input.isBarber)
            }
            else{
                // console.log(res.data.error)
            }
        })
        console.log("hit")
    }

    function handleInput(e){
        
        let {name, value} = e.target
        setInput({...input, [name]: value})
      
        console.log(input)
    }

    function handleLogout(){
        localStorage.removeItem("token")
        localStorage.removeItem("type")
        setUserinfo({})
    }

    return (
        <div>
            Logged in as: {userInfo.first_name}
            <form onSubmit={handleLogin}>
                <input type="text" name="email" value={input.email} onChange={handleInput} placeholder="Enter email"/>
                <br/>
                <input type="password" name="password" value={input.password} onChange={handleInput} placeholder="Enter password"/>
                <br/>
                <input type="submit"/>
            </form>

            <br/>
            <br/>
            <button onClick={handleLogout}>Log Out</button>
            <NewAccountForm/>
        </div>
    )
}