import React, {useState, useContext, useEffect} from 'react';
import {conversationsAtom, convoSelector, openConvos as convoList} from "../atoms"
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil"
import { ActionCableContext } from '../index';
import MessagesContainer from '../containers/MessagesContainer';


export default function ConversationComponent(props){

    const [conversations, setConversations] = useRecoilState(conversationsAtom),
        convo = useRecoilValue(convoSelector(props.convo.id)),
        cable = useContext(ActionCableContext),
        [openConvos, setOpenConvos] = useRecoilState(convoList)
  
    useEffect(()=>{
        cable.subscriptions.create(
            {channel: 'MessagesChannel', id: props.convo.id},
            {received: (data) => {
                let array = [...conversations]
                array[props.index] = {...array[props.index], messages: [...convo.messages, data]}
                setConversations(array)
            }}
            )
    })

    function showConvo(){
        setOpenConvos([...openConvos, convo])
    }
    // console.log(convo)
    return (
        <div>
         <div onClick={showConvo}>
           <img src={convo.client.photo} className="mini-avatar"/>
         </div>

               
                
        </div>
    )
}