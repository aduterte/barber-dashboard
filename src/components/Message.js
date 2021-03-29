import React from 'react';



export default function Message(props){

    const {message} = props
   
    function getSender(){
        if (message.sent_by === "barber"){
            return "You"
        } else {
            // debugger
            return message.client.username
        }
    }
    function formatMessage(){
        if (message.sent_by === "barber"){
            return "message-sent"
        } else {
            return "message-received"
        }
       
    }

return (
    <div className={formatMessage()}>
        {/* List of Conversations */}
       <div>{getSender()} said:</div>
       <div style={{maxWidth: "100px"}} className="message">{message.text}</div>
        
        {/* <ActionCableConsumer channel={{channel: 'RoomsChannel'}} onReceived={handleRecievedRoom}/> */}
    </div>
)
}
