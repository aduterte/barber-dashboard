import React, {useState} from 'react';
import ConversationList from '../components/Conversationlist';
import {openConvos} from "../atoms"
import {useRecoilState} from "recoil"
import MessagesContainer from '../containers/MessagesContainer';

export default function MessagesView(){

    const [showMessages, setShowMessages] = useState(false),
        [convos, setConvos] = useRecoilState(openConvos)

    return (
        <div id="messages-view">
            <div>
               { convos.map((convo, index) => <MessagesContainer convo={convo} index={index}/>)}
            </div>
            <div className="conversation-list">
                <div className="messages-icon" onClick={()=>setShowMessages(!showMessages)}>
                <i class="material-icons" style={{fontSize:"26px"}}>message</i>

                </div>
                {!!showMessages && <ConversationList/>}

            </div>
          
        </div>
    )
}