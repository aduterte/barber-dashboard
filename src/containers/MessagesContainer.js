import React, {useContext, useState, useEffect, useRef} from 'react';
import { ActionCableContext } from '../index.js';
import {userAtom, convoSelector, convoAtom, openConvos} from "../atoms"
import {useRecoilValue, useRecoilState} from "recoil"
import Message from '../components/Message.js';
import API from "../api"

export default function MessagesContainer(props){

    const cable = useContext(ActionCableContext),
        [channel, setChannel] = useState(null),
        [input, setInput] = useState(""),
        user= useRecoilValue(userAtom),
        convo = useRecoilValue(convoSelector(props.convo)),
        [showConvos,setShowConvos] = useRecoilState(openConvos),
        scrollRef = useRef(null)
    
    useEffect(()=>{
        const channel = cable.subscriptions.create({
            channel: 'MessagesChannel',
            id: props.convo.id
        })
        setChannel(channel)
        return ()=>{
            channel.unsubscribe()
        }
    },[setChannel, props.convo.id, cable.subscriptions])
   
    
    useEffect(()=> {
        scrollToBottom()
	}, [convo])

    const scrollToBottom = () => {
        scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
    const handleInput = (e) =>{
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {barber_id: user.id, client_id: convo.client.id, conversation_id: props.convo.id, text: input, sent_by:"barber"}
        channel.send(data)
        setInput("")
    }

    const closeMessage = () => {
        // debugger
        let time = new Date()
        // debugger
        let data = {b_last_read: time}
     
        API.patch(`/conversations/${props.convo.id}`, data)
        let array = [...showConvos]
        // debugger
        array.splice(props.index, 1)
        
        setShowConvos(array)
    }
    // console.log(convo)
    return (
        <div className="message-container">
            <div className="message-container-top">
                <div>{convo.client.username}</div>
                <div onClick={closeMessage}>X</div>
            </div>
            <div className="messages-wrapper">
               {convo.messages.map(m => <Message key={m.id} message={m}/>)} 
               <div ref={scrollRef}/>
            </div>
           
        
        <form onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={handleInput}/>
        </form>
        </div>
    )
}