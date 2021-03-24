import React from 'react';

export default function AppointmentDetails(props){

    const {client, date} = props.appt

    return (
        <div className="appointment-card">
            <div className="appointment-card-top">
                <img src={client.photo} alt="client photo" className="mini-avatar"/>
                <div>Appointment with {client.username}</div>
            </div>
            
            <div>{`${new Date(date)}`}</div>

        </div>
    )
}