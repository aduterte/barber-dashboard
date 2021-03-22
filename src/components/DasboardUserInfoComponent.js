import React from 'react';

export default function DashboardUserInfoComponent(props){

    const {username, photo} = props.user
    return (
        <div className="dashboard-user-info">
            <img src={photo} className="medium-avatar" alt="user avatar"/>
            <br/>
            Welcome, 
            <h3>{username}</h3>
        </div>
    )
}