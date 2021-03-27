import React from 'react';
import API from "../api";
import {userAtom} from "../atoms"
import {useRecoilState} from "recoil"

export default function AppointmentDetails(props){

    const {client, date} = props.appt,
        [user, setUser] = useRecoilState(userAtom)

    function handleAccept(){
        let appointment = {b_accepted: true}
        API.patch(`/appointments/${props.appt.id}`, {appointment: appointment})
        .then(res => {
            let i = user.appointments.indexOf(props.appt)
            let newApp = [...user.appointments]
            newApp.splice(i, 1, res.data)
            setUser({...user, appointments: newApp})

        })
    }

    function handleReject(){
        API.delete(`/appointments/${props.appt.id}`)
        .then( () => {
            let i = user.appointments.indexOf(props.appt)
            let newApp = [...user.appointments]
            newApp.splice(i, 1)
            setUser({...user, appointments: newApp})
        })
    }

    function getOptions(){

        let option = ""
        // debugger
        if(props.appt.b_accepted === true && props.appt.c_accepted === true){
            option = "cancel appointment"
        } else if(props.appt.b_accepted === false && props.appt.c_accepted === true) {
            option = "red x"
        } else if (props.appt.b_accepted === true && props.appt.c_accepted === false){
            option ="cancel sent appointment"
        }

        return (
        <div>
            <div onClick={handleReject}>
                {option}
            </div>
            {props.appt.b_accepted === false && <div onClick={handleAccept}>
                Green Check
            </div>}
        </div>
        )
    }


    return (
        <div className="appointment-card">
            <div className="appointment-card-top">
                <img src={client.photo} alt="client" className="mini-avatar"/>
                <div>Appointment with {client.username}</div>
            </div>
            
            <div>{`${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`}</div>
            {getOptions()}
        </div>
    )
}