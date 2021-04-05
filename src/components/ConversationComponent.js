import React, {useState, useContext, useEffect} from 'react';
import {conversationsAtom, convoAtom, convoSelector, openConvos as convoList, convoSelectorUnread} from "../atoms"
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil"
import { ActionCableContext } from '../index';
import MessagesContainer from '../containers/MessagesContainer';
import {isBefore, isAfter} from "date-fns"


export default function ConversationComponent(props){

    const [conversations, setConversations] = useRecoilState(conversationsAtom),
        [convo, setConvo] = useRecoilState(convoSelector(props.convo)),
        cable = useContext(ActionCableContext),
        [openConvos, setOpenConvos] = useRecoilState(convoList),
        [unread, setUnread] = useState(0)
  
    useEffect(()=>{
        let channel = cable.subscriptions.create(
            {channel: 'MessagesChannel', id: props.convo.id},
            {received: (data) => {
                addUnread()
                setConvo(data)
            }}
            )

        // return () => {channel.unsubscribe()}
    })

    // useEffect(()=>{
    //     let count = convo.messages.filter(m => isAfter(new Date(m.created_at), new Date(convo.b_last_read)))
    //     setUnread(count)
    // }, [setUnread])

    function addUnread(){
        // debugger
        if (openConvos.filter(c => c.id === convo.id).length === 0){
            // debugger
            setUnread(unread + 1)
        }
    }

    function showConvo(){
        setUnread(0)
        setOpenConvos([...openConvos, convo])
    }

    // console.log(openConvos)
    function displayUnread(){
        // debugger
        if (openConvos.filter(c => c.id === convo.id).length === 0 && unread > 0){
            return unread
        } else {
            return null
        }
    }
    return (
        <div>
         <div onClick={showConvo}>
           <img src={convo.client.photo} className="mini-avatar"/>
           
           {displayUnread()}
          
         </div>

               
                
        </div>
    )
}