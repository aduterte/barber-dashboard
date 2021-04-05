import React, {useState} from 'react'
import {userAtom, reviewsAtom, appointmentsAtom, conversationsAtom, portfolioAtom} from '../atoms'
import {useSetRecoilState} from 'recoil'
import API from "../api"
import NewAccountForm from '../components/NewAccountForm'

export default function LoginContainer(){

    const [input, setInput] = useState({email: "", password: "", isBarber: true}),
        setUser = useSetRecoilState(userAtom),
        setReviews = useSetRecoilState(reviewsAtom),
        setAppointments  = useSetRecoilState(appointmentsAtom),
        setConversations = useSetRecoilState(conversationsAtom),
        setPortfolio = useSetRecoilState(portfolioAtom)


    function handleLogin(e){
        e.preventDefault()
        const login = input
        // debugger
        API.post(`logins`, {login})
        .then(res => {
            if(!res.data.error){
                debugger
                // let user = {id: res.data.user.id, first_name: res.data.user.first_name, last_name: res.data.user.last_name, email: res.data.user.email, photo: res.data.user.photo}
                setUser({id: res.data.user.id, first_name: res.data.user.first_name, last_name: res.data.user.last_name, email: res.data.user.email, photo: res.data.user.photo, username: res.data.user.username})
                // setUser(res.data.user)
                setReviews(res.data.user.barber_reviews)
                setAppointments(res.data.user.appointments)
                setConversations(res.data.user.conversations)
                setPortfolio(res.data.user.photos)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("type", input.isBarber)
                // debugger
            }
            else{
                
                debugger
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
        setUser({})
    }

    return (
        <div>
            
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