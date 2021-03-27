import React, {useState} from 'react';
import {userAtom, appointmentsAtom} from '../atoms'
import {useRecoilState, useRecoilValue} from 'recoil'
import API from "../api"
import AppointmentDetails from './AppointmentDetails';
import DateTimePicker from "react-datetime-picker"
// import 'react-calendar/dist/Calendar.css'

export default function AppointmentsComponent(){

    const user = useRecoilValue(userAtom),
        [date, setDate] = useState(new Date()),
        [appointments, setAppointments] = useRecoilState(appointmentsAtom)

    const makeAppointment = () => {
        // let date = new Date("April 1, 2021 03:00:00"),
        let data = {barber_id: user.id, client_id: 9, b_accepted:true, c_accepted:false, date:date, completed: false}
        API.post("/appointments", data)
        .then(res => {
            // setUser({...user, appointments: [...user.appointments, res.data]})
            setAppointments(res.data)
       
        })
    }

    function getIncomingAppointments(){
        let incoming = appointments.filter(ap => ap.b_accepted === false)
        return (incoming.map(appt => <AppointmentDetails key={`app${appt.id}`} appt={appt}/>))
    }

    function getSentAppointments(){
        let sent = appointments.filter(ap => ap.b_accepted === true && ap.c_accepted === false)
        return (sent.map(appt => <AppointmentDetails key={`app${appt.id}`} appt={appt}/>))
    }

    function getApprovedAppointments(){
        let approved = appointments.filter(ap => ap.b_accepted === true && ap.c_accepted === true)
        return (approved.map(appt => <AppointmentDetails key={`app${appt.id}`} appt={appt}/>))
    }

    return(
        <div>
            why?
            <div className="test-appointment">
                <h4>Appointment Tester</h4>
            <DateTimePicker style={{backgroundColor: "red"}}minDate={new Date()} disableClock={true} onChange={setDate} value={date}/>
            <div>
                {`${date}`}
            </div>
            <div onClick={makeAppointment}>Create Test Appointment</div>
            </div>
            <h3>Awaiting your approval</h3>
            {user && getIncomingAppointments()}
            <h3>Awaiting client approval</h3>
            {user && getSentAppointments()}
            <h3>Approved Appointments</h3>
            {user && getApprovedAppointments()}
        </div>
    )
}