import React, {useState} from 'react';
import {userAtom} from '../atoms'
import {useRecoilState} from 'recoil'
import API from "../api"
import AppointmentDetails from './AppointmentDetails';
import DateTimePicker from "react-datetime-picker"
// import 'react-calendar/dist/Calendar.css'

export default function AppointmentsComponent(){

    const [user,setUser] = useRecoilState(userAtom),
        [date, setDate] = useState(new Date())

    const makeAppointment = () => {
<<<<<<< HEAD
        let date = new Date("April 1, 2021 03:00:00"),
        data = {barber_id: user.id, client_id: 17, b_accepted:true, c_accepted:false, date:date, completed: false}
=======
        // let date = new Date("April 1, 2021 03:00:00"),
        let data = {barber_id: user.id, client_id: 9, b_accepted:true, c_accepted:false, date:date, completed: false}
>>>>>>> master
        API.post("/appointments", data)
        .then(res => {
            console.log(res.data)
        })
    }


    return(
        <div>
            appointments here
            <DateTimePicker minDate={new Date()} disableClock="true" onChange={setDate} value={date}/>
            <div>
                {`${date}`}
            </div>
            <div onClick={makeAppointment}>Test Appointment</div>
            {user && user.appointments.map(appt => <AppointmentDetails key={`app${appt.id}`} appt={appt}/>)}
        </div>
    )
}