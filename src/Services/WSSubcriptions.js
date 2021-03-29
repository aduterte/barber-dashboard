import React, {useContext,useEffect} from 'react';
import {ActionCableContext} from "../index"
import {userAtom, conversationsAtom} from "../atoms"
import {useRecoilValue, useRecoilState} from "recoil"


export default function WSSubscriptions(){

    const cable = useContext(ActionCableContext),
        user = useRecoilValue(userAtom),
        [conversations, setConversations] = useRecoilState(conversationsAtom)

    useEffect(()=>{
        if (user.username){
          cable.subscriptions.create(
            {channel: 'ConversationsChannel', id: user.id, type: localStorage.type},
            {received: (data) => {
                console.log(data)
                if (data){
                  // debugger
                }
                setConversations([...conversations, data])
            }}
          )
        }
      })

    return (
        <>
        </>
    )
}