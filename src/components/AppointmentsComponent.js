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
        // let date = new Date("April 1, 2021 03:00:00"),
        let data = {barber_id: user.id, client_id: 9, b_accepted:true, c_accepted:false, date:date, completed: false}
        API.post("/appointments", data)
        .then(res => {
            setUser({...user, appointments: [...user.appointments, res.data]})
       
        })
    }


    return(
        <div>
            <div className="test-appointment">
                <h4>Appointment Tester</h4>
            <DateTimePicker style={{backgroundColor: "red"}}minDate={new Date()} disableClock={true} onChange={setDate} value={date}/>
            <div>
                {`${date}`}
            </div>
            <div onClick={makeAppointment}>Create Test Appointment</div>
            </div>
            
            {user && user.appointments.map(appt => <AppointmentDetails key={`app${appt.id}`} appt={appt}/>)}
        </div>
    )
}