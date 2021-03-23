import React from 'react';
import {userAtom} from '../atoms'
import {useRecoilState} from 'recoil'
import API from "../api"
import AppointmentDetails from './AppointmentDetails';

export default function AppointmentsComponent(){

    const [user,setUser] = useRecoilState(userAtom)

    const makeAppointment = () => {
        let date = new Date("April 1, 2021 03:00:00"),
        data = {barber_id: user.id, client_id: 17, b_accepted:true, c_accepted:false, date:date, completed: false}
        API.post("/appointments", data)
        .then(res => {
            console.log(res.data)
        })
    }
    return(
        <div>
            appointments here
            <div onClick={makeAppointment}>Test Appointment</div>
            {user && user.appointments.map(appt => <AppointmentDetails key={`app${appt.id}`} appt={appt}/>)}
        </div>
    )
}