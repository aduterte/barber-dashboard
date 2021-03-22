import React from 'react';

export default function AppointmentDetails(props){

    const {client, date} = props.appt

    return (
        <div>
            <div>Appointment with {client.username}</div>
            <div>{date}</div>

        </div>
    )
}