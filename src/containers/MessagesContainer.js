import React, {useContext, useState, useEffect} from 'react';
import { ActionCableContext } from '../index.js';
import {userAtom, convoSelector} from "../atoms"
import {useRecoilValue} from "recoil"
import Message from '../components/Message.js';

export default function MessagesContainer(props){

    const cable = useContext(ActionCableContext),
        [channel, setChannel] = useState(null),
        [input, setInput] = useState(""),
        user= useRecoilValue(userAtom),
        convo = useRecoilValue(convoSelector(props.convo.id))
    
    useEffect(()=>{
        // debugger
        const channel = cable.subscriptions.create({
            channel: 'MessagesChannel',
            id: props.convo.id
        })
        setChannel(channel)
        return ()=>{
            channel.unsubscribe()
        }
    },[setChannel, props.convo.id, cable.subscriptions])
    // {debugger}

    const handleInput = (e) =>{
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {barber_id: user.id, client_id: 3, conversation_id: props.convo.id, text: input, sent_by:"barber"}
        channel.send(data)
        setInput("")
    }
    return (
        <>
        {convo.messages.map(m => <Message key={m.id} message={m}/>)}
        <form onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={handleInput}/>
        </form>
        </>
    )
}